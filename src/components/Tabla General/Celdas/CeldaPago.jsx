import React from 'react';

const CeldaPago = ({ cliente }) => {
  return (
    <td
      className={`border-2 border-gray-800 px-1 py-2 text-sm font-bold ${
        cliente.Pago === 'OK'
          ? 'bg-green-400'
          : cliente.Pago === 'NO'
          ? 'bg-red-400'
          : cliente.Pago === 'NN'
          ? 'bg-orange-400'
          : 'bg-yellow-300'
      }`}
    >
      {cliente.Pago}
    </td>
  );
};

export default CeldaPago;
