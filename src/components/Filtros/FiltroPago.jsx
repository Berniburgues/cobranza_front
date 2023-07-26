import React from 'react';

const FiltroPago = ({ filtroPago, setFiltroPago }) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="filtroCBU" className="text-sm rounded-md font-semibold">
        Pago
      </label>
      <select
        id="filtroPago"
        value={filtroPago}
        onChange={(e) => setFiltroPago(e.target.value)}
        className="border-2 border-gray-800 p-1 text-sm rounded-md focus:outline-none focus:border-blue-500 w-24"
      >
        <option value="">Todos</option>
        <option value="OK">OK</option>
        <option value="NO">NO</option>
        <option value="P">Parcial</option>
      </select>
    </div>
  );
};

export default FiltroPago;
