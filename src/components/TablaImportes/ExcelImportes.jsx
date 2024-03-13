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
      }`;

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
        const row = [socio.Socio, socio.CUIL.substring(2, 10), socio.CUIL, totalImportes];
        worksheet.addRow(row);
      });

      // Aplicar estilos de fondo solo a las filas de datos
      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex > 1) {
          // Comenzar a aplicar estilos a partir de la segunda fila (los datos)
          row.eachCell((cell, colIndex) => {
            const codigo = cell.value;
            if (colIndex > 7 && codigo && codigo !== '-') {
              // Aplicar colores
              let fillColor = '';
              if (codigo === 'ACE') {
                fillColor = '66FF66'; // Verde
              } else if (codigo === 'R10') {
                fillColor = 'FFFF99'; // Amarillo
              } else {
                fillColor = 'FF9999'; // Rojo
              }
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: fillColor },
              };
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
