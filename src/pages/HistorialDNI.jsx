import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchHistorialDNI, fetchFiltrosDNI } from '../services/obtenerData';
import HistorialDNITable from '../components/Historial DNI/HistorialDNITable';
import FiltroLoader from '../components/Tabla/FiltroLoader';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { getNombrePeriodo } from '../utils/fechas';

const HistorialDNI = () => {
  const [banco, setBanco] = useState(null);
  const [periodo, setPeriodo] = useState([{ value: 'todos', label: 'Todos' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);
  const [filtrosData, setFiltrosData] = useState([]);
  const [isLoadingFiltros, setIsLoadingFiltros] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const filtrosData = await fetchFiltrosDNI();
        setFiltrosData(filtrosData);
        setIsLoadingFiltros(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    fetchInitialData();
  }, []);

  const handleBuscarClick = async () => {
    if (!banco) {
      setErrorMessage('Seleccione un banco');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const selectedPeriodos = periodo.includes('todos')
        ? filtrosData.data.periodos.map((p) => p.value) // Si se selecciona 'todos', usar todos los periodos
        : periodo.map((p) => p.value); // De lo contrario, usar los periodos seleccionados

      const historialData = await fetchHistorialDNI(banco.value, selectedPeriodos);

      if (historialData) {
        setData(historialData);
      } else {
        setData([]);
        setErrorMessage('No se encontraron datos para el Banco y período proporcionados');
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      setErrorMessage('Error al cargar los datos en el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetClick = () => {
    // Función para reiniciar la tabla
    setBanco(null);
    setPeriodo(['todos']); // Restablecer a 'todos'
    setData([]);
    setErrorMessage(null);
  };

  return (
    <section className="flex flex-col items-center justify-center mt-2">
      {isLoadingFiltros ? (
        <FiltroLoader loading={isLoadingFiltros} />
      ) : (
        <div className="mb-2 flex flex-wrap gap-2">
          <div className="w-40 text-xs">
            <Select
              value={banco}
              onChange={(selectedOption) => setBanco(selectedOption)}
              options={filtrosData.data.bancos.map((banco) => ({
                value: banco,
                label: determinarBancoPorCBU(banco),
              }))}
              isSearchable={false}
              placeholder="Banco"
            />
          </div>
          <div className="relative w-auto text-xs">
            <Select
              value={periodo}
              onChange={(selectedOptions) => setPeriodo(selectedOptions)}
              options={[
                { value: 'todos', label: 'Todos' },
                ...filtrosData.data.periodos.map((periodo) => ({
                  value: periodo,
                  label: getNombrePeriodo(periodo),
                })),
              ]}
              isMulti
              placeholder="Período(s)"
              className="max-h-40 min-w-[64px] "
            />
          </div>
          <button
            onClick={handleBuscarClick}
            className={`w-24 rounded-md justify-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
              isLoading || !banco ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isLoading || !banco}
          >
            {isLoading ? 'Cargando...' : 'Buscar'}
          </button>
          <button
            onClick={handleResetClick}
            className={`w-24 rounded-md justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
              isLoading || data.length === 0 || !banco
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
            disabled={isLoading || data.length === 0 || !banco}
          >
            Reiniciar
          </button>
        </div>
      )}
      <div>
        {errorMessage ? (
          <p className="italic font-semibold text-red-500">{errorMessage}</p>
        ) : (
          <>
            <p className="font-semibold text-center text-sm mb-2">
              Socios encontrados con pagos{' '}
              <span className="italic text-green-500 underline">aceptados:</span>
              <span className="font-bold text-green-500"> {data.count}</span>
            </p>
            <HistorialDNITable data={data.data} />
          </>
        )}
      </div>
    </section>
  );
};

export default HistorialDNI;
