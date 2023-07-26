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

  useEffect(() => {
    // Verificar si hay un periodo seleccionado antes de cargar los datos
    if (periodo) {
      // Restaurar currentPage a 1 para cargar desde la primera página
      setCurrentPage(1);
      // Hacer la llamada a la API con el nuevo periodo seleccionado
      fetchDataAndUpdateState();
    }
  }, [periodo]);

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
    <section className="overflow-y-auto flex flex-col justify-center items-center h-screen">
      <div className="flex space-x-5 h-8 mt-5 text-center">
        <Periodo
          periodo={periodo}
          setPeriodo={setPeriodo}
          data={data}
          setData={setData}
        />

        <Filtros
          filtroCBU={filtroCBU}
          filtroCodigo={filtroCodigo}
          filtroPago={filtroPago}
          setFiltroCBU={setFiltroCBU}
          setFiltroPago={setFiltroPago}
          setFiltroCodigo={setFiltroCodigo}
          currentPage={setCurrentPage}
        />
        {hasMore && !isLoading && (
          <button
            onClick={handleLoadMore}
            className="rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center"
          >
            Cargar más
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

      <TablaCliente
        data={data}
        primerCarga={primerCarga}
        filtroCBU={filtroCBU}
        filtroCodigo={filtroCodigo}
        filtroPago={filtroPago}
      />
    </section>
  );
};

export default Tabla;
