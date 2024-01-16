import React, { useState, useEffect } from 'react';
import { formatFecha, getNombrePeriodo } from '../../utils/fechas';
import { Link } from 'react-router-dom';
import ExcelJS from 'exceljs';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const HistorialDNITable = ({ data, banco }) => {
  const [ordenDNI, setOrdenDNI] = useState('desc');
  const [ordenUltimoDigito, setOrdenUltimoDigito] = useState('asc');
  const [ordenData, setOrdenData] = useState('primerosDigitos');

  // Establecer ordenación por defecto al cargar el componente
  useEffect(() => {
    // Ordenar por primeros dígitos de mayor a menor
    setOrdenDNI('desc');
    // Ordenar por último dígito de menor a mayor
    setOrdenUltimoDigito('asc');
    // Seleccionar la ordenación por primeros dígitos
    setOrdenData('primerosDigitos');
  }, []);

  const handleOrdenarDNIClick = () => {
    setOrdenDNI(ordenDNI === 'asc' ? 'desc' : 'asc');
    setOrdenUltimoDigito('desc');
    setOrdenData('primerosDigitos');
  };

  const handleOrdenarUltimoDigitoClick = () => {
    setOrdenUltimoDigito(ordenUltimoDigito === 'asc' ? 'desc' : 'asc');
    setOrdenDNI('desc');
    setOrdenData('ultimoDigito');
  };

  const ordenarPorDNI = (a, b) => {
    const dniA = a.DNI;
    const dniB = b.DNI;

    // Comparación por primeros dígitos
    const comparacionPrimerosDigitos = dniA.localeCompare(dniB);

    if (comparacionPrimerosDigitos !== 0) {
      return ordenDNI === 'asc'
        ? comparacionPrimerosDigitos
        : -comparacionPrimerosDigitos;
    }

    // Si los primeros dígitos son iguales, comparar por último dígito
    const ultimoDigitoA = parseInt(dniA.charAt(dniA.length - 1), 10);
    const ultimoDigitoB = parseInt(dniB.charAt(dniB.length - 1), 10);

    return ordenUltimoDigito === 'asc'
      ? ultimoDigitoA - ultimoDigitoB
      : ultimoDigitoB - ultimoDigitoA;
  };

  const ordenarPorUltimoDigito = (a, b) => {
    const ultimoDigitoA = parseInt(a.DNI.charAt(a.DNI.length - 1), 10);
    const ultimoDigitoB = parseInt(b.DNI.charAt(b.DNI.length - 1), 10);

    if (ordenUltimoDigito === 'asc') {
      return ultimoDigitoA - ultimoDigitoB;
    } else {
      return ultimoDigitoB - ultimoDigitoA;
    }
  };

  const funcionOrdenacion =
    ordenData === 'primerosDigitos' ? ordenarPorDNI : ordenarPorUltimoDigito;

  const dias = new Set();

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      `Histórico ACE-R10 Banco ${determinarBancoPorCBU(banco.value)}`,
    );

    worksheet.addRow([
      'Socio',
      'DNI',
      'Período',
      ...diasOrdenados.map((dia) => `Día ${dia}`),
    ]);

    const sociosProcesados = new Set();

    data?.sort(ordenarPorDNI).forEach((socio) => {
      const periodos = Object.keys(socio.Pagos);

      if (!sociosProcesados.has(socio.Socio)) {
        sociosProcesados.add(socio.Socio);
        const rowData = [socio.Socio, socio.DNI];

        if (periodos.length === 0) {
          rowData.push('Sin periodos', ...diasOrdenados.map(() => '-'));
          worksheet.addRow(rowData);
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
              worksheet.addRow([...rowData, ...periodoData]);
            } else {
              worksheet.addRow(['', '', ...periodoData]);
            }
          });
        }
      } else {
        if (periodos.length === 0) {
          const rowData = ['', '', 'Sin periodos', ...diasOrdenados.map(() => '-')];
          worksheet.addRow(rowData);
        } else {
          periodos.forEach((periodo) => {
            const periodoData = [getNombrePeriodo(periodo)];

            diasOrdenados.forEach((dia) => {
              const diaColumnData = socio.Pagos[periodo]
                .filter((pago) => pago.dia === dia)
                .map((pago) => pago.Codigo);

              periodoData.push(diaColumnData.length > 0 ? diaColumnData.join('-') : '-');
            });

            worksheet.addRow(['', '', ...periodoData]);
          });
        }
      }
    });

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        const cellString = String(cell.value);

        if (cellString === 'ACE') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00FF00' } };
        } else if (cellString === 'R10') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };
        } else if (cellString === 'ACE-R10' || cellString === 'R10-ACE') {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFA500' },
          };
        }

        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });

    const blob = await workbook.xlsx.writeBuffer();
    const blobUrl = URL.createObjectURL(new Blob([blob]));

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `Histórico ACE-R10 Banco ${determinarBancoPorCBU(banco.value)}.xlsx`;
    link.click();

    URL.revokeObjectURL(blobUrl);
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
                title="Invertir orden primeros dígitos"
              >
                {ordenDNI === 'asc' ? '▼' : '▲'}
              </span>
              <span
                className="hover:text-yellow-500 cursor-pointer ml-1"
                onClick={handleOrdenarUltimoDigitoClick}
                title="Invertir orden último digito"
              >
                {ordenUltimoDigito === 'asc' ? '▼' : '▲'}
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
          {data?.sort(funcionOrdenacion).map((socio, index) => {
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

                    const importePorCodigo = {};

                    // Calcula el importe total por código
                    códigosDelDía.forEach((pago) => {
                      if (!importePorCodigo[pago.codigo]) {
                        importePorCodigo[pago.codigo] = 0;
                      }
                      importePorCodigo[pago.codigo] += pago.Importe;
                    });

                    const contenidoDelDía =
                      códigosDelDía.length > 0 ? (
                        <div
                          title={códigosDelDía
                            .map(
                              (pago) =>
                                `${formatFecha(pago.FechaCobro)} - ${pago.Codigo}: $${
                                  pago.Importe
                                }`,
                            )
                            .join('\n')}
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
