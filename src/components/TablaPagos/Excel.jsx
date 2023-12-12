import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';
import { getNombrePeriodo } from '../../utils/fechas';

const ExcelBoton = ({
  uniqueDates,
  data,
  loading,
  selectedPeriod,
  selectedBanco,
  selectedCodigo,
  selectedExb,
}) => {
  const [exporting, setExporting] = useState(false);

  const exportToExcel = async () => {
    if (exporting) return;
    setExporting(true);

    const getTipo = (codigo) => {
      const tarjetaCodigos = ['001', '002', '003', '004', '005', '006'];
      return tarjetaCodigos.includes(codigo) ? 'Tarjeta' : 'Banco';
    };

    const getBancoText = (selectedBanco) => {
      return selectedBanco
        ? `${getTipo(selectedBanco)} ${determinarBancoPorCBU(selectedBanco)} - `
        : 'Todos los Bancos - ';
    };

    try {
      const workbook = new ExcelJS.Workbook();

      const workName = `${getBancoText(selectedBanco)}${getNombrePeriodo(
        selectedPeriod,
      )}${
        selectedCodigo && selectedCodigo.length > 0
          ? ` - ${selectedCodigo.join(', ')}`
          : ''
      }${selectedExb ? ` - Enviado Por ${determinarBancoPorCBU(selectedExb)}` : ''}`;

      const worksheet = workbook.addWorksheet(workName);

      // Encabezados de la tabla
      const headerRow = [
        'NºSocio',
        'Nombre',
        'DNI',
        'CUIL',
        'Canal de Venta',
        'CBU',
        'ExB',
        ...uniqueDates.map((date) => {
          const [año, mes, dia] = date.split('-');
          return `${dia}/${mes}`;
        }),
      ];

      worksheet.addRow(headerRow);

      // Datos de la tabla
      data.forEach((socio) => {
        const row = [
          socio.Socio,
          socio.NombreCompleto,
          socio.DNI,
          socio.CUIL,
          socio.Convenio,
          socio.CBU,
          socio.ExB,
          ...uniqueDates.map((date) => socio[date] || '-'),
        ];
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

          // Aplicar estilo de fondo azul a CBU y ExB si no es "027"
          const cbuCell = row.getCell(6); // Columna de CBU
          const exbCell = row.getCell(7); // Columna de ExB
          if (cbuCell.value !== '027') {
            cbuCell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: '3399FF' }, // Azul
            };
          }
          if (exbCell.value !== '027') {
            exbCell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: '3399FF' }, // Azul
            };
          }
        }
      });

      // Crear un archivo blob
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Guardar el blob como un archivo Excel
      saveAs(blob, workName);
    } catch (error) {
      console.error('Error al exportar a Excel', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      id="excel-button"
      className={`bg-green-500 hover:bg-green-600 text-white rounded-md p-1 border-2 border-black w-28 ${
        exporting || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={exportToExcel}
      disabled={exporting}
    >
      {exporting ? 'Exportando...' : '▼ Excel'}
    </button>
  );
};

export default ExcelBoton;
