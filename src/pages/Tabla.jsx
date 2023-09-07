import React, { useState, useEffect } from 'react';
import { fetchData, fetchFiltros } from '../services/obtenerData';
import TablaCliente from '../components/Tabla/TablaCliente';
import Loader from '../components/Tabla/Loader';
import Periodo from '../components/Tabla/Periodo';
import FiltroLoader from '../components/Tabla/FiltroLoader';
import CBU from '../components/Tabla/CBU';
import Codigo from '../components/Tabla/Codigo';
import Condiciones from '../components/Tabla/Condiciones';

const Tabla = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [periodo, setPeriodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader para la carga de datos de la tabla
  const [hasMore, setHasMore] = useState(false);
  const [primerCarga, setPrimerCarga] = useState(true);
  const [cbu, setCBU] = useState('');
  const [codigo, setCodigo] = useState('');
  const [DNI, setDNI] = useState(false);
  const [CL, setCL] = useState(false);
  const [EXB, setEXB] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [filtrosActivos, setFiltrosActivos] = useState(false);
  const [filtrosData, setFiltrosData] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
  const [cbuSeleccionado, setCbuSeleccionado] = useState('');
  const [isLoadingFiltros, setIsLoadingFiltros] = useState(true); // Loader para la carga de filtros

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const data = await fetchFiltros();
        setFiltrosData(data);
        setIsLoadingFiltros(false); // Establecer isLoadingFiltros en false una vez que se ha completado la carga de filtros
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    fetchInitialData();
  }, []);

  const fetchDataAndUpdateState = async () => {
    setIsLoading(true); // Establecer isLoading en true al iniciar la búsqueda
    try {
      const response = await fetchData(
        currentPage,
        500,
        periodo,
        codigo,
        cbu,
        DNI,
        CL,
        EXB,
      );
      const { responseData, responseTotalPages, responseTotalCount } = response;

      setTotalCount(responseTotalCount);

      if (currentPage === 1) {
        setData(responseData);
        setPrimerCarga(false);
      } else {
        const hasPageBeenLoaded = responseData.some((item) =>
          data.some((existingItem) => existingItem.Socio === item.Socio),
        );

        if (!hasPageBeenLoaded) {
          setData((prevData) => [...prevData, ...responseData]);
        }
      }

      if (currentPage >= responseTotalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false); // Establecer isLoading en false una vez que se ha completado la carga de datos de la tabla
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDataAndUpdateState();
    setFiltrosActivos(true); // Marcar los filtros como activos
  };

  const handleIncludeDNI = () => {
    setDNI(!DNI);
  };

  const handleIncludeCL = () => {
    setCL(!CL);
  };

  const handleIncludeEXB = () => {
    setEXB(!EXB);
  };

  const handleResetFilters = () => {
    setData([]);
    setCurrentPage(1);
    setPeriodo(null);
    setCBU('');
    setCodigo('');
    setFiltrosActivos(false); // Marcar los filtros como inactivos
    setTotalCount(0);
    setDNI(false);
    setEXB(false);
    setCL(false);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1;
      const response = await fetchData(nextPage, 500, periodo, codigo, cbu, DNI, CL, EXB);
      const { responseData } = response;

      setData((prevData) => [...prevData, ...responseData]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false); // Establecer isLoading en false una vez que se ha completado la carga de más datos de la tabla
  };

  const handlePeriodoChange = (event) => {
    const selectedPeriodo = event.target.value;
    setPeriodo(selectedPeriodo);

    // Filtrar la respuesta de filtrosData para obtener la data del período seleccionado
    const dataForSelectedPeriodo = filtrosData.data[selectedPeriodo] || {};

    // Ahora, dataForSelectedPeriodo contiene la información del período seleccionado
    setPeriodoSeleccionado(dataForSelectedPeriodo);

    // Si el período seleccionado es vacío, poner el estado data en un arreglo vacío
    if (selectedPeriodo === '') {
      setData([]);
    }
  };

  const handleCBUChange = (event) => {
    const selectedCBU = event.target.value;
    setCBU(selectedCBU);
    setCbuSeleccionado(selectedCBU);
  };

  return (
    <section className="overflow-y-auto flex flex-col justify-center items-center h-screen">
      {isLoadingFiltros ? (
        <FiltroLoader loading={isLoadingFiltros} />
      ) : (
        <>
          <div className="flex flex-wrap md:h-8 my-1 text-center">
            <div className="flex space-x-3">
              <Periodo
                periodo={periodo}
                filtrosData={filtrosData}
                handlePeriodoChange={handlePeriodoChange}
              />
              <CBU
                cbu={cbu}
                periodoSeleccionado={periodoSeleccionado}
                handleCBUChange={handleCBUChange}
              />
              <Codigo
                codigo={codigo}
                setCodigo={setCodigo}
                filtrosData={filtrosData}
                cbuSeleccionado={cbuSeleccionado}
                periodoSeleccionado={periodoSeleccionado}
              />
            </div>
            <div className="ml-3">
              <Condiciones
                DNI={DNI}
                CL={CL}
                EXB={EXB}
                handleIncludeDNI={handleIncludeDNI}
                handleIncludeCL={handleIncludeCL}
                handleIncludeEXB={handleIncludeEXB}
              />
            </div>
          </div>
          <div className="flex justify-between space-x-3 md:h-8 text-center">
            <button
              onClick={handleSearch}
              className="w-20 md:w-24 rounded-md bg-green-500 hover:bg-green-600 text-white p-1 md:px-2 md:py-1 text-center md:text-sm text-xs border-2 border-black flex items-center justify-center"
            >
              Buscar
            </button>
            <button
              onClick={handleResetFilters}
              className="w-20 md:w-24 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white p-1 md:px-2 md:py-1 text-center md:text-sm text-xs border-2 border-black flex items-center justify-center"
              disabled={!filtrosActivos}
            >
              Reiniciar
            </button>
            {hasMore && !isLoading && (
              <button
                onClick={handleLoadMore}
                className="w-20 md:w-24 rounded-md bg-blue-500 hover:bg-blue-600 text-white p-1 md:px-2 md:py-1 text-center md:text-sm text-xs border-2 border-black flex items-center justify-center"
              >
                Cargar +
              </button>
            )}
            <Loader loading={isLoading} />
          </div>

          <div className="text-center my-2">
            <p className="text-base font-semibold">
              Mostrando <span className="text-blue-500">{data.length}</span> socios de un
              total de <span className="text-blue-500">{totalCount}</span>
            </p>
          </div>

          <TablaCliente data={data} primerCarga={primerCarga} />
        </>
      )}
    </section>
  );
};

export default Tabla;
