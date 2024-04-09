import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { getNombrePeriodo } from '../../utils/fechas';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const ExcelSocios = ({ socios, diasCobro, isLoading }) => {
  const [exporting, setExporting] = useState(false);

  const exportToExcel = async () => {
    if (exporting || isLoading) return;

    setExporting(true);

    try {
      // Creación del nuevo Archivo Excel
      const workbook = new ExcelJS.Workbook();

      const workName = `Historial Socios`;

      // Nombre de la hoja/archivo
      const worksheet = workbook.addWorksheet(workName);

      // Encabezados de la tabla
      const headerRow = ['SOCIO', 'BANCO', 'DNI', 'CUIL', 'PERÍODO', ...[...diasCobro]];
      worksheet.addRow(headerRow);

      // Aplicar negrita a las columnas
      worksheet.columns.forEach((column) => {
        column.width = 12; // Ajustar el ancho de las columnas
        column.eachCell((cell) => {
          cell.font = { bold: true };
        });
      });

      // Datos de la tabla
      socios.forEach((socio, index) => {
        Object.entries(socio.Pagos).forEach(([periodo, pagos], idx) => {
          const rowData = [
            socio.Socio,
            determinarBancoPorCBU(socio.CBU),
            socio.DNI,
            socio.CUIL,
            getNombrePeriodo(periodo),
            ...[...diasCobro].map((dia) => {
              const cobroDia = pagos.filter((pago) => pago.Dia === dia);

              // Filtrar los códigos válidos y eliminar null
              const validCodes = cobroDia
                .map((pago) => pago.Codigo)
                .filter((codigo) => codigo !== null);

              // Usar un conjunto para almacenar los códigos únicos
              const uniqueCodes = new Set(validCodes);
              const codigos = [...uniqueCodes].join('-'); // Unir los códigos únicos

              return codigos; // Devolver los códigos para cada día
            }),
          ];
          const row = worksheet.addRow(rowData);

          // Aplicar estilos de texto según el índice
          row.eachCell((cell, colIndex) => {
            if (idx === 0) {
              cell.font = { color: { argb: 'FF000000' } }; // Negro para el primer dato de cada socio
            } else if (idx !== 0 && colIndex < 5) {
              cell.font = { color: { argb: 'FFFFFFFF' } }; // Blanco para el resto de los datos
            }
          });
        });
      });

      // Aplicar estilos de fondo a las celdas de códigos
      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex > 1) {
          row.eachCell((cell, colIndex) => {
            if (colIndex > 5) {
              const cellValue = cell.value;
              if (cellValue) {
                // Determinar el estilo de la celda según la lógica proporcionada
                let gradient = null;
                let fillColor = '';
                const codes = cellValue.split('-');

                if (codes.length === 1) {
                  const codigo = codes[0];
                  if (codigo === 'R10') {
                    fillColor = 'FFFF99'; // Amarillo
                  } else if (codigo === 'ACE') {
                    fillColor = '66FF66'; // Verde
                  } else {
                    fillColor = 'FF9999'; // Rojo
                  }
                } else {
                  const hasACE = codes.includes('ACE');
                  const hasR10 = codes.includes('R10');

                  if (hasACE && hasR10) {
                    // Degradado verde y amarillo
                    gradient = {
                      type: 'gradient',
                      gradient: 'angle',
                      degree: 45,
                      stops: [
                        { position: 0, color: { argb: '66FF66' } }, // Verde
                        { position: 1, color: { argb: 'FFFF99' } }, // Amarillo
                      ],
                    };
                  } else if (hasACE && !hasR10) {
                    // Degradado verde y rojo
                    gradient = {
                      type: 'gradient',
                      gradient: 'angle',
                      degree: 45,
                      stops: [
                        { position: 0, color: { argb: '66FF66' } }, // Verde
                        { position: 1, color: { argb: 'FF9999' } }, // Rojo
                      ],
                    };
                  } else if (!hasACE && hasR10) {
                    // Degradado amarillo y rojo
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

                if (fillColor) {
                  cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: fillColor },
                  };
                } else if (gradient) {
                  cell.fill = gradient;
                }
              }
            }
          });
        }
      });

      // Centrar todos los valores de las celdas
      worksheet.columns.forEach((column) => {
        column.alignment = { horizontal: 'center' };
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
        exporting || isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={exportToExcel}
      disabled={exporting || isLoading}
    >
      {exporting ? '...' : '▼ Excel'}
    </button>
  );
};

export default ExcelSocios;
