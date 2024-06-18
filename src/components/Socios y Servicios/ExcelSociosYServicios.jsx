import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';
import { serviciosMap } from '../../utils/nombreServicios';

const ExcelSociosYServicios = ({
  banco,
  ExB,
  titular,
  socios,
  loading,
  serviciosColumns,
}) => {
  const [exporting, setExporting] = useState(false);

  const exportarExcel = async () => {
    if (exporting || loading) return;
    setExporting(true);

    try {
      // Creación del Excel
      const excel = new ExcelJS.Workbook();
      // Nombre del Excel
      const nombreExcel = `Socios y Servicios ${
        banco ? `- Banco ${determinarBancoPorCBU(banco)}` : ''
      } ${ExB ? `- Enviado Por ${determinarBancoPorCBU(ExB)}` : ''} ${
        titular ? `- Tipo Socio ${titular}` : ''
      }`;
      // Nombre de Hoja
      const hoja = excel.addWorksheet(nombreExcel);

      // Encabezados tabla
      const encabezados = [
        'N°S',
        'Nombre Completo',
        'DNI',
        'Titular',
        'Banco',
        'Banco Envío',
        ...serviciosColumns.map((servicio) => serviciosMap[servicio]),
      ];

      //Agregar fila de Encabezados
      const headerRow = hoja.addRow(encabezados);

      // Estilos para la fila de encabezado
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFD3D3D3' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      //Datos de la tabla
      socios.forEach((socio, index) => {
        const fila = [
          socio.SOCIO,
          socio.NOMBRE,
          socio.DOCUMENTO,
          socio.ESADHERENTE === 0 ? 'SÍ' : 'NO',
          determinarBancoPorCBU(socio.BANCO),
          determinarBancoPorCBU(socio.ENVIOBCO),
          ...serviciosColumns.map((servicio) => (socio[servicio] === 1 ? 'SÍ' : 'NO')),
        ];
        const newRow = hoja.addRow(fila);

        // Aplicar estilos a las celdas de servicios
        newRow.eachCell((cell, colNumber) => {
          if (colNumber > 6) {
            // Las columnas de servicios comienzan en la columna 7
            if (cell.value === 'SÍ') {
              cell.font = { color: { argb: 'FF008000' } }; // Texto verde
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFC6EFCE' }, // Fondo verde claro
              };
            } else if (cell.value === 'NO') {
              cell.font = { color: { argb: 'FFFF0000' } }; // Texto rojo
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF4CCCC' }, // Fondo rojo claro
              };
            }
          }
          if ((colNumber = 4)) {
            if (cell.value === 'SÍ') {
              cell.font = { color: { argb: 'FF008000' } }; // Texto verde
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFC6EFCE' }, // Fondo verde claro
              };
            } else if (cell.value === 'NO') {
              cell.font = { color: { argb: 'FFFF0000' } }; // Texto rojo
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFF4CCCC' }, // Fondo rojo claro
              };
            }
          }
        });
      });

      // Crear la tabla con totales personalizados
      hoja.addTable({
        name: 'SociosYServicios',
        ref: 'A1',
        headerRow: true,
        style: {
          theme: 'TableStyleMedium9',
          showRowStripes: true,
        },
        columns: encabezados.map((encabezado) => ({
          name: encabezado,
        })),
        rows: hoja.getRows(2, socios.length).map((row) => row.values.slice(1)),
      });

      // Guardar el archivo Excel
      const buffer = await excel.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      // Guardar el blob como un archivo Excel
      saveAs(blob, `${nombreExcel}.xlsx`);
    } catch (error) {
      console.error('Error exporting Excel:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={exportarExcel}
      disabled={exporting || loading}
      className=" bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none mt-5 px-4 border border-black"
    >
      Excel
    </button>
  );
};

export default ExcelSociosYServicios;
