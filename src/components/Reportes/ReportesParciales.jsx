import React, { useEffect, useState } from 'react';
import { obtenerReportes } from '../../services/obtenerData';

const ReportesParciales = () => {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await obtenerReportes();
        // Filtrar los informes por tipo "directo"
        const reportesFiltrados = data.filter((informe) => informe.parcial === true);
        setInformes(reportesFiltrados); // Asignar los datos filtrados al estado
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setError('Error al cargar los reportes.'); // Manejo de error
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchReportes(); // Llama a la función para obtener reportes
  }, []);

  if (loading) {
    return <div>Cargando reportes...</div>; // Mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar mensaje de error
  }

  return (
    <ul className="flex flex-col">
      {informes.map((informe, index) => (
        <li key={index} className="mb-2">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ReportesParciales;
