import React from 'react';

const CeldaSocio = ({ cliente }) => {
  return <td className="border-2 border-gray-800 text-sm">{cliente.Socio}</td>;
};

export default CeldaSocio;
