import React from 'react';
import { descripcionCodigo } from '../../../utils/descripcionCodigos';

const CeldaCodigo = ({ cobranzasByDate, fechasCobro }) => {
  return (
    <>
      {fechasCobro.map((fecha, index) => {
        const cobranzas = cobranzasByDate[fecha] || [];
        const uniqueCodigos = cobranzas.length > 0 ? cobranzas[0].Codigo.split('-') : [];
        const hasACE = uniqueCodigos.includes('ACE');
        const isR10 = uniqueCodigos.includes('R10');

        let cellColorClass = '';
        if (hasACE && isR10) {
          cellColorClass = 'bg-gradient-to-b from-yellow-400 to-green-500';
        } else if (hasACE) {
          cellColorClass = 'bg-green-500';
        } else if (isR10) {
          if (index === fechasCobro.length - 1) {
            // Si es el último R10, se pintará de naranja.
            cellColorClass = 'bg-orange-400';
          } else {
            cellColorClass = 'bg-yellow-400';
          }
        } else if (uniqueCodigos.length > 0) {
          cellColorClass = 'bg-red-500';
        }

        const lastUniqueCodigo = uniqueCodigos[uniqueCodigos.length - 1];
        const codigoDescripcion = descripcionCodigo(lastUniqueCodigo);

        return (
          <td
            key={index}
            className={`border-2 border-gray-800 px-1 py-2 text-xs font-bold w-1/12 ${cellColorClass}`}
            title={codigoDescripcion}
          >
            {uniqueCodigos.join('-')}
          </td>
        );
      })}
    </>
  );
};

export default CeldaCodigo;
