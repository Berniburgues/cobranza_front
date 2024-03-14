import React, { useState, useEffect } from 'react';
import ExcelImportes from '../components/TablaImportes/ExcelImportes';
import { Link } from 'react-router-dom';
import { getTablaImportes, fetchFiltrosTablaImportes } from '../services/obtenerData';
import { formatFecha, getNombrePeriodo } from '../utils/fechas';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import ReactPaginate from 'react-paginate';
import './TablaPagos.css';

const TablaImportes = () => {
  const [data, setData] = useState([]);
  const [selectedBanco, setSelectedBanco] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedCodigo, setSelectedCodigo] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingFiltros, setLoadingFiltros] = useState(true);
  const [bancosOptions, setBancosOptions] = useState([]); // Nuevo estado para opciones de bancos
  const [periodosOptions, setPeriodosOptions] = useState([]); // Nuevo estado para opciones de periodos
  const itemsPerPage = 2000;

  useEffect(() => {
    const fetchFiltrosData = async () => {
      try {
        const filtrosData = await fetchFiltrosTablaImportes();
        setBancosOptions(filtrosData.data.bancos);
        setPeriodosOptions(filtrosData.data.periodos);
        setLoadingFiltros(false); // Marcar que los filtros han sido cargados
      } catch (error) {
        console.error('Error fetching filter data:', error);
        setLoadingFiltros(false); // Marcar que ha ocurrido un error al cargar los filtros
      }
    };

    fetchFiltrosData();
  }, []);

  const handleBancoChange = (event) => {
    setSelectedBanco(event.target.value);
  };

  const handlePeriodoChange = (event) => {
    setSelectedPeriodo(event.target.value);
  };

  const handleCodigoChange = (event) => {
    setSelectedCodigo(event.target.value);
  };

  const handleSearch = async () => {
    setLoadingData(true);
    const tablaImportesData = await getTablaImportes(
      selectedBanco,
      selectedPeriodo,
      selectedCodigo,
    );
    setData(tablaImportesData.data);
    setCurrentPage(0);
    setLoadingData(false);
  };

  const handleReset = async () => {
    setData([]);
    setCurrentPage(0);
    setSelectedBanco('');
    setSelectedPeriodo('');
    setSelectedCodigo('');
    setLoadingData(false);
  };

  const getConsolidatedData = () => {
    const consolidatedData = [];

    data.forEach((socio) => {
      const consolidatedSocio = {
        Socio: socio.Socio,
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
          if (pago.concepto === 'MES') {
            consolidatedSocio.Pagos[fechaCobro].TotalImporteMes += pago.Importe;
          } else if (pago.concepto === 'MORA') {
            consolidatedSocio.Pagos[fechaCobro].TotalImporteMora += pago.Importe;
          }

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
      <div className="flex space-x-4 mb-2 justify-center items-center text-sm">
        <div className="flex flex-col items-center">
          <label htmlFor="selectPeriodo" className="italic">
            Período:
          </label>
          {/* Mostrar "Cargando" si los filtros están cargando */}
          {loadingFiltros ? (
            <span className="border border-black italic p-1 rounded">Cargando...</span>
          ) : (
            <select
              id="selectPeriodo"
              value={selectedPeriodo}
              onChange={handlePeriodoChange}
              className="border border-black px-2 py-1 rounded"
              autoFocus
            >
              <option value="" disabled>
                Período
              </option>
              {periodosOptions.map((periodo) => (
                <option key={periodo} value={periodo}>
                  {getNombrePeriodo(periodo)}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="selectBanco" className="italic">
            Banco:
          </label>
          {/* Mostrar "Cargando" si los filtros están cargando */}
          {loadingFiltros ? (
            <span className="border border-black italic p-1 rounded">Cargando...</span>
          ) : (
            <select
              id="selectBanco"
              value={selectedBanco}
              onChange={handleBancoChange}
              className="border border-black px-2 py-1 rounded"
            >
              <option value="" disabled>
                Banco
              </option>
              {bancosOptions.map((banco) => (
                <option key={banco} value={banco}>
                  {determinarBancoPorCBU(banco)}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="selectCodigo" className="italic">
            Código:
          </label>
          <select
            id="selectCodigo"
            value={selectedCodigo}
            onChange={handleCodigoChange}
            className="border border-black px-2 py-1 rounded"
          >
            <option value="" disabled>
              Código
            </option>
            <option value="ACE">ACE</option>
            <option value="R10">R10</option>
            <option value="Rechazos">Rechazos</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 text-sm mb-2">
        <button
          onClick={handleSearch}
          className={`bg-orange-500 border border-black text-white px-2 w-20 rounded hover:bg-orange-700 ${
            loadingData ? 'cursor-not-allowed opacity-50' : ''
          } ${selectedPeriodo && selectedBanco ? '' : 'cursor-not-allowed opacity-50'} ${
            selectedPeriodo && selectedBanco && !loadingData ? 'boton_parpadeo' : ''
          }`}
          disabled={loadingData || !selectedPeriodo || !selectedBanco}
        >
          {loadingData ? 'Cargando' : 'Buscar'}
        </button>

        <button
          onClick={handleReset}
          className={`bg-yellow-500 border border-black text-white px-2 rounded hover:bg-yellow-700 ${
            loadingData ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={loadingData}
        >
          Nueva Consulta
        </button>

        <ExcelImportes
          uniqueDates={uniqueDates}
          loadingData={loadingData}
          data={data}
          selectedBanco={selectedBanco}
          selectedCodigo={selectedCodigo}
          selectedPeriodo={selectedPeriodo}
          consolidatedData={consolidatedData}
          totalImportes={consolidatedData.map((socio) =>
            uniqueDates.map((date) => socio.Pagos[date]?.TotalImporte),
          )}
          codigoImportes={consolidatedData.map((socio) =>
            uniqueDates.map((date) =>
              Object.keys(socio.Pagos[date]?.Codigos || {}).join(''),
            ),
          )}
        />
      </div>

      {selectedBanco && selectedPeriodo && (
        <div className="flex justify-center mb-2">
          <h2 className="text-xl font-bold">
            <Link
              to={`/tablas/bancos?banco=${selectedBanco}`}
              target="_blank"
              title="Buscar Datos del Banco"
              className="hover:text-blue-500"
            >
              {determinarBancoPorCBU(selectedBanco)}
            </Link>
            {' | '}
            {getNombrePeriodo(selectedPeriodo)}
          </h2>
        </div>
      )}

      {pageCount > 1 && (
        <div className="flex justify-center mb-2 mt-5 text-sm">
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Siguiente'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-between items-center'}
            pageClassName={'mx-1'}
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
              <td
                className="border-2 border-black hover:text-white hover:bg-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap"
                title={socio.CUIL.substring(2, 10)}
              >
                <Link to={`/tablas/socio?numerosSocio=${socio.DNI}`} target="_blank">
                  {socio.CUIL.substring(2, 10)}
                </Link>
              </td>
              <td
                className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap"
                title={socio.CUIL}
              >
                {`${socio.CUIL.substring(0, 2)}-${socio.CUIL.substring(
                  2,
                  10,
                )}-${socio.CUIL.substring(10)}`}
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

                // Renderización condicional del título y del contenido de la celda
                const cellTitle =
                  totalImporte > 0
                    ? `MES: $${totalImporteMes}\nMORA: $${totalImporteMora}\n${Object.entries(
                        codigos,
                      )
                        .map(([codigo, importe]) => `${codigo}: $${importe}`)
                        .join('\n')}`
                    : '';

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
                    title={cellTitle}
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
            pageClassName={'mx-1'}
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
