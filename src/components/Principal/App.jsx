import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/obtenerData';
import TablaCliente from './TablaCliente';
import Loader from './Loader';
import Filtros from './Filtros';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [primerCarga, setPrimerCarga] = useState(true);
  const [filtroCBU, setFiltroCBU] = useState('');
  const [filtroPago, setFiltroPago] = useState('');
  const [filtroCodigo, setFiltroCodigo] = useState('');

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData(currentPage);
        const { responseData, responseTotalPages } = response;

        // Verificar si es la primera página
        if (currentPage === 1) {
          setData(responseData);
          setPrimerCarga(false);
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

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1; // Obtener el número de la próxima página
      const response = await fetchData(nextPage);
      const { responseData } = response;

      setData((prevData) => [...prevData, ...responseData]);
      setCurrentPage(nextPage); // Actualizar currentPage con el número de la próxima página
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="">
      <h1 className="text-5xl font-bold mb-10 text-center">
        CONTROL DE COBRANZA DE CLIENTES
      </h1>

      <Filtros
        filtroCBU={filtroCBU}
        filtroCodigo={filtroCodigo}
        filtroPago={filtroPago}
        setFiltroCBU={setFiltroCBU}
        setFiltroPago={setFiltroPago}
        setFiltroCodigo={setFiltroCodigo}
        currentPage={setCurrentPage}
      />

      <section className="overflow-x-auto overflow-y-auto flex flex-col justify-center items-center h-full">
        <TablaCliente
          data={data}
          primerCarga={primerCarga}
          filtroCBU={filtroCBU}
          filtroCodigo={filtroCodigo}
          filtroPago={filtroPago}
        />

        {hasMore && !isLoading && (
          <button
            onClick={handleLoadMore}
            className="my-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border-2 border-black"
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
