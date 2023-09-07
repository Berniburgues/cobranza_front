import React from 'react';
import { formatFecha, getNombrePeriodo } from '../../utils/fechas';
import { Link } from 'react-router-dom';

const HistorialDNITable = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Obtener la lista de todos los días presentes en los pagos
  const dias = new Set();

  // Obtener los días únicos y ordenarlos
  data.forEach((socio) => {
    Object.values(socio.Pagos).forEach((periodo) => {
      Object.keys(periodo).forEach((dia) => {
        dias.add(periodo[dia].dia);
      });
    });
  });

  const diasOrdenados = [...dias].sort((a, b) => a - b);

  return (
    <table className="w-full border-collapse text-center table-fixed text-xs md:text-sm">
      <thead>
        <tr>
          <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
            Socio
          </th>
          <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
            DNI
          </th>
          <th className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0">
            Período
          </th>
          {diasOrdenados.map((dia) => (
            <th
              key={dia}
              className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold sticky inset-0"
            >
              Día {dia}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((socio, index) =>
          Object.keys(socio.Pagos).map((periodo, periodoIndex) => (
            <tr key={`${socio.Socio}_${periodo}`}>
              {periodoIndex === 0 && (
                <td
                  rowSpan={Object.keys(socio.Pagos).length}
                  className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap hover:bg-black hover:text-white cursor-pointer"
                >
                  <Link to={`/socio?numeroSocio=${socio.Socio}`} target="_blank">
                    {socio.Socio}
                  </Link>
                </td>
              )}
              {periodoIndex === 0 && (
                <td
                  rowSpan={Object.keys(socio.Pagos).length}
                  className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap"
                >
                  {socio.DNI}
                </td>
              )}
              <td className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap italic">
                {getNombrePeriodo(periodo)}
              </td>
              {diasOrdenados.map((dia) => {
                const diaColumnData = socio.Pagos[periodo]
                  .filter((pago) => pago.dia === dia)
                  .map((pago, index) => (
                    <div
                      key={index}
                      title={formatFecha(pago.FechaCobro)}
                      className="bg-green-500"
                    >
                      {pago.Codigo}
                    </div>
                  ));
                return (
                  <td
                    key={dia}
                    className="border-2 border-black text-center text-[0.50rem] md:text-sm font-bold truncate whitespace-nowrap p-0"
                  >
                    {diaColumnData.length > 0 ? diaColumnData : '-'}
                  </td>
                );
              })}
            </tr>
          )),
        )}
      </tbody>
    </table>
  );
};

export default HistorialDNITable;
