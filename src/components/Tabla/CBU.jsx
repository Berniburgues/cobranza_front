import React from 'react';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const CBU = ({ cbu, periodoSeleccionado, handleCBUChange }) => {
  const clavesBancos = periodoSeleccionado ? Object.keys(periodoSeleccionado) : [];

  // Define el orden de prioridad deseado
  const prioridadCBU = ['027', '011', '014'];

  // Ordena las claves bancarias según la prioridad definida
  clavesBancos.sort((a, b) => {
    const indexA = prioridadCBU.indexOf(a);
    const indexB = prioridadCBU.indexOf(b);

    if (indexA === -1) return 1; // Si no está en la lista de prioridad, colócalo al final
    if (indexB === -1) return -1; // Si no está en la lista de prioridad, colócalo al final

    return indexA - indexB;
  });

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
