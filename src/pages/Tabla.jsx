import React, { useState } from 'react';
import { fetchData } from '../services/obtenerData';
import TablaCliente from '../components/Tabla/TablaCliente';
import Loader from '../components/Tabla/Loader';
import Periodo from '../components/Tabla/Periodo';
import CBU from '../components/Tabla/CBU';
import Codigo from '../components/Tabla/Codigo';

const Tabla = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [periodo, setPeriodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [primerCarga, setPrimerCarga] = useState(true);
  const [cbu, setCBU] = useState('');
  const [codigo, setCodigo] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [filtrosActivos, setFiltrosActivos] = useState(false); // Estado para los filtros activos

  const fetchDataAndUpdateState = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData(currentPage, 1000, periodo, codigo, cbu);
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

    setIsLoading(false);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDataAndUpdateState();
    setFiltrosActivos(true); // Marcar los filtros como activos
  };

  const handleResetFilters = () => {
    setData([]);
    setCurrentPage(1);
    setPeriodo(null);
    setCBU('');
    setCodigo('');
    setFiltrosActivos(false); // Marcar los filtros como inactivos
    setTotalCount(0);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1;
      const response = await fetchData(nextPage, 1000, periodo, codigo, cbu);
      const { responseData } = response;

      setData((prevData) => [...prevData, ...responseData]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <section className="overflow-y-auto flex flex-col justify-center items-center h-screen">
      <div className="flex space-x-3 md:h-8 mt-3 text-center">
        <Periodo
          periodo={periodo}
          setPeriodo={setPeriodo}
          data={data}
          setData={setData}
        />
        <CBU cbu={cbu} setCBU={setCBU} />
        <Codigo codigo={codigo} setCodigo={setCodigo} />
      </div>
      <div className="flex space-x-3 md:h-8 mt-3 text-center">
        <button
          onClick={handleSearch}
          className="md:w-24 w-16 rounded-md bg-green-500 hover:bg-green-600 text-white p-1 md:px-2 md:py-1 text-center md:text-sm text-xs border-2 border-black flex items-center justify-center"
        >
          Buscar
        </button>
        <button
          onClick={handleResetFilters}
          className="md:w-24 w-16 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white p-1 md:px-2 md:py-1 text-center md:text-sm text-xs border-2 border-black flex items-center justify-center"
          disabled={!filtrosActivos}
        >
          Reiniciar
        </button>
        {hasMore && !isLoading && (
          <button
            onClick={handleLoadMore}
            className="md:w-24 w-16 rounded-md bg-blue-500 hover:bg-blue-600 text-white p-1 md:px-2 md:py-1 text-center md:text-sm text-xs border-2 border-black flex items-center justify-center"
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
    </section>
  );
};

export default Tabla;
