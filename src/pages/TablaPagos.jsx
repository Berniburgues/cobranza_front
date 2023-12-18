import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
import ModalCodigos from '../components/TablaPagos/ModalCodigos';

const TablaPagos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false); // Nuevo estado
  const [dataLoaded, setDataLoaded] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedBanco, setSelectedBanco] = useState('027');
  const [selectedCodigo, setSelectedCodigo] = useState([]);
  const [selectedConvenio, setSelectedConvenio] = useState('');
  const [selectedExb, setSelectedExb] = useState('');
  const [dniFilter, setDniFilter] = useState('');
  const [uniqueDates, setUniqueDates] = useState([]);
  const [pageSize, setPageSize] = useState(5000);
  const [pageNumber, setPageNumber] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [count, setCount] = useState(0);
  const [importes, setImportes] = useState({
    CBU: {
      '0-90': {
        Enviado: 0,
        Cobrado: 0,
        Ratio: 0,
      },
    },
    TAR: {
      '0-90': {
        Enviado: 0,
        Cobrado: 0,
        Ratio: 0,
      },
      Total: {
        Enviado: 0,
        Cobrado: 0,
        Ratio: 0,
      },
    },
    TOT: {
      '0-90': {
        Enviado: 0,
        Cobrado: 0,
        Ratio: 0,
      },
    },
  });
  const [importesPorFecha, setImportesPorFecha] = useState([]);
  const [altaCuiles, setAltaCuiles] = useState('-');
  const [bajaCuiles, setBajaCuiles] = useState('-');
  const [cuilesTotales, setCuilesTotales] = useState('-');
  const [selectChanges, setSelectChanges] = useState(false);
  const [serviciosTitulares, setServiciosTitulares] = useState('-');
  const [serviciosAdherentes, setServiciosAdherentes] = useState('-');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Cargar filtros de los select al cargar la página
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

  //Función que se activa al hacer click en el Botón de Búsqueda. Setea todos los estados.
  const handleSearch = async () => {
    setPageNumber(1);
    setLoading(true);
    setCalculating(true);
    setSearchClicked(true);

    try {
      const result = await fetchDataPagos(
        selectedPeriod,
        selectedBanco,
        selectedCodigo,
        selectedConvenio,
        selectedExb,
        dniFilter,
      );

      // Se agrega esta verificación para asegurarse de que result.data[0] no sea undefined o null
      if (result.data && result.data[0]) {
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
        const importesData = await fetchImportes(
          selectedPeriod,
          selectedBanco,
          selectedExb,
        );
        setImportes(importesData);
        const cuiles = await fetchCuiles(selectedPeriod, selectedBanco);
        setAltaCuiles(cuiles.CuilesNuevos);
        setBajaCuiles(cuiles.CuilesBaja);
        setCuilesTotales(cuiles.CuilesTotales);
        setSelectChanges(false);
        const servicios = await fetchServicios(selectedPeriod, selectedBanco);
        setServiciosTitulares(servicios['01']);
        setServiciosAdherentes(servicios['02']);
        const importesXFecha = await fetchImportesPorFecha(
          selectedPeriod,
          selectedBanco,
          selectedExb,
        );
        setImportesPorFecha(importesXFecha);
        setCalculating(false);
        setDataLoaded(true);
      } else {
        // Manejar el caso en el que result.data[0] es undefined o null
        console.error('Error: result.data[0] es undefined o null');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setDataLoaded(true);
      setCalculating(false);
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
          className={`mx-1 p-2 h-5 border-2 border-black rounded-full text-xs flex justify-center items-center font-bold ${
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

  // Función para cambiar página
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  //Función para guardar en variables lo seleccionado en cada Select
  const handleSelectChange = (name, selectedOption) => {
    // Usar un objeto para mapear los estados de los select
    const selectStateMap = {
      selectedPeriod: setSelectedPeriod,
      selectedBanco: setSelectedBanco,
      selectedCodigo: setSelectedCodigo,
      selectedConvenio: setSelectedConvenio,
      selectedExb: setSelectedExb,
    };

    // Si es el select de "selectedCodigo", manejar las opciones seleccionadas
    if (name === 'selectedCodigo') {
      const selectedOptions = selectedOption
        ? selectedOption.map((option) => option.value)
        : [];
      selectStateMap[name](selectedOptions);
    } else {
      selectStateMap[name](selectedOption ? selectedOption.value : null);
    }

    setSelectChanges(true); // Establecer selectChanges en true
  };

  // Cargar los datos a 0, y cada estado a su estado inicial
  const handleReset = () => {
    setCalculating(false);
    setSearchClicked(false);
    setSelectedPeriod('');
    setSelectedBanco('027');
    setSelectedCodigo([]);
    setSelectedConvenio('');
    setSelectedExb('');
    setDniFilter('');
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
      CBU: {
        '0-90': {
          Enviado: 0,
          Cobrado: 0,
          Ratio: 0,
        },
        Total: {
          Enviado: 0,
          Cobrado: 0,
          Ratio: 0,
        },
      },
      TAR: {
        '0-90': {
          Enviado: 0,
          Cobrado: 0,
          Ratio: 0,
        },
      },
      TOT: {
        '0-90': {
          Enviado: 0,
          Cobrado: 0,
          Ratio: 0,
        },
      },
    });
    setImportesPorFecha([]);
  };

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="flex items-center justify-center font-sans">
      <div className="container mx-auto">
        <div className="mb-1 flex flex-col justify-center items-center">
          {showLoader ? (
            <LoaderFiltros />
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs z-50 whitespace-nowrap">
                <Select
                  className="border-2 border-black rounded-md w-28 h-full"
                  value={
                    selectedPeriod
                      ? {
                          value: selectedPeriod,
                          label: getNombrePeriodo(selectedPeriod),
                        }
                      : null
                  }
                  name="selectedPeriod"
                  options={periodos.map((periodoData) => ({
                    value: periodoData.periodo,
                    label: getNombrePeriodo(periodoData.periodo),
                  }))}
                  onChange={(selectedOption) =>
                    handleSelectChange('selectedPeriod', selectedOption)
                  }
                  placeholder="Período"
                  styles={{
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                />

                <Select
                  className="border-2 border-black rounded-md w-28 h-full"
                  value={
                    selectedBanco
                      ? {
                          value: selectedBanco,
                          label: determinarBancoPorCBU(selectedBanco),
                        }
                      : {
                          value: '027', // Valor de Supervielle o el que corresponda
                        }
                  }
                  name="selectedBanco"
                  options={
                    selectedPeriod
                      ? [
                          {
                            value: '', // Valor vacío para representar "Todos"
                            label: 'Todos',
                          },
                          ...periodos
                            .find((periodoData) => periodoData.periodo === selectedPeriod)
                            ?.bancos.map((banco) => ({
                              value: banco,
                              label: determinarBancoPorCBU(banco),
                            })),
                        ]
                      : []
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange('selectedBanco', selectedOption)
                  }
                  placeholder="Banco"
                  styles={{
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                />
                <div className="flex flex-col mb-4">
                  <p
                    className="hover:cursor-pointer text-blue-600 font-semibold hover:text-blue-500 text-center text-xs mb-0" // Agrega la clase 'mb-0' para quitar el margen inferior
                    onClick={() => setModalIsOpen(true)}
                  >
                    Ver Códigos
                  </p>
                  <Select
                    className="border-2 border-black rounded-md w-48 h-full"
                    value={selectedCodigo.map((code) => ({ value: code, label: code }))}
                    name="selectedCodigo"
                    options={
                      selectedPeriod
                        ? periodos
                            .find((periodoData) => periodoData.periodo === selectedPeriod)
                            ?.codigos.map((codigo) => ({
                              value: codigo,
                              label: codigo,
                            }))
                        : []
                    }
                    isMulti
                    onChange={(selectedOptions) =>
                      handleSelectChange('selectedCodigo', selectedOptions)
                    }
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    placeholder="Código"
                    styles={{
                      indicatorSeparator: () => ({ display: 'none' }),
                    }}
                  />
                </div>

                <input
                  type="number"
                  value={dniFilter}
                  onChange={(e) => setDniFilter(e.target.value)}
                  placeholder="DNI (ej 14)"
                  className="border-2 border-black rounded-md p-1 text-center w-20 h-[42px]"
                />

                <Select
                  className="border-2 border-black rounded-md w-28 h-full"
                  value={
                    selectedConvenio
                      ? { value: selectedConvenio, label: selectedConvenio }
                      : null
                  }
                  name="selectedConvenio"
                  options={
                    selectedPeriod
                      ? periodos
                          .find((periodoData) => periodoData.periodo === selectedPeriod)
                          ?.convenios.map((convenio) => ({
                            value: convenio,
                            label: convenio,
                          }))
                      : []
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange('selectedConvenio', selectedOption)
                  }
                  placeholder="Canal de Venta"
                  styles={{
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                />

                <Select
                  className="border-2 border-black rounded-md w-28 h-full"
                  value={
                    selectedExb
                      ? {
                          value: selectedExb,
                          label: determinarBancoPorCBU(selectedExb),
                        }
                      : null
                  }
                  name="selectedExb"
                  options={
                    selectedPeriod
                      ? periodos
                          .find((periodoData) => periodoData.periodo === selectedPeriod)
                          ?.exbs.map((exb) => ({
                            value: exb,
                            label: determinarBancoPorCBU(exb),
                          }))
                      : []
                  }
                  onChange={(selectedOption) =>
                    handleSelectChange('selectedExb', selectedOption)
                  }
                  placeholder="Banco Envío"
                  styles={{
                    indicatorSeparator: () => ({ display: 'none' }),
                  }}
                />
              </div>
              <div className="flex items-center gap-2 text-xs pt-1">
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
                  {loading ? 'Cargando Tabla..' : 'Buscar'}
                </button>

                <button
                  className={`bg-yellow-500 hover:bg-yellow-600 border-2 border-black text-white rounded-md p-1 w-28 ${
                    loading ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  onClick={handleReset}
                  disabled={loading}
                >
                  Nueva Consulta
                </button>

                <ModalCodigos isOpen={modalIsOpen} closeModal={closeModal} />

                <ExcelBoton
                  uniqueDates={uniqueDates}
                  data={data}
                  loading={loading}
                  selectedPeriod={selectedPeriod}
                  selectedBanco={selectedBanco}
                  selectedCodigo={selectedCodigo}
                  selectedExb={selectedExb}
                  dniFilter={dniFilter}
                />
              </div>
            </>
          )}
        </div>

        {showLoader ? null : (
          <section>
            {selectedBanco && (
              <h2 className="text-lg text-center underline font-bold">
                Banco: {determinarBancoPorCBU(selectedBanco)}
              </h2>
            )}

            {searchClicked && (
              <>
                {calculating && (
                  <div className="flex flex-wrap items-center justify-center text-center gap-2">
                    <h3
                      className={`text-center text-sm font-semibold pb-1 ${
                        calculating ? 'boton_parpadeo' : ''
                      }`}
                    >
                      Calculando Importes/Servicios/Cuiles
                    </h3>
                    <LoaderFiltros />
                  </div>
                )}
                {!calculating && dataLoaded && (
                  <ImportesSocios
                    importes={importes}
                    altaCuiles={altaCuiles}
                    bajaCuiles={bajaCuiles}
                    cuilesTotales={cuilesTotales}
                    serviciosTitulares={serviciosTitulares}
                    serviciosAdherentes={serviciosAdherentes}
                    dataLoaded={dataLoaded}
                  />
                )}
              </>
            )}

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
                  <table className="w-full border-collapse border text-xs">
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
                              className="border-2 border-gray-700 whitespace-nowrap"
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
                              to={`/tablas/socio?numerosSocio=${socio.DNI}`}
                              target="_blank"
                              className="block w-full h-full text-center"
                              title="Buscar Historial"
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
                              socio.CBU === '027'
                                ? 'bg-white'
                                : socio.CBU === '004' ||
                                  socio.CBU === '005' ||
                                  socio.CBU === '003' ||
                                  socio.CBU === '006'
                                ? 'bg-violet-500'
                                : 'bg-blue-500'
                            }`}
                            title={determinarBancoPorCBU(socio.CBU)}
                          >
                            {socio.CBU}
                          </td>
                          <td
                            className={`p-1 border-2 border-black font-semibold ${
                              socio.ExB === '027'
                                ? 'bg-white'
                                : socio.ExB === 'TAR' || socio.ExB === 'PRI'
                                ? 'bg-violet-500'
                                : 'bg-blue-500'
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
                                className={`border-2 border-black font-semibold ${backgroundColorClass} ${
                                  codigo ? 'hover:cursor-pointer' : ''
                                }`}
                                title={descripcionCodigo(codigo)}
                                onClick={() => {
                                  if (codigo) {
                                    setModalIsOpen(true);
                                  }
                                }}
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
