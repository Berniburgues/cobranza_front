import React, { useEffect, useState } from 'react';
import { getSociosYServicios } from '../services/obtenerData';

const SociosServicios = () => {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSociosYServicios();
        setSocios(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  const serviciosColumns =
    socios.length > 0
      ? Object.keys(socios[0]).filter(
          (key) =>
            key !== 'SOCIO' &&
            key !== 'NOMBRE' &&
            key !== 'DOCUMENTO' &&
            key !== 'ESADHERENTE' &&
            key !== 'BANCO' &&
            key !== 'ENVIOBCO',
        )
      : [];

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = socios.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(socios.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Socios y Servicios</h1>
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] border border-gray-200 rounded">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Socio</th>
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Documento</th>
              <th className="py-2 px-4 border">Titular</th>
              <th className="py-2 px-4 border">Banco</th>
              <th className="py-2 px-4 border">BancoEnvio</th>
              {serviciosColumns.map((servicio, index) => (
                <th key={index} className="py-2 px-4 border">
                  {servicio}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((socio, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{socio.SOCIO}</td>
                <td className="py-2 px-4 border">{socio.NOMBRE}</td>
                <td className="py-2 px-4 border">{socio.DOCUMENTO}</td>
                <td className="py-2 px-4 border">
                  {socio.ESADHERENTE === 0 ? 'Sí' : 'No'}
                </td>
                <td className="py-2 px-4 border">{socio.BANCO}</td>
                <td className="py-2 px-4 border">{socio.ENVIOBCO}</td>
                {serviciosColumns.map((servicio, index) => (
                  <td
                    key={index}
                    className={`py-2 px-4 border ${
                      socio[servicio] === 1 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {socio[servicio] === 1 ? 'Sí' : 'No'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index + 1)}
            className={`mx-1 px-2 py-1 text-sm rounded ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SociosServicios;
