import React from 'react';
import { determinarBancoPorCBU } from '../../../utils/determinarBancoPorCbu';

const CeldaCBU = ({ cliente }) => {
  const nombreBanco = determinarBancoPorCBU(cliente.CBU);

  return (
    <td
      className={`border-2 border-gray-800 px-1 py-2 text-sm ${
        cliente.CBU !== '027' ? 'bg-blue-500 text-black font-semibold' : ''
      }`}
      title={`${nombreBanco}`}
    >
      {cliente.CBU}
    </td>
  );
};

export default CeldaCBU;
