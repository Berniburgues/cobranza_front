import React from 'react';
import { descripcionCodigo } from '../../../utils/descripcionCodigos';

const CeldaCodigo = ({ cobranzasByDate, fechasCobro, cliente }) => {
  const CBU = cliente.CBU; // Acceder directamente a la propiedad CBU del cliente

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
            cellColorClass = 'bg-orange-400';
          } else {
            cellColorClass = 'bg-yellow-400';
          }
        } else if (uniqueCodigos.length > 0) {
          cellColorClass = 'bg-red-500';
        }

        const hasNoCodigo = uniqueCodigos.length === 0; // Verificar si no hay códigos en este día
        const isNotCBU027 = CBU !== '027'; // Verificar si CBU no es '027'

        if (hasNoCodigo && isNotCBU027) {
          cellColorClass = 'bg-gray-400'; // Si no hay códigos y CBU no es '027', pintar la celda de gris
        }

        const lastUniqueCodigo = uniqueCodigos[uniqueCodigos.length - 1];
        const codigoDescripcion = descripcionCodigo(lastUniqueCodigo);

        return (
          <td
            key={index}
            className={`border-2 border-gray-800 px-1 py-2 text-xs font-bold w-1/12 whitespace-nowrap ${cellColorClass}`}
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
