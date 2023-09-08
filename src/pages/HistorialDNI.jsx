import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { fetchHistorialDNI, fetchFiltrosDNI } from '../services/obtenerData';
import HistorialDNITable from '../components/Historial DNI/HistorialDNITable';
import FiltroLoader from '../components/Tabla/FiltroLoader';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { getNombrePeriodo } from '../utils/fechas';

const HistorialDNI = () => {
  const [banco, setBanco] = useState(null);
  const [periodo, setPeriodo] = useState([]);
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
    if (banco && periodo.length > 0) {
      setIsLoading(true);
      try {
        const historialData = await fetchHistorialDNI(
          banco.value,
          periodo.map((p) => p.value),
        );
        if (historialData) {
          setData(historialData);
          setErrorMessage(null);
        } else {
          setData([]);
          setErrorMessage(
            'No se encontraron datos para el Banco y período proporcionados',
          );
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setErrorMessage('Error al cargar los datos en el servidor');
      }
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      {isLoadingFiltros ? (
        <FiltroLoader loading={isLoadingFiltros} />
      ) : (
        <div className="mb-2 flex flex-wrap gap-2">
          <div className="w-64 text-xs">
            <Select
              value={banco}
              onChange={(selectedOption) => setBanco(selectedOption)}
              options={filtrosData.data.bancos.map((banco) => ({
                value: banco,
                label: determinarBancoPorCBU(banco),
              }))}
              isSearchable={false}
              placeholder="Seleccione un banco"
            />
          </div>
          <div className="w-64 text-xs">
            <Select
              value={periodo}
              onChange={(selectedOptions) => setPeriodo(selectedOptions)}
              options={filtrosData.data.periodos.map((periodo) => ({
                value: periodo,
                label: getNombrePeriodo(periodo),
              }))}
              isMulti
              placeholder="Seleccione período(s)"
            />
          </div>
          <button
            onClick={handleBuscarClick}
            className={`w-24 rounded-md justify-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            Buscar
          </button>
        </div>
      )}
      <div>
        {isLoading ? (
          <p className="italic font-semibold">Cargando...</p>
        ) : errorMessage ? (
          <p className="italic font-semibold text-red-500">{errorMessage}</p>
        ) : (
          <>
            <p>Total de socios: {data.count}</p>
            <HistorialDNITable data={data.data} />
          </>
        )}
      </div>
    </section>
  );
};

export default HistorialDNI;
