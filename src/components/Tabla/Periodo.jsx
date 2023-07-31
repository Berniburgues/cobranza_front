import React from 'react';
import { getNombrePeriodo } from '../../utils/fechas';

const Periodo = ({ periodo, setPeriodo, data, setData }) => {
  const periodosDisponibles = ['2023-06-01', '2023-07-01', '2023-08-01']; // Períodos disponibles para seleccionar

  const handlePeriodoChange = (event) => {
    const selectedPeriodo = event.target.value;
    setPeriodo(selectedPeriodo);
    // Si el período seleccionado es vacío, poner el estado data en un arreglo vacío
    if (selectedPeriodo === '') {
      setData([]);
    }
  };

  return (
    <select
      value={periodo}
      onChange={handlePeriodoChange}
      className="border-2 border-gray-800 p-1 text-sm w-24 rounded-md focus:outline-none focus:border-blue-500"
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
