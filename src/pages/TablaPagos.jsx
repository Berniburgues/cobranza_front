import React, { useState, useEffect } from 'react';
import {
  fetchDataPagos,
  fetchFiltrosPagos,
  fetchImportes,
  fetchImportesPorFecha,
  fetchCuiles,
  fetchServicios,
} from '../services/obtenerData';
import { descripcionCodigo } from '../utils/descripcionCodigos';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { Link } from 'react-router-dom';
import { getNombrePeriodo } from '../utils/fechas';
import LoaderFiltros from '../components/TablaPagos/LoaderFiltros';
import Paginacion from '../components/TablaPagos/Paginacion';
import ExcelBoton from '../components/TablaPagos/Excel';
import ImportesSocios from '../components/TablaPagos/ImportesSocios';
import './TablaPagos.css';

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
  const [importes, setImportes] = useState({
    '0-90': {
      Enviado0_90: 0,
      Cobrado0_90: 0,
      Ratio0_90: 0,
    },
    totales: {
      EnviadoTotal: 0,
      CobradoTotal: 0,
      RatioTotal: 0,
    },
  });

  const [importesPorFecha, setImportesPorFecha] = useState([]);
  const [altaCuiles, setAltaCuiles] = useState('-');
  const [bajaCuiles, setBajaCuiles] = useState('-');
  const [cuilesTotales, setCuilesTotales] = useState('-');
  const [selectChanges, setSelectChanges] = useState(false);
  const [serviciosTitulares, setServiciosTitulares] = useState('-');
  const [serviciosAdherentes, setServiciosAdherentes] = useState('-');

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
      const importesData = await fetchImportes(selectedPeriod, selectedBanco);
      setImportes(importesData);
      const cuiles = await fetchCuiles(selectedPeriod);
      setAltaCuiles(cuiles.CuilesNuevos);
      setBajaCuiles(cuiles.CuilesBaja);
      setCuilesTotales(cuiles.CuilesTotales);
      setSelectChanges(false);
      const servicios = await fetchServicios(selectedPeriod);
      setServiciosTitulares(servicios['01']);
      setServiciosAdherentes(servicios['02']);
      const importesXFecha = await fetchImportesPorFecha(selectedPeriod, selectedBanco);
      setImportesPorFecha(importesXFecha);
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

  const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Usar un objeto para mapear los estados de los select
    const selectStateMap = {
      selectedPeriod: setSelectedPeriod,
      selectedBanco: setSelectedBanco,
      selectedCodigo: setSelectedCodigo,
      selectedConvenio: setSelectedConvenio,
      selectedExb: setSelectedExb,
    };

    selectStateMap[name](value); // Establecer el valor seleccionado

    setSelectChanges(true); // Establecer selectChanges en true
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
    setBajaCuiles('-');
    setAltaCuiles('-');
    setCuilesTotales('-');
    setSelectChanges(false);
    setServiciosAdherentes('-');
    setServiciosTitulares('-');
    setImportes({
      '0-90': {
        Enviado0_90: 0,
        Cobrado0_90: 0,
        Ratio0_90: 0,
      },
      totales: {
        EnviadoTotal: 0,
        CobradoTotal: 0,
        RatioTotal: 0,
      },
    });
  };

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto">
        <div className="mb-1 flex flex-wrap justify-center">
          <div className="flex items-center gap-2">
            {showLoader ? (
              <LoaderFiltros />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <select
                    className="border-2 border-black rounded-md p-1 w-28"
                    value={selectedPeriod}
                    name="selectedPeriod"
                    onChange={handleSelectChange}
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
                    name="selectedBanco"
                    onChange={handleSelectChange}
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
                    name="selectedCodigo"
                    onChange={handleSelectChange}
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
                    name="selectedConvenio"
                    onChange={handleSelectChange}
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
                    name="selectedExb"
                    onChange={handleSelectChange}
                  >
                    <option value="">Banco Envío</option>
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
                    className={`bg-orange-600 hover:bg-orange-500 text-white rounded-md p-1 border-2 border-black w-28
                    ${loading ? 'cursor-not-allowed opacity-50' : ''}
                    ${selectChanges ? 'boton_parpadeo' : ''}`}
                    onClick={() => {
                      handleSearch();
                      setSelectChanges(false);
                    }}
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
            <ImportesSocios
              importes={importes}
              altaCuiles={altaCuiles}
              bajaCuiles={bajaCuiles}
              cuilesTotales={cuilesTotales}
              serviciosTitulares={serviciosTitulares}
              serviciosAdherentes={serviciosAdherentes}
            />
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
                        {uniqueDates.map((date, index) => {
                          const [año, mes, dia] = date.split('-');
                          const fechaFormateada = `${dia}/${mes}`;
                          const diaHabil = index + 1;
                          // Obtener el importe correspondiente a la fecha
                          const importe = importesPorFecha.find(
                            (item) => item.FechaCobro === date,
                          )?.Importe;

                          return (
                            <th
                              key={date}
                              className="p-1 border-2 border-gray-700 whitespace-nowrap"
                              title={
                                importesPorFecha.length > 0
                                  ? importe !== undefined
                                    ? importe
                                    : '-'
                                  : 'Cargando..'
                              }
                            >
                              {fechaFormateada}({diaHabil})
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
                              title="Buscar Datos"
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
