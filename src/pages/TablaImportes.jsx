import React, { useState, useEffect } from 'react';
import { getTablaImportes } from '../services/obtenerData';
import { formatFecha } from '../utils/fechas';
import ReactPaginate from 'react-paginate';

const TablaImportes = () => {
  const [data, setData] = useState([]);
  const [selectedBanco, setSelectedBanco] = useState('014');
  const [selectedPeriodo, setSelectedPeriodo] = useState('2024-01-01');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2500; // Puedes ajustar el número de elementos por página según tus necesidades

  const handleBancoChange = (event) => {
    setSelectedBanco(event.target.value);
  };

  const handlePeriodoChange = (event) => {
    setSelectedPeriodo(event.target.value);
  };

  const handleSearch = async () => {
    const tablaImportesData = await getTablaImportes(selectedBanco, selectedPeriodo);
    setData(tablaImportesData.data);
    setCurrentPage(0);
  };

  const handleReset = async () => {
    setData([]);
    setCurrentPage(0);
    setSelectedBanco('');
    setSelectedPeriodo('');
  };

  const getConsolidatedData = () => {
    const consolidatedData = [];

    data.forEach((socio) => {
      const consolidatedSocio = {
        Socio: socio.Socio,
        DNI: socio.DNI,
        CUIL: socio.CUIL,
        Pagos: {},
      };

      Object.keys(socio.Pagos).forEach((periodo) => {
        socio.Pagos[periodo].forEach((pago) => {
          const fechaCobro = pago.FechaCobro;

          if (!consolidatedSocio.Pagos[fechaCobro]) {
            consolidatedSocio.Pagos[fechaCobro] = {
              TotalImporte: 0,
              TotalImporteMes: 0,
              TotalImporteMora: 0,
              Codigos: {},
            };
          }

          consolidatedSocio.Pagos[fechaCobro].TotalImporte += pago.Importe;
          consolidatedSocio.Pagos[fechaCobro][
            pago.Concepto === 'MES' ? 'TotalImporteMes' : 'TotalImporteMora'
          ] += pago.Importe;

          if (!consolidatedSocio.Pagos[fechaCobro].Codigos[pago.Codigo]) {
            consolidatedSocio.Pagos[fechaCobro].Codigos[pago.Codigo] = 0;
          }

          consolidatedSocio.Pagos[fechaCobro].Codigos[pago.Codigo] += pago.Importe;
        });
      });

      consolidatedData.push(consolidatedSocio);
    });

    return consolidatedData;
  };

  const consolidatedData = getConsolidatedData();

  const pageCount = Math.ceil(consolidatedData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consolidatedData.slice(indexOfFirstItem, indexOfLastItem);

  const getUniqueDates = () => {
    let uniqueDates = [];
    consolidatedData.forEach((socio) => {
      Object.keys(socio.Pagos).forEach((fecha) => {
        if (!uniqueDates.includes(fecha)) {
          uniqueDates.push(fecha);
        }
      });
    });
    uniqueDates.sort((a, b) => new Date(a) - new Date(b));
    return uniqueDates;
  };

  const uniqueDates = getUniqueDates();

  return (
    <section className="p-1">
      <div className="flex space-x-4 mb-4 justify-center items-center text-sm">
        <div className="flex flex-col items-center">
          <label htmlFor="selectBanco" className="italic">
            Banco:
          </label>
          <select
            id="selectBanco"
            value={selectedBanco}
            onChange={handleBancoChange}
            className="border px-2 py-1 rounded"
          >
            <option value="014">Provincia</option>
            <option value="011">Nación</option>
            <option value="027">Supervielle</option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="selectPeriodo" className="italic">
            Período:
          </label>
          <select
            id="selectPeriodo"
            value={selectedPeriodo}
            onChange={handlePeriodoChange}
            className="border px-2 py-1 rounded"
          >
            <option value="2024-01-01">Enero 2024</option>
            <option value="2024-02-01">Febrero 2024</option>
            <option value="2024-03-01">Marzo 2024</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mt-5"
        >
          Buscar
        </button>

        <button
          onClick={handleReset}
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mt-5"
        >
          Nueva Consulta
        </button>
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center my-2 text-sm">
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-between items-center'}
            pageClassName={'mx-3'}
            previousClassName={
              'border p-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
            nextClassName={
              'border p-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
            breakClassName={'border p-1 rounded bg-gray-200 text-gray-700'}
            activeClassName={
              'border border-black p-1 rounded bg-blue-200 text-gray-700 hover:bg-blue-300'
            }
            pageLinkClassName={
              'border p-1 rounded bg-white text-gray-700 hover:bg-gray-300'
            }
          />
        </div>
      )}

      <table className="w-full border-collapse text-center table-fixed text-xs md:text-sm">
        <thead>
          <tr>
            <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
              Socio
            </th>
            <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
              DNI
            </th>
            <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
              CUIL
            </th>
            {uniqueDates.map((date) => (
              <th
                key={date}
                className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0"
              >
                {formatFecha(date)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((socio, index) => (
            <tr key={index}>
              <td className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap">
                {socio.Socio}
              </td>
              <td className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap">
                {socio.DNI}
              </td>
              <td className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap">
                {socio.CUIL}
              </td>
              {uniqueDates.map((date) => {
                const totalImporte = socio.Pagos[date]?.TotalImporte || 0;
                const totalImporteMes = socio.Pagos[date]?.TotalImporteMes || 0;
                const totalImporteMora = socio.Pagos[date]?.TotalImporteMora || 0;
                const codigos = socio.Pagos[date]?.Codigos || {};

                // Clases condicionales basadas en la combinación de códigos
                const hasACE = codigos['ACE'];
                const hasR10 = codigos['R10'];

                const gradientClasses = {
                  'bg-green-500': hasACE && !hasR10,
                  'bg-yellow-500': hasR10 && !hasACE,
                  'bg-red-500': !hasR10 && !hasACE,
                  'bg-gradient-to-r from-green-500 to-yellow-500':
                    hasACE && hasR10 && Object.keys(socio.Pagos[date].Codigos).length > 1,
                  'bg-gradient-to-r from-green-500 to-red-500':
                    hasACE &&
                    !hasR10 &&
                    Object.keys(socio.Pagos[date].Codigos).length > 1,
                  'bg-gradient-to-r from-yellow-500 to-red-500':
                    !hasACE &&
                    hasR10 &&
                    Object.keys(socio.Pagos[date].Codigos).length > 1,
                };

                return (
                  <td
                    key={`${socio.DNI}_${date}`}
                    className={`border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap ${
                      totalImporte > 0
                        ? Object.keys(gradientClasses)
                            .map((cls) => (gradientClasses[cls] ? cls : ''))
                            .join(' ')
                        : ''
                    }`}
                    title={
                      totalImporte > 0
                        ? `MES: $${totalImporteMes}\nMORA: $${totalImporteMora}\n${Object.entries(
                            codigos,
                          )
                            .map(([codigo, importe]) => `${codigo}: $${importe}`)
                            .join('\n')}`
                        : ''
                    }
                  >
                    {totalImporte > 0 ? `$${totalImporte}` : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {pageCount > 1 && (
        <div className="flex justify-center my-2 text-sm">
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-between items-center'}
            pageClassName={'mx-3'}
            previousClassName={
              'border p-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
            nextClassName={
              'border p-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
            breakClassName={'border p-1 rounded bg-gray-200 text-gray-700'}
            activeClassName={
              'border border-black p-1 rounded bg-blue-200 text-gray-700 hover:bg-blue-300'
            }
            pageLinkClassName={
              'border p-1 rounded bg-white text-gray-700 hover:bg-gray-300'
            }
          />
        </div>
      )}
    </section>
  );
};

export default TablaImportes;
