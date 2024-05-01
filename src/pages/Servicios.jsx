import React, { useState, useEffect } from 'react';
import { getServiciosYBeneficios } from '../services/obtenerData';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const data = await getServiciosYBeneficios();
        setServicios(data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <section className="text-gray-700 body-font text-base text-center">
      <div className=" max-w-screen-3xl mx-auto">
        <div className="flex flex-col text-center w-full mb-2">
          <h2 className="font-medium  text-gray-900 text-3xl underline">
            SERVICIOS Y BENEFICIOS
          </h2>
        </div>
        <div className="overflow-auto max-h-[45rem]">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border bg-black text-white border-gray-300 tracking-wider font-medium text-xs">
                  SERVICIO\BENEFICIO
                </th>
                {/* Iterar sobre los nombres de los beneficios para crear las columnas */}
                {Object.keys(servicios[0] || {}).map(
                  (beneficio, index) =>
                    index !== 0 && ( // Evitar renderizar el primer beneficio como "Servicio"
                      <th
                        key={beneficio}
                        className="p-2 sticky top-0 z-50 bg-black text-white border border-gray-300 title-font tracking-wider font-medium text-base"
                      >
                        {beneficio}
                      </th>
                    ),
                )}
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio, index) => (
                <tr key={index}>
                  <td className="border bg-gray-200 border-gray-300 text-gray-900 font-medium p-2">
                    {servicio.Servicio}
                  </td>
                  {Object.values(servicio).map(
                    (tieneBeneficio, index) =>
                      index !== 0 && (
                        <td
                          key={index}
                          className={`border border-gray-200 p-2 ${
                            tieneBeneficio
                              ? 'text-green-500 font-semibold'
                              : 'text-red-500 font-light'
                          }`}
                        >
                          {tieneBeneficio ? 'SI' : 'NO'}
                        </td>
                      ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
