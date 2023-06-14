import React, { useEffect, useState } from 'react';
import { fetchData } from './services/obtenerData';
import TablaCliente from './components/Tabla General/TablaCliente';
import Loader from './components/Loader';
import FiltroCodigo from './components/Filtros/FiltroCodigo';
import FiltroCBU from './components/Filtros/FiltroCBU';
import FiltroPago from './components/Filtros/FiltroPago';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [filtroCBU, setFiltroCBU] = useState('');
  const [filtroPago, setFiltroPago] = useState('');

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(currentPage);
        const { responseData, responseTotalPages } = response;

        // Verificar si es la primera página
        if (currentPage === 1) {
          setData(responseData);
          setFilteredData(responseData);
        } else {
          // Verificar si la página ya ha sido cargada previamente
          const hasPageBeenLoaded = responseData.some((item) =>
            data.some((existingItem) => existingItem.Socio === item.Socio),
          );

          if (!hasPageBeenLoaded) {
            setData((prevData) => [...prevData, ...responseData]);
          }
        }

        // Verificar si hay más páginas para cargar
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

    fetchDataAndUpdateState();
  }, [currentPage]);

  const handleFiltroCodigoChange = (event) => {
    setFiltroCodigo(event.target.value);
  };

  const handleFiltroCBUChange = (event) => {
    setFiltroCBU(event.target.value);
  };

  const handleFiltroPagoChange = (event) => {
    setFiltroPago(event.target.value);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-5 text-center">
        CONTROL DE COBRANZA DE CLIENTES
      </h1>

      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-4">
          <FiltroCodigo value={filtroCodigo} onChange={handleFiltroCodigoChange} />
          <FiltroCBU value={filtroCBU} onChange={handleFiltroCBUChange} />
          <FiltroPago value={filtroPago} onChange={handleFiltroPagoChange} />
        </div>
      </div>

      <section className="overflow-x-auto overflow-y-auto flex flex-col justify-center items-center h-full">
        <TablaCliente
          data={data}
          filtroCodigo={filtroCodigo}
          filtroCBU={filtroCBU}
          filtroPago={filtroPago}
          filteredData={filteredData}
        />
        {hasMore && !isLoading && (
          <button
            onClick={handleLoadMore}
            className="my-4 bg-blue-500 text-white px-4 py-2"
          >
            Cargar más
          </button>
        )}
      </section>
      <Loader loading={isLoading} />
    </div>
  );
};

export default App;
