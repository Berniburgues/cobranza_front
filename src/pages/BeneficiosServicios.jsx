import React, { useState, useEffect } from 'react';
import { getServiciosYBeneficios } from '../services/obtenerData';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const BeneficiosServicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServiciosYBeneficios();
        setServicios(data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  const descargarExcel = async () => {
    // Crear un nuevo workbook de ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Servicios y Beneficios', {
      views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
    });

    // Definir los encabezados para la tabla en Excel
    const headers = [
      { header: 'SERVICIO\\BENEFICIO', key: 'Servicio' },
      ...Object.keys(servicios[0] || {})
        .filter((beneficio) => beneficio !== 'Servicio')
        .map((beneficio) => ({
          header: beneficio,
          key: beneficio,
        })),
    ];

    // Agregar los encabezados a la primera fila de la hoja de cálculo
    worksheet.addRow(headers.map((header) => header.header));

    // Agregar los datos
    servicios.forEach((servicio) => {
      const rowData = [
        servicio.Servicio,
        ...Object.keys(servicio)
          .filter((key) => key !== 'Servicio')
          .map((beneficio) => (servicio[beneficio] ? 'SÍ' : 'NO')),
      ];
      worksheet.addRow(rowData);
    });

    // Aplicar estilos condicionales y ajustar bordes y colores
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber === 1) {
          // Establecer el estilo de la primera fila (encabezados)
          cell.font = { bold: true };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD9E1F2' }, // Color de fondo azul claro para encabezados
          };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde superior gris claro
            left: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde izquierdo gris claro
            bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde inferior gris claro
            right: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde derecho gris claro
          };
        } else {
          // Establecer estilos para las filas de datos
          if (colNumber > 1) {
            if (cell.value === 'SÍ') {
              cell.font = { color: { argb: 'FF008000' }, bold: true }; // Texto verde y negrita
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFD9F4E8' }, // Fondo verde claro
              };
            } else if (cell.value === 'NO') {
              cell.font = { bold: true }; // Texto negrita
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFCCCC' }, // Fondo rojo claro
              };
            } else {
              // Establecer el fondo blanco para otras celdas
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFFFF' }, // Fondo blanco
              };
            }
            cell.border = {
              top: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde superior gris claro
              left: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde izquierdo gris claro
              bottom: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde inferior gris claro
              right: { style: 'thin', color: { argb: 'FFC0C0C0' } }, // Borde derecho gris claro
            };
          }
        }
      });
    });

    // Establecer los filtros en los encabezados
    worksheet.autoFilter = {
      from: 'A1',
      to: String.fromCharCode(65 + headers.length - 1) + '1',
    };

    // Función para calcular el ancho de las columnas automáticamente
    const AdjustColumnWidth = (worksheet) => {
      worksheet.columns.forEach((column) => {
        const lengths = column.values.map((v) => (v ? v.toString().length : 0));
        const maxLength = Math.max(...lengths.filter((v) => typeof v === 'number'));
        column.width = maxLength > 0 ? maxLength + 1 : 10; // Adding some extra space for padding, minimum width 10
      });
    };
    AdjustColumnWidth(worksheet);

    try {
      // Generar el archivo Excel en formato buffer
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'Servicios y Beneficios.xlsx');
    } catch (error) {
      console.error('Error al escribir el archivo Excel:', error);
    }
  };

  return (
    <section className="px-2 text-gray-700 body-font max-w-full text-xs text-center">
      <div className="max-w-full mx-auto">
        <div className="flex justify-center items-center text-center w-full mb-2 gap-10">
          <h2 className="font-bold text-gray-900 text-2xl underline">
            SERVICIOS Y BENEFICIOS
          </h2>
          <button
            onClick={descargarExcel}
            className="py-1 px-4 border-2 border-green-800 bg-green-500 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Excel
          </button>
        </div>
        <div className="overflow-auto max-h-[35rem]">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border sticky top-0 z-50 bg-gray-700 text-white border-gray-300 text-xs font-medium">
                  SERVICIO\BENEFICIO
                </th>
                {/* Iterar sobre los nombres de los beneficios para crear las columnas */}
                {Object.keys(servicios[0] || {}).map((beneficio, index) =>
                  index !== 0 ? (
                    <th
                      key={beneficio}
                      className="sticky top-0 z-50 bg-gray-700 text-white border border-gray-300 text-xs font-medium"
                    >
                      {beneficio}
                    </th>
                  ) : null,
                )}
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="border border-gray-300 text-gray-900 text-xs font-medium p-1 truncate">
                    {servicio.Servicio}
                  </td>

                  {Object.keys(servicio)
                    .filter((key) => key !== 'Servicio')
                    .map((beneficio, index) => (
                      <td
                        key={index}
                        className={`border border-gray-300 text-base text-center align-middle ${
                          servicio[beneficio]
                            ? 'text-green-500 font-bold'
                            : 'text-red-600 font-semibold'
                        }`}
                      >
                        {servicio[beneficio] ? '✅' : '❌'}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BeneficiosServicios;
