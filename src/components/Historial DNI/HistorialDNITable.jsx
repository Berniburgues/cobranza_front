import React, { useState } from 'react';
import { formatFecha, getNombrePeriodo } from '../../utils/fechas';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const HistorialDNITable = ({ data }) => {
  const [ordenDNI, setOrdenDNI] = useState('desc'); // Estado para el orden de DNI

  // Función para cambiar el orden de DNI al hacer clic en la columna
  const handleOrdenarDNIClick = () => {
    setOrdenDNI(ordenDNI === 'asc' ? 'desc' : 'asc');
  };

  // Función para ordenar los datos por DNI
  const ordenarPorDNI = (a, b) => {
    const dniA = a.DNI;
    const dniB = b.DNI;

    if (ordenDNI === 'asc') {
      return dniA.localeCompare(dniB);
    } else {
      return dniB.localeCompare(dniA);
    }
  };

  // Ordenar los datos por DNI
  const dataOrdenadaPorDNI = data ? [...data].sort(ordenarPorDNI) : [];

  // Obtener la lista de todos los días presentes en los pagos
  const dias = new Set();

  // Obtener los días únicos y ordenarlos
  if (data) {
    data.forEach((socio) => {
      Object.values(socio.Pagos).forEach((periodo) => {
        Object.keys(periodo).forEach((dia) => {
          dias.add(periodo[dia].dia);
        });
      });
    });
  }

  const diasOrdenados = [...dias].sort((a, b) => a - b);

  // Función para exportar los datos a Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ['Socio', 'DNI', 'Período', ...diasOrdenados.map((dia) => `Día ${dia}`)],
    ];

    const sociosProcesados = new Set(); // Para rastrear a los socios ya procesados

    dataOrdenadaPorDNI.forEach((socio) => {
      const periodos = Object.keys(socio.Pagos);

      if (!sociosProcesados.has(socio.Socio)) {
        sociosProcesados.add(socio.Socio);
        const rowData = [socio.Socio, socio.DNI];

        if (periodos.length === 0) {
          // Agregar una fila con datos vacíos si el socio no tiene ningún período
          rowData.push('Sin periodos', ...diasOrdenados.map(() => '-'));
          wsData.push(rowData);
        } else {
          periodos.forEach((periodo, index) => {
            const periodoData = [getNombrePeriodo(periodo)];

            diasOrdenados.forEach((dia) => {
              const diaColumnData = socio.Pagos[periodo]
                .filter((pago) => pago.dia === dia)
                .map((pago) => pago.Codigo);

              periodoData.push(diaColumnData.length > 0 ? diaColumnData.join('-') : '-');
            });

            if (index === 0) {
              // Agregar socio y DNI solo en la primera fila del socio
              wsData.push([...rowData, ...periodoData]);
            } else {
              // Agregar filas vacías para el mismo socio
              wsData.push(['', '', ...periodoData]);
            }
          });
        }
      } else {
        // Agregar filas vacías para el mismo socio
        if (periodos.length === 0) {
          // Agregar una fila con datos vacíos si el socio no tiene ningún período
          const rowData = ['', '', 'Sin periodos', ...diasOrdenados.map(() => '-')];
          wsData.push(rowData);
        } else {
          periodos.forEach((periodo) => {
            const periodoData = [getNombrePeriodo(periodo)];

            diasOrdenados.forEach((dia) => {
              const diaColumnData = socio.Pagos[periodo]
                .filter((pago) => pago.dia === dia)
                .map((pago) => pago.Codigo);

              periodoData.push(diaColumnData.length > 0 ? diaColumnData.join('-') : '-');
            });

            wsData.push(['', '', ...periodoData]);
          });
        }
      }
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Iterar sobre las celdas para aplicar estilos
    ws['!cols'] = [];
    for (let i = 0; i < wsData[0].length; i++) {
      ws['!cols'][i] = { wch: 15 }; // Establecer el ancho de la columna (puedes ajustarlo según tus necesidades)
    }

    // Iterar sobre las celdas para aplicar estilos
    wsData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex });

        // Asegúrate de que cell sea una cadena antes de utilizar includes
        const cellString = String(cell.v); // Accede al valor de la celda utilizando .v

        // Aplicar estilos según las condiciones
        if (cellString.includes('ACE')) {
          XLSX.utils.cell_add_style(ws, cellAddress, {
            fill: { fgColor: { rgb: '00FF00' } },
          });
        } else if (cellString.includes('R10')) {
          XLSX.utils.cell_add_style(ws, cellAddress, {
            fill: { fgColor: { rgb: 'FFFF00' } },
          });
        } else if (cellString.includes('ACE-R10') || cellString.includes('R10-ACE')) {
          XLSX.utils.cell_add_style(ws, cellAddress, {
            fill: {
              fgColor: { rgb: 'FFFF00' },
              patternType: 'lightHorizontal',
            },
          });
        }
      });
    });

    XLSX.utils.book_append_sheet(wb, ws, 'HistorialDNI');
    XLSX.writeFile(wb, 'historial_dni.xlsx');
  };

  return (
    <section>
      <div className="flex justify-end">
        <button
          onClick={exportToExcel}
          className="w-24 rounded-md justify-center bg-green-500 hover:bg-green-600 text-white text-center text-sm border-2 border-black flex items-center mb-1 mr-1"
        >
          ▼ Excel
        </button>
      </div>
      <table className="w-full border-collapse text-center table-fixed text-xs md:text-sm">
        <thead>
          <tr>
            <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
              Socio
            </th>
            <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
              DNI
              <span
                className="hover:text-yellow-500 cursor-pointer ml-1"
                onClick={handleOrdenarDNIClick}
                title="Invertir orden"
              >
                {ordenDNI === 'asc' ? '▼' : '▲'}
              </span>
            </th>

            <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
              Período(s)
            </th>
            {diasOrdenados.map((dia) => (
              <th
                key={dia}
                className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0"
              >
                Día {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataOrdenadaPorDNI.map((socio, index) => {
            const colorFondo = index % 2 === 0 ? 'bg-white' : 'bg-gray-700';
            const colorTexto = index % 2 === 0 ? 'text-black' : 'text-white';

            return Object.keys(socio.Pagos).map((periodo, periodoIndex) => {
              return (
                <tr key={`${socio.Socio}_${periodo}`} className={colorFondo}>
                  {periodoIndex === 0 && (
                    <td
                      rowSpan={Object.keys(socio.Pagos).length}
                      className={`border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap hover:bg-black hover:text-white cursor-pointer ${colorTexto}`}
                    >
                      <Link
                        to={`/tablas/socio?numerosSocio=${socio.DNI}`}
                        target="_blank"
                      >
                        {socio.Socio}
                      </Link>
                    </td>
                  )}
                  {periodoIndex === 0 && (
                    <td
                      rowSpan={Object.keys(socio.Pagos).length}
                      className={`border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap ${colorTexto}`}
                    >
                      {socio.DNI}
                    </td>
                  )}
                  <td
                    className={`border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap ${colorTexto}`}
                  >
                    {getNombrePeriodo(periodo)}
                  </td>
                  {diasOrdenados.map((dia) => {
                    const códigosDelDía = socio.Pagos[periodo].filter(
                      (pago) => pago.dia === dia,
                    );

                    const contenidoDelDía =
                      códigosDelDía.length > 0 ? (
                        <div
                          title={formatFecha(códigosDelDía[0].FechaCobro)}
                          className={`${
                            códigosDelDía.some((pago) => pago.Codigo === 'ACE')
                              ? 'bg-green-500'
                              : ''
                          } ${
                            códigosDelDía.some((pago) => pago.Codigo === 'R10')
                              ? 'bg-yellow-400'
                              : ''
                          }  ${
                            códigosDelDía.length > 1
                              ? 'bg-gradient-to-b from-yellow-400 to-green-500'
                              : ''
                          }`}
                        >
                          {códigosDelDía.map((pago) => pago.Codigo).join('-')}
                        </div>
                      ) : (
                        '-'
                      );

                    return (
                      <td
                        key={dia}
                        className="border-2 border-black text-center text-[0.50rem] md:text-sm font-bold truncate whitespace-nowrap p-0"
                      >
                        {contenidoDelDía}
                      </td>
                    );
                  })}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </section>
  );
};

export default HistorialDNITable;
