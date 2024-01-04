import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchHistorialDNI, fetchFiltrosDNI } from '../services/obtenerData';
import HistorialDNITable from '../components/Historial DNI/HistorialDNITable';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { getNombrePeriodo } from '../utils/fechas';
import FiltroLoader from '../components/Historial DNI/FiltroLoader';

const HistorialDNI = () => {
  const [banco, setBanco] = useState(null);
  const [periodo, setPeriodo] = useState('');
  const [dniComienzaCon, setDniComienzaCon] = useState('');
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
        ? filtrosData.data.periodos.map((p) => p.value)
        : periodo.map((p) => p.value);

      const historialData = await fetchHistorialDNI(
        banco.value,
        selectedPeriodos,
        dniComienzaCon,
      );

      if (historialData) {
        setData(historialData);
      } else {
        setData([]);
        setErrorMessage(
          'No se encontraron datos para el Banco, período y DNI proporcionados',
        );
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
              options={[
                // Primero, agregar las opciones con valor "011" y "014"
                {
                  value: '011',
                  label: determinarBancoPorCBU('011'), // Reemplaza 'determinarBancoPorCBU' con la función que obtiene el nombre del banco
                },
                {
                  value: '014',
                  label: determinarBancoPorCBU('014'),
                },
                // Luego, agregar las demás opciones
                ...filtrosData.data.bancos
                  .filter(
                    (banco) =>
                      banco !== '011' &&
                      banco !== '014' &&
                      banco !== '000' &&
                      determinarBancoPorCBU(banco) !== 'Desconocido',
                  )
                  .map((banco) => ({
                    value: banco,
                    label: determinarBancoPorCBU(banco),
                  })),
              ]}
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
          <div className="w-40 text-xs">
            <input
              type="text"
              placeholder="Comienzo DNI"
              value={dniComienzaCon}
              onChange={(e) => setDniComienzaCon(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 h-9"
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
            className={`w-auto rounded-md justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
              isLoading || data.length === 0 || !banco
                ? 'cursor-not-allowed opacity-50'
                : ''
            }`}
            disabled={isLoading || data.length === 0 || !banco}
          >
            Nueva Consulta
          </button>
        </div>
      )}
      <div>
        {errorMessage ? (
          <p className="italic font-semibold text-red-500">{errorMessage}</p>
        ) : (
          <>
            <div className="text-center">
              <h3 className="font-bold text-2xl underline">
                Banco: {banco && determinarBancoPorCBU(banco.value)}
              </h3>
              <p>Cantidad de Socios encontrados: {data.count}</p>
            </div>
            <HistorialDNITable data={data.data} />
          </>
        )}
      </div>
    </section>
  );
};

export default HistorialDNI;
