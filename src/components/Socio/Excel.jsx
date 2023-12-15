import { useState } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { getNombrePeriodo } from '../../utils/fechas';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const ExcelSocio = ({ diasCobro, periodos, datosAgrupados, datosFijos }) => {
  const [exporting, setExporting] = useState(false);

  const exportToExcel = async () => {
    if (exporting) return;
    setExporting(true);

    try {
      const workbook = new ExcelJS.Workbook();
      const workName = `${datosFijos.documento} - ${datosFijos.apellido} ${datosFijos.nombre}`;
      const worksheet = workbook.addWorksheet(workName);

      // Encabezados de la Tabla
      const headerRow = ['PERÍODO', ...diasCobro.map((date) => `DÍA ${date}`)];
      worksheet.addRow(headerRow);

      // Obtén la letra de la última columna en base al número de díasCobro
      const lastColumnLetter = String.fromCharCode(65 + diasCobro.length);

      // Agregar fila de datosFijos al encabezado
      const datosFijosRow = [
        `#${datosFijos.socio} || ${datosFijos.nombre} ${datosFijos.apellido} || DNI: ${
          datosFijos.documento
        } || CUIL: ${datosFijos.cuil} || Banco: ${determinarBancoPorCBU(
          datosFijos.banco,
        )}` +
          `${datosFijos.baja !== null ? ` || Baja: ${datosFijos.baja}` : ''}` +
          `${
            datosFijos.baja !== null && datosFijos.motivoBaja !== ''
              ? ` || Motivo Baja: ${datosFijos.motivoBaja}`
              : ''
          }`,
      ];

      // Insertar la fila de datosFijosRow en la primera fila
      worksheet.spliceRows(1, 0, datosFijosRow);

      // Merge de celdas de datos fijos para que ocupe todo el ancho disponible
      const mergeRange = `A1:${lastColumnLetter}1`;
      worksheet.mergeCells(mergeRange);

      // Diseño de los encabezados
      worksheet.getCell('A1').alignment = { horizontal: 'center' };
      worksheet.getCell('A1').font = { bold: true, size: 12 };
      worksheet.getCell('A1').border = {};

      const border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      worksheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.border = border;
        });
      });

      // Aplicar negrita a todas las celdas en la fila de encabezado
      worksheet.getRow(2).eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Datos de la Tabla
      periodos.forEach((periodo) => {
        const rowData = [getNombrePeriodo(periodo)];

        diasCobro.forEach((dia) => {
          const clave = `${periodo}-${dia}`;
          const cobroDia = Object.values(datosAgrupados).filter(
            (item) => item.dia === dia && item.periodo === periodo,
          );

          // Obtener todos los códigos para el día y periodo específicos
          const codigosAplanados = cobroDia
            .map((item) => item.codigo)
            .filter((value, index, self) => self.indexOf(value) === index)
            .join('-');

          // Agregar todos los códigos a la celda sin filtrar
          rowData.push(codigosAplanados);
        });

        worksheet.addRow(rowData);
      });

      worksheet.eachRow((row, rowIndex) => {
        if (rowIndex > 2) {
          // Comenzar a aplicar estilos a partir de la tercera fila (los datos)
          row.eachCell((cell, colNumber) => {
            const codigo = cell.value;
            console.log(cell.value, 'algo');
            if (
              colNumber > 1 &&
              codigo !== undefined &&
              codigo !== null &&
              codigo !== ''
            ) {
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

      // Guardar el archivo
      const filename = `Historial DNI ${datosFijos.documento} - ${datosFijos.apellido} ${datosFijos.nombre}.xlsx`;
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer]), filename);
        setExporting(false); // Restablecer el estado después de la exportación
      });
    } catch (error) {
      console.error('Error al generar el archivo Excel', error);
      setExporting(false); // Restablecer el estado en caso de error
    }
  };

  return (
    <button
      id="excel-button"
      className={`bg-green-500 hover:bg-green-600 text-white rounded-md p-1 border-2 border-black w-24 h-6 mt-1 flex justify-center items-center ${
        exporting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      onClick={exportToExcel}
      disabled={exporting}
    >
      {exporting ? 'Exportando...' : '▼ Excel'}
    </button>
  );
};

export default ExcelSocio;
