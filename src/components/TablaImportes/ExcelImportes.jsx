import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';
import { getNombrePeriodo, formatFecha } from '../../utils/fechas';

const ExcelImportes = ({
  uniqueDates,
  data,
  selectedPeriodo,
  selectedBanco,
  selectedCodigo,
  loadingData,
  totalImportes,
  consolidatedData,
}) => {
  const [exporting, setExporting] = useState(false);

  const exportToExcel = async () => {
    if (exporting || loadingData) return;

    setExporting(true);

    try {
      // Creación del nuevo Archivo Excel
      const workbook = new ExcelJS.Workbook();

      const workName = `Banco ${determinarBancoPorCBU(
        selectedBanco,
      )} - ${getNombrePeriodo(selectedPeriodo)}${
        selectedCodigo ? ` - ${selectedCodigo}` : ''
      } - Importes`;

      // Nombre de la hoja/archivo
      const worksheet = workbook.addWorksheet(workName);

      // Encabezados de la tabla
      const headerRow = [
        'Socio',
        'DNI',
        'CUIL',
        ...uniqueDates.map((date) => {
          return `${formatFecha(date)}`;
        }),
      ];

      worksheet.addRow(headerRow);

      // Datos de la tabla
      data.forEach((socio, index) => {
        const row = [
          socio.Socio,
          socio.CUIL.substring(2, 10),
          socio.CUIL,
          ...totalImportes[index], // Utiliza los importes de la fila actual
        ];
        worksheet.addRow(row);
      });

      // Aplicar estilos de fondo y renderizar importes solo a las filas de datos
      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex > 1) {
          const socio = consolidatedData[rowIndex - 2]; // Obtener el socio correspondiente a la fila actual
          row.eachCell((cell, colIndex) => {
            if (colIndex > 3) {
              const date = uniqueDates[colIndex - 4]; // Obtener la fecha correspondiente a la columna actual
              const importe = totalImportes[rowIndex - 2][colIndex - 4]; // Obtener el importe correspondiente a la celda actual

              // Obtener el total de importe de mes y de mora
              const totalImporteMes = socio.Pagos[date]?.TotalImporteMes || 0;
              const totalImporteMora = socio.Pagos[date]?.TotalImporteMora || 0;

              // Verificar si el importe es diferente de 0
              if (importe !== 0) {
                const codigos = socio.Pagos[date]?.Codigos || {}; // Obtener los códigos para la fecha actual
                let fillColor = '';
                let gradient = null;

                // Aplicar colores basados en los códigos
                if (Object.keys(codigos).length === 1) {
                  const codigo = Object.keys(codigos)[0];
                  if (codigo === 'ACE') {
                    fillColor = '66FF66'; // Verde
                  } else if (codigo === 'R10') {
                    fillColor = 'FFFF99'; // Amarillo
                  } else {
                    fillColor = 'FF9999'; // Rojo
                  }
                } else if (Object.keys(codigos).length > 1) {
                  // Aquí defines los degradados según las combinaciones de códigos
                  const hasACE = codigos['ACE'];
                  const hasR10 = codigos['R10'];

                  if ((hasACE && hasR10) || (!hasACE && !hasR10)) {
                    // Color sólido basado en el primer código encontrado
                    const codigo = Object.keys(codigos)[0];
                    if (codigo === 'ACE') {
                      fillColor = '66FF66'; // Verde
                    } else if (codigo === 'R10') {
                      fillColor = 'FFFF99'; // Amarillo
                    } else {
                      fillColor = 'FF9999'; // Rojo
                    }
                  } else if (hasACE && !hasR10) {
                    // Verde y Rojo
                    gradient = {
                      type: 'gradient',
                      gradient: 'angle',
                      degree: 45,
                      stops: [
                        { position: 0, color: { argb: '66FF66' } }, // Verde
                        { position: 1, color: { argb: 'FF9999' } }, // Rojo
                      ],
                    };
                  } else if (hasR10 && !hasACE) {
                    // Amarillo y Rojo
                    gradient = {
                      type: 'gradient',
                      gradient: 'angle',
                      degree: 45,
                      stops: [
                        { position: 0, color: { argb: 'FFFF99' } }, // Amarillo
                        { position: 1, color: { argb: 'FF9999' } }, // Rojo
                      ],
                    };
                  }
                }

                // Aplicar estilos de fondo y renderizar importe en la celda
                if (fillColor) {
                  cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: fillColor },
                  };
                  cell.value = importe; // Solo asignar el valor numérico sin el signo "$"
                  cell.numFmt = '#,##0.00'; // Establecer el formato numérico
                } else if (gradient) {
                  cell.fill = gradient;
                  cell.value = importe; // Solo asignar el valor numérico sin el signo "$"
                  cell.numFmt = '#,##0.00'; // Establecer el formato numérico
                }

                // Construir la cadena de información de códigos
                let codigosInfo = '';
                Object.entries(codigos).forEach(([codigo, importe]) => {
                  codigosInfo += `${codigo}: $${importe}\n`;
                });

                // Construir el comentario basado en la condición de importe de mes y mora
                let cellNote = '';
                if (totalImporteMes > 0) {
                  cellNote += `MES: $${totalImporteMes}\n`;
                }
                if (totalImporteMora > 0) {
                  cellNote += `MORA: $${totalImporteMora}\n`;
                }
                cellNote += codigosInfo;

                // Agregar el comentario a la celda
                cell.note = cellNote;
              }
            }
          });
        }
      });

      // Crear un archivo blob
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Guardar el blob como un archivo Excel
      saveAs(blob, `${workName}.xlsx`);
    } catch (error) {
      console.error('Error al exportar a Excel', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      id="excel-button"
      className={`bg-green-500 hover:bg-green-600 text-white rounded px-2 border border-black ${
        exporting || loadingData ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={exportToExcel}
      disabled={exporting || loadingData}
    >
      {exporting ? '...' : '▼ Excel'}
    </button>
  );
};

export default ExcelImportes;
