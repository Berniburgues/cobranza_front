import React from 'react';

const CeldaImporte = ({ cliente }) => {
  let colorClass = '';

  // Verificar el valor del pago y asignar la clase de color correspondiente
  if (cliente.Pago === 'OK') {
    colorClass = 'text-green-600'; // Texto verde para pago OK
  } else if (cliente.Pago === 'P') {
    colorClass = 'text-yellow-500'; // Texto amarillo para pago P
  } else if (cliente.Pago === 'NO') {
    colorClass = 'text-red-600'; // Texto rojo para pago NO
  }

  return (
    <td
      className={`border-2 border-gray-800 text-xs font-semibold ${colorClass}`}
    >
      ${cliente.Importe}
    </td>
  );
};

export default CeldaImporte;
