import React from 'react';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const CBU = ({ cbu, periodoSeleccionado, handleCBUChange }) => {
  const clavesBancos = periodoSeleccionado ? Object.keys(periodoSeleccionado) : [];

  return (
    <select
      value={cbu}
      onChange={handleCBUChange}
      className="border-2 border-gray-800 p-1 text-xs md:text-sm w-16 md:w-24 rounded-md focus:outline-none focus:border-blue-500"
    >
      <option value="">Banco</option>
      {clavesBancos.map((claveBanco) => (
        <option key={claveBanco} value={claveBanco}>
          {determinarBancoPorCBU(claveBanco)}
        </option>
      ))}
    </select>
  );
};

export default CBU;
