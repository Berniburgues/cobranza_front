import React from 'react';
import { Link } from 'react-router-dom';

const CeldaSocio = ({ cliente }) => {
  return (
    <td
      className="border-2 border-gray-800  text-xs md:text-sm hover:bg-black hover:text-white cursor-pointer"
      title="Buscar Datos"
    >
      <Link to={`/socio?numeroSocio=${cliente.Socio}`} target="_blank">
        <div className="w-full h-full flex items-center justify-center">
          {cliente.Socio}
        </div>
      </Link>
    </td>
  );
};

export default CeldaSocio;
