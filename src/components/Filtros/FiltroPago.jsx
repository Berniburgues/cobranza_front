import React from 'react';

const FiltroPago = ({ filtroPago, setFiltroPago }) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="filtroPago" className="text-base font-medium rounded-md">
        Pago:
      </label>
      <select
        id="filtroPago"
        value={filtroPago}
        onChange={(e) => setFiltroPago(e.target.value)}
        className="border-2 border-gray-800 px-2 py-2 text-base rounded-md focus:outline-none focus:border-blue-500 w-32"
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
