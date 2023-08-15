import React from 'react';
import { descripcionCodigo } from '../../../utils/descripcionCodigos';

const CeldaCodigo = ({ cobranzasByDate, fechasCobro, cliente }) => {
  const CBU = cliente.CBU; // Acceder directamente a la propiedad CBU del cliente
  let lastUniqueCodigo = ''; // Variable para rastrear el último código encontrado
  let foundACE = false; // Variable para rastrear si se encontró el código 'ACE'

  return (
    <>
      {fechasCobro.map((fecha, index) => {
        const cobranzas = cobranzasByDate[fecha] || [];
        const uniqueCodigos = cobranzas.length > 0 ? cobranzas[0].Codigo.split('-') : [];
        const hasACE = uniqueCodigos.includes('ACE');
        const isR10 = uniqueCodigos.includes('R10');
        const hasTwoR =
          uniqueCodigos.filter((codigo) => codigo.startsWith('R')).length === 2; // Cambio aquí

        let cellColorClass = '';
        if (hasACE && isR10) {
          cellColorClass = 'bg-gradient-to-b from-yellow-400 to-green-500';
        } else if (hasACE) {
          cellColorClass = 'bg-green-500';
        } else if (hasTwoR) {
          cellColorClass = 'bg-gradient-to-b from-yellow-500 to-red-500';
        } else if (isR10) {
          if (cliente.Pago === 'P') {
            cellColorClass = 'bg-orange-400'; // Si el Pago es 'P', pintar la celda de naranja
          } else {
            cellColorClass = 'bg-yellow-400'; // Si el Pago no es 'P', pintar la celda de amarillo
          }
        } else if (uniqueCodigos.length > 0) {
          cellColorClass = 'bg-red-500';
        }

        const hasNoCodigo = uniqueCodigos.length === 0; // Verificar si no hay códigos en este día
        const isNotCBU027 = CBU !== '027'; // Verificar si CBU no es '027'

        if (hasNoCodigo && isNotCBU027 && !foundACE) {
          cellColorClass = 'bg-slate-500'; // Si no hay códigos y CBU no es '027', pintar la celda de gris
        } else if (hasNoCodigo && foundACE) {
          // Si no hay códigos, CBU no es '027' y se encontró 'ACE' antes, pintar la celda de color 'ACE'
          cellColorClass = 'bg-green-500';
        }

        // Actualizar el último código encontrado y la variable 'foundACE'
        if (uniqueCodigos.length > 0) {
          lastUniqueCodigo = uniqueCodigos[uniqueCodigos.length - 1];
          foundACE = lastUniqueCodigo === 'ACE';
        }

        // Contenido de la celda
        const cellContent = hasNoCodigo ? '-' : uniqueCodigos.join('-');
        // Descripción de la celda (aparecerá solo si hay códigos)
        const codigoDescripcion = hasNoCodigo ? '' : descripcionCodigo(lastUniqueCodigo);

        return (
          <td
            key={index}
            className={`border-2 border-gray-800 py-1 text-center text-[0.7rem] md:font-bold w-1/12 whitespace-nowrap ${cellColorClass}`}
            title={codigoDescripcion}
          >
            {cellContent}
          </td>
        );
      })}
    </>
  );
};

export default CeldaCodigo;
