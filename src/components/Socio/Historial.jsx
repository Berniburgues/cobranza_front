import React from 'react';
import { descripcionCodigo } from '../../utils/descripcionCodigos';
import { getNombrePeriodo } from '../../utils/fechas';

const Historial = ({ datosFijos }) => {
  return (
    <article className="my-5">
      <h2 className="text-2xl underline font-semibold mb-2 text-center">
        Historial de Cobro
      </h2>
      <table className="w-full border-collapse text-center table-fixed text-sm">
        <thead>
          <tr>
            <th className="border-2 border-gray-800 py-1 bg-black text-white">Período</th>
            {[
              ...new Set(
                Object.values(datosFijos.cobranza).flatMap((periodoData) =>
                  periodoData.map((item) => item.dia),
                ),
              ),
            ]
              .sort((a, b) => a - b)
              .map((dia, index) => (
                <th
                  key={index}
                  className="border-2 border-gray-800 py-1 bg-black text-white"
                >
                  Día {dia}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(datosFijos.cobranza).map((periodo) => (
            <tr key={periodo}>
              <td className="border-2 border-black p-1 font-semibold italic">
                {getNombrePeriodo(periodo)}
              </td>
              {[
                ...new Set(
                  Object.values(datosFijos.cobranza).flatMap((periodoData) =>
                    periodoData.map((item) => item.dia),
                  ),
                ),
              ]
                .sort((a, b) => a - b)
                .map((dia, index) => {
                  const cobroDia = datosFijos.cobranza[periodo].filter(
                    (item) => item.dia === dia,
                  );

                  const codigos = cobroDia.map((item) => item.codigo).join('-');
                  const ultimoCodigo = cobroDia[cobroDia.length - 1]?.codigo || '';
                  const descripcion = ultimoCodigo ? descripcionCodigo(ultimoCodigo) : '';

                  const hasACE = codigos.includes('ACE');
                  const hasR10 = codigos.includes('R10');
                  let cellColorClass = '';
                  if (hasACE && hasR10) {
                    cellColorClass = 'bg-gradient-to-b from-yellow-400 to-green-500';
                  } else if (hasACE) {
                    cellColorClass = 'bg-green-500';
                  } else if (hasR10) {
                    cellColorClass = 'bg-yellow-400';
                  } else if (ultimoCodigo) {
                    cellColorClass = 'bg-red-500';
                  }

                  return (
                    <td
                      key={index}
                      className={`border-2 border-black p-1 font-bold ${cellColorClass}`}
                      title={descripcion}
                    >
                      {codigos || '-'}
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Historial;
