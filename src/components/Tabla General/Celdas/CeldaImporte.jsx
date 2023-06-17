import React from 'react';

const CeldaImporte = ({ cliente }) => {
  return (
    <td className="border-2 border-gray-800 px-1 py-2 text-sm">${cliente.Importe}</td>
  );
};

export default CeldaImporte;
