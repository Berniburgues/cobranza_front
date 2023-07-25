import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/obtenerData';
import TablaCliente from '../components/Tabla/TablaCliente';
import Loader from '../components/Tabla/Loader';
import Filtros from '../components/Tabla/Filtros';
import Periodo from '../components/Tabla/Periodo';

const Tabla = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [periodo, setPeriodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [primerCarga, setPrimerCarga] = useState(true);
  const [filtroCBU, setFiltroCBU] = useState('');
  const [filtroPago, setFiltroPago] = useState('');
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [totalCount, setTotalCount] = useState(0); // Agregar el estado totalCount

  const fetchDataAndUpdateState = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData(currentPage, 1000, periodo);
      const { responseData, responseTotalPages, responseTotalCount } = response; // Obtener totalCount de la respuesta del servidor

      // Actualizar totalCount con el valor recibido del servidor
      setTotalCount(responseTotalCount);

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

  useEffect(() => {
    if (periodo) {
      fetchDataAndUpdateState();
    }
  }, [currentPage, periodo]);

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1; // Obtener el número de la próxima página
      const response = await fetchData(nextPage, 1000, periodo);
      const { responseData } = response;

      setData((prevData) => [...prevData, ...responseData]);
      setCurrentPage(nextPage); // Actualizar currentPage con el número de la próxima página
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <section className="overflow-x-auto overflow-y-auto flex flex-col justify-center items-center h-screen">
      <Periodo periodo={periodo} setPeriodo={setPeriodo} data={data} setData={setData} />

      <Filtros
        filtroCBU={filtroCBU}
        filtroCodigo={filtroCodigo}
        filtroPago={filtroPago}
        setFiltroCBU={setFiltroCBU}
        setFiltroPago={setFiltroPago}
        setFiltroCodigo={setFiltroCodigo}
        currentPage={setCurrentPage}
      />

      <Loader loading={isLoading} />

      {/* Mostrar información sobre cuántos socios se están mostrando y cuántos hay en total */}
      <div className="text-center my-4">
        <p>
          Mostrando {data.length} socios de un total de {totalCount}
        </p>
      </div>

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
  );
};

export default Tabla;
