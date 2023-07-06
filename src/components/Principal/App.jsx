import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/obtenerData';
import TablaCliente from './TablaCliente';
import Loader from './Loader';
import Filtros from './Filtros';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [periodo, setPeriodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [primerCarga, setPrimerCarga] = useState(true);
  const [filtroCBU, setFiltroCBU] = useState('');
  const [filtroPago, setFiltroPago] = useState('');
  const [filtroCodigo, setFiltroCodigo] = useState('');

  const periodosDisponibles = ['2023-06-01', '2023-07-01']; // Períodos disponibles para seleccionar

  const fetchDataAndUpdateState = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData(currentPage, 500, periodo);
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

  const handlePeriodoChange = (event) => {
    const selectedPeriodo = event.target.value;
    setPeriodo(selectedPeriodo);
  };

  useEffect(() => {
    fetchDataAndUpdateState();
  }, [currentPage, periodo]);

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const nextPage = currentPage + 1; // Obtener el número de la próxima página
      const response = await fetchData(nextPage, 500, periodo);
      const { responseData } = response;

      setData((prevData) => [...prevData, ...responseData]);
      setCurrentPage(nextPage); // Actualizar currentPage con el número de la próxima página
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="m-0 p-0">
      <h1 className="text-5xl font-bold my-10 text-center">
        CONTROL DE COBRANZA DE CLIENTES
      </h1>
      <section className="overflow-x-auto overflow-y-auto flex flex-col justify-center items-center h-full">
        <select
          value={periodo}
          onChange={handlePeriodoChange}
          className="border-2 border-black p-1 rounded-md bg-red-400 font-bold hover:bg-red-500 hover:cursor-pointer"
        >
          <option value="">Seleccione un periodo</option>
          {periodosDisponibles.map((periodo) => (
            <option key={periodo} value={periodo}>
              {periodo}
            </option>
          ))}
        </select>

        <Filtros
          filtroCBU={filtroCBU}
          filtroCodigo={filtroCodigo}
          filtroPago={filtroPago}
          setFiltroCBU={setFiltroCBU}
          setFiltroPago={setFiltroPago}
          setFiltroCodigo={setFiltroCodigo}
          currentPage={setCurrentPage}
        />

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
