import React from 'react';
import { getNombrePeriodo } from '../../utils/fechas';

const Periodo = ({ periodo, handlePeriodoChange, filtrosData }) => {
  const periodosDisponibles =
    filtrosData && filtrosData.data ? Object.keys(filtrosData.data) : [];

  return (
    <select
      value={periodo || ''}
      onChange={handlePeriodoChange}
      className="border-2 border-black bg-white hover:bg-gray-200 cursor-pointer p-1 text-xs md:text-sm w-16 md:w-24 rounded-md focus:outline-none focus:border-blue-500"
    >
      <option value="">Período</option>
      {periodosDisponibles.map((periodo) => (
        <option key={periodo} value={periodo}>
          {getNombrePeriodo(periodo)}
        </option>
      ))}
    </select>
  );
};

export default Periodo;
