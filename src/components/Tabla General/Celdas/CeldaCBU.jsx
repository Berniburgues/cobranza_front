import React from 'react';
import { determinarBancoPorCBU } from '../../../utils/determinarBancoPorCbu';

const CeldaCBU = ({ cliente, filtroCBU }) => {
  const nombreBanco = determinarBancoPorCBU(cliente.CBU);

  // Verificar si el CBU no es igual a "027" y si no se está filtrando por "027"
  const isCbuAzul = cliente.CBU !== '027' && filtroCBU !== '027';

  return (
    <td
      className={`border-2 border-gray-800 px-1 py-2 text-sm ${
        isCbuAzul ? 'bg-blue-500 text-black font-semibold' : ''
      }`}
      title={`${nombreBanco}`}
    >
      {cliente.CBU}
    </td>
  );
};

export default CeldaCBU;
