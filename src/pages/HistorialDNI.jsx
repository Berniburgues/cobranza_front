import React, { useState } from 'react';
import { fetchHistorialDNI } from '../services/obtenerData';
import HistorialDNITable from '../components/Historial DNI/HistorialDNITable';

const HistorialDNI = () => {
  const [banco, setBanco] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);

  const handleBuscarClick = async () => {
    if (banco) {
      setIsLoading(true);
      try {
        const historialData = await fetchHistorialDNI(banco);
        if (historialData) {
          setData(historialData);
          setErrorMessage(null);
        } else {
          setData([]);
          setErrorMessage('No se encontraron datos para el Banco proporcionado');
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setErrorMessage('Error al cargar los datos en el servidor');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 flex flex-wrap gap-3">
        <input
          type="text"
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
          placeholder="Ingrese el banco"
          className="border-2 border-black rounded px-2 py-1"
        />
        <button
          onClick={handleBuscarClick}
          className={`w-24 rounded-md justify-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Buscar
        </button>
      </div>
      <div>
        {isLoading ? (
          <p className="italic font-semibold">Cargando...</p>
        ) : errorMessage ? (
          <p className="italic font-semibold text-red-500">{errorMessage}</p>
        ) : (
          <HistorialDNITable data={data} />
        )}
      </div>
    </div>
  );
};

export default HistorialDNI;
