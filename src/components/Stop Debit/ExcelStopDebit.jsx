import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { getNombrePeriodo } from '../../utils/fechas';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const ExcelStopDebit = ({ data, selectedPeriodo, selectedBanco, loading }) => {
  const [exporting, setExporting] = useState(false);

  const exportToExcel = async () => {
    if (exporting || loading) return;

    setExporting(true);
    try {
      // Creación del nuevo Archivo Excel
      const workbook = new ExcelJS.Workbook();

      const workName = `Socios con Stop Debit - ${
        selectedPeriodo ? getNombrePeriodo(selectedPeriodo) : ''
      } - ${
        selectedBanco
          ? `Banco ${determinarBancoPorCBU(selectedBanco)}`
          : 'Todos los Bancos'
      }`;

      // Nombre de la hoja/archivo
      const worksheet = workbook.addWorksheet(workName);

      // Encabezados de la tabla
      const headerRow = ['SOCIO', 'NOMBRE', 'DNI', 'BANCO', 'TEL 1', 'TEL 2', 'MAIL'];
      worksheet.addRow(headerRow);

      // Aplicar negrita a las columnas
      worksheet.columns.forEach((column) => {
        column.width = 15; // Ajustar el ancho de las columnas
        column.eachCell((cell) => {
          cell.font = { bold: true };
        });
      });

      // Centrar todos los valores de las celdas
      worksheet.columns.forEach((column) => {
        column.alignment = { horizontal: 'center' };
      });

      // Datos de la Tabla
      data.map((socio) => {
        const rowData = [
          socio.NroSocio,
          socio.Nombre + ' ' + socio.Apellido,
          socio.Documento,
          determinarBancoPorCBU(socio.CBU),
          socio.Telefono,
          socio.Telefono2,
          socio.Email,
        ];
        return worksheet.addRow(rowData);
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
      className={`bg-green-500 hover:bg-green-600 text-white rounded px-4 ${
        exporting || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={exportToExcel}
      disabled={exporting || loading}
    >
      {exporting ? '...' : '▼ Excel'}
    </button>
  );
};

export default ExcelStopDebit;
