import React from 'react';

const CeldaPago = ({ cliente, filtroPago }) => {
  return (
    <td
      className={`border-2 border-gray-800 text-[0.5rem] md:text-sm truncate font-bold ${
        cliente.Pago
          ? cliente.Pago === 'OK'
            ? 'bg-green-400'
            : cliente.Pago === 'NO'
            ? 'bg-red-400'
            : cliente.Pago === 'NN'
            ? 'bg-orange-400'
            : 'bg-yellow-300'
          : ''
      }`}
    >
      {cliente.Pago}
    </td>
  );
};

export default CeldaPago;
