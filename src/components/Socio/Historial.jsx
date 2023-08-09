import React from 'react';
import { descripcionCodigo } from '../../utils/descripcionCodigos';
import { getNombrePeriodo } from '../../utils/fechas';

const Historial = ({ datosFijos }) => {
  return (
    <article className="my-5">
      <h2 className="text-2xl underline font-semibold mb-2 text-center">
        Historial de Cobro
      </h2>
      <table className="w-full border-collapse text-center table-fixed text-xs md:text-sm">
        <thead>
          <tr>
            <th className="border-2 border-gray-800  bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold">
              Período
            </th>
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
                  className="border-2 border-gray-800  bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold"
                >
                  Día {dia}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(datosFijos.cobranza).map((periodo) => (
            <tr key={periodo}>
              <td className="border-2 border-black text-center font-semibold md:font-bold text-[0.50rem] md:text-xs  truncate whitespace-nowrap italic">
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
                  const isR10 = codigos.includes('R10');
                  const hasTwoR =
                    codigos.split('-').filter((codigo) => codigo.startsWith('R'))
                      .length === 2;

                  let cellColorClass = '';
                  if (hasACE && isR10) {
                    cellColorClass = 'bg-gradient-to-b from-yellow-400 to-green-500';
                  } else if (hasTwoR) {
                    cellColorClass = 'bg-gradient-to-b from-yellow-500 to-red-500';
                  } else if (hasACE) {
                    cellColorClass = 'bg-green-500';
                  } else if (isR10) {
                    cellColorClass = 'bg-yellow-400';
                  } else if (ultimoCodigo) {
                    cellColorClass = 'bg-red-500';
                  }

                  // Agregar fecha de cobro al título
                  const fechaCobro = cobroDia.length > 0 ? cobroDia[0].fecCobro : '';
                  const fechaCobroFormateada = fechaCobro
                    ? fechaCobro.split('-').slice(1).reverse().join('/')
                    : '';

                  const titleText = `${fechaCobroFormateada} - ${descripcion}`;

                  return (
                    <td
                      key={index}
                      className={`border-2 border-black text-center text-[0.50rem] md:text-sm font-bold truncate whitespace-nowrap ${cellColorClass}`}
                      title={titleText}
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
