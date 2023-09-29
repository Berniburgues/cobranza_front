import React, { useState, useEffect } from 'react';
import { fetchDataPagos, fetchFiltrosPagos } from '../services/obtenerData';
import { descripcionCodigo } from '../utils/descripcionCodigos';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { Link } from 'react-router-dom';
import { getNombrePeriodo } from '../utils/fechas';
import LoaderFiltros from '../components/TablaPagos/LoaderFiltros';
import Paginacion from '../components/TablaPagos/Paginacion';
import ExcelBoton from '../components/TablaPagos/Excel';

const TablaPagos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedBanco, setSelectedBanco] = useState('');
  const [selectedCodigo, setSelectedCodigo] = useState('');
  const [selectedConvenio, setSelectedConvenio] = useState('');
  const [selectedExb, setSelectedExb] = useState('');
  const [uniqueDates, setUniqueDates] = useState([]);
  const [pageSize, setPageSize] = useState(5000);
  const [pageNumber, setPageNumber] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    cargarFiltros();
  }, []);

  const cargarFiltros = async () => {
    try {
      const result = await fetchFiltrosPagos();
      setShowLoader(true);
      if (result && result.data && result.data.Periodos) {
        const periodos = Object.keys(result.data.Periodos).map((periodo) => ({
          periodo,
          bancos: result.data.Periodos[periodo].Bancos,
          codigos: result.data.Periodos[periodo].Codigos,
          convenios: result.data.Periodos[periodo].Convenios,
          exbs: result.data.Periodos[periodo].ExBs,
        }));
        setPeriodos(periodos);
        setShowLoader(false); // Oculta el loader una vez que los filtros se cargan
      }
    } catch (error) {
      console.error('Error al obtener opciones de select', error);
      setShowLoader(false); // Asegura que el loader se oculte en caso de error
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setPageNumber(1);

    try {
      const result = await fetchDataPagos(
        selectedPeriod,
        selectedBanco,
        selectedCodigo,
        selectedConvenio,
        selectedExb,
      );
      setData(result.data);
      setCount(result.count);
      setLoading(false);

      const fechasCobro = Object.keys(result.data[0]).filter(
        (key) =>
          key !== 'ID' &&
          key !== 'Socio' &&
          key !== 'NombreCompleto' &&
          key !== 'DNI' &&
          key !== 'CUIL' &&
          key !== 'Convenio' &&
          key !== 'CBU' &&
          key !== 'ExB',
      );
      setUniqueDates(fechasCobro);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Función para generar los botones de paginación
  const renderPageButtons = () => {
    const totalPages = Math.ceil(data.length / pageSize);
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`mx-1 p-2 h-7 border-2 border-black rounded-full text-xs flex justify-center items-center font-bold ${
            i === pageNumber
              ? 'bg-blue-500 hover:bg-white text-white hover:text-blue-500'
              : 'bg-white text-blue-500 hover:bg-blue-600 hover:text-white'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    return pageButtons;
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePeriodChange = (e) => {
    const selected = e.target.value;
    setSelectedPeriod(selected);
  };

  const handleReset = () => {
    setSelectedPeriod('');
    setSelectedBanco('');
    setSelectedCodigo('');
    setSelectedConvenio('');
    setSelectedExb('');
    setData([]);
    setUniqueDates([]);
    setCount(0);
  };

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto mt-2">
        <div className="mb-2 flex flex-wrap justify-center">
          <div className="flex items-center gap-2">
            {showLoader ? (
              <LoaderFiltros />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <select
                    className="border-2 border-black rounded-md p-1 w-28"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                  >
                    <option value="">Período</option>
                    {periodos.map((periodoData) => (
                      <option key={periodoData.periodo} value={periodoData.periodo}>
                        {getNombrePeriodo(periodoData.periodo)}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border-2 border-black rounded-md p-1 w-28"
                    value={selectedBanco}
                    onChange={(e) => setSelectedBanco(e.target.value)}
                  >
                    <option value="">Banco</option>
                    {selectedPeriod &&
                      periodos
                        .find((periodoData) => periodoData.periodo === selectedPeriod)
                        ?.bancos.map((banco) => (
                          <option key={banco} value={banco}>
                            {determinarBancoPorCBU(banco)}
                          </option>
                        ))}
                  </select>
                  <select
                    className="border-2 border-black rounded-md p-1 w-28"
                    value={selectedCodigo}
                    onChange={(e) => setSelectedCodigo(e.target.value)}
                  >
                    <option value="">Código</option>
                    {selectedPeriod &&
                      periodos
                        .find((periodoData) => periodoData.periodo === selectedPeriod)
                        ?.codigos.map((codigo) => (
                          <option key={codigo} value={codigo}>
                            {codigo}
                          </option>
                        ))}
                  </select>
                  <select
                    className="border-2 border-black rounded-md p-1 w-28"
                    value={selectedConvenio}
                    onChange={(e) => setSelectedConvenio(e.target.value)}
                  >
                    <option value="">Canal de Venta</option>
                    {selectedPeriod &&
                      periodos
                        .find((periodoData) => periodoData.periodo === selectedPeriod)
                        ?.convenios.map((convenio) => (
                          <option key={convenio} value={convenio}>
                            {convenio}
                          </option>
                        ))}
                  </select>
                  <select
                    className="border-2 border-black rounded-md p-1 w-28"
                    value={selectedExb}
                    onChange={(e) => setSelectedExb(e.target.value)}
                  >
                    <option value="">ExB</option>
                    {selectedPeriod &&
                      periodos
                        .find((periodoData) => periodoData.periodo === selectedPeriod)
                        ?.exbs.map((exb) => (
                          <option key={exb} value={exb}>
                            {determinarBancoPorCBU(exb)}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white rounded-md p-1 border-2 border-black w-28 ${
                      loading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Buscar'}
                  </button>
                  <button
                    className={`bg-yellow-500 hover:bg-yellow-600 border-2 border-black text-white rounded-md p-1 w-28 ${
                      loading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reiniciar
                  </button>
                  <ExcelBoton uniqueDates={uniqueDates} data={data} loading={loading} />
                </div>
              </>
            )}
          </div>
        </div>

        {showLoader ? null : (
          <section>
            <div className="my-1">
              <p className="text-center text-base font-semibold italic">
                Mostrando{' '}
                <span className="text-blue-600 font-bold">
                  {Math.min(pageSize, data.length)}
                </span>{' '}
                de <span className="text-blue-600 font-bold">{count}</span> socios
              </p>
            </div>

            <Paginacion
              data={data}
              pageSize={pageSize}
              renderPageButtons={renderPageButtons}
              handlePageChange={handlePageChange}
              pageNumber={pageNumber}
            />

            <div className="overflow-x-auto">
              <div className="max-h-screen overflow-y-auto">
                <div className="w-auto">
                  <table className="w-full border-collapse border text-sm">
                    <thead>
                      <tr className="bg-black text-white sticky top-0 z-10">
                        <th className="py-1 border-2 border-gray-700">NºS</th>
                        <th className="p-1 border-2 border-gray-700">Nombre</th>
                        <th className="py-1 border-2 border-gray-700">DNI</th>
                        <th className="py-1 border-2 border-gray-700">CUIL</th>
                        <th className="p-1 border-2 border-gray-700 truncate">
                          Canal de Venta
                        </th>
                        <th className="py-1 border-2 border-gray-700">CBU</th>
                        <th className="py-1 border-2 border-gray-700">ExB</th>
                        {uniqueDates.map((date) => {
                          const [año, mes, dia] = date.split('-');
                          const fechaFormateada = `${dia}/${mes}`;
                          return (
                            <th key={date} className="p-1 border-2 border-gray-700">
                              {fechaFormateada}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((socio) => (
                        <tr key={socio.ID} className="text-center">
                          <td className="p-1 border-2 border-black hover:bg-black hover:text-white">
                            <Link
                              to={`/tablas/socio?numeroSocio=${socio.Socio}`}
                              target="_blank"
                              className="block w-full h-full text-center"
                            >
                              {socio.Socio}
                            </Link>
                          </td>
                          <td
                            className="p-1 border-2 border-black truncate min-w-[0.5rem] max-w-[0.5rem] capitalize"
                            title={socio.NombreCompleto}
                          >
                            {socio.NombreCompleto}
                          </td>
                          <td className="p-1 border-2 border-black">{socio.DNI}</td>
                          <td className="p-1 border-2 border-black">{socio.CUIL}</td>
                          <td
                            className="p-1 border-2 border-black truncate min-w-[0.5rem] max-w-[0.5rem]"
                            title={socio.Convenio}
                          >
                            {socio.Convenio}
                          </td>
                          <td
                            className={`p-1 border-2 border-black font-semibold ${
                              socio.CBU === '027' ? 'bg-white' : 'bg-blue-500'
                            }`}
                            title={determinarBancoPorCBU(socio.CBU)}
                          >
                            {socio.CBU}
                          </td>
                          <td
                            className={`p-1 border-2 border-black font-semibold ${
                              socio.ExB === '027' ? 'bg-white' : 'bg-blue-500'
                            }`}
                            title={determinarBancoPorCBU(socio.ExB)}
                          >
                            {socio.ExB}
                          </td>
                          {uniqueDates.map((date) => {
                            const codigo = socio[date];
                            let backgroundColorClass = '';
                            if (
                              !codigo &&
                              socio.CBU !== '027' &&
                              !Object.values(socio).includes('ACE')
                            ) {
                              backgroundColorClass = 'bg-slate-500';
                            } else if (codigo === 'ACE') {
                              backgroundColorClass = 'bg-green-500';
                            } else if (codigo === 'R10') {
                              backgroundColorClass = 'bg-yellow-400';
                            } else if (codigo) {
                              backgroundColorClass = 'bg-red-500';
                            }
                            return (
                              <td
                                key={date}
                                className={`border-2 p-1 border-black font-bold text-xs ${backgroundColorClass}`}
                                title={descripcionCodigo(codigo)}
                              >
                                {codigo}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Paginacion
              data={data}
              pageSize={pageSize}
              renderPageButtons={renderPageButtons}
              handlePageChange={handlePageChange}
              pageNumber={pageNumber}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default TablaPagos;
