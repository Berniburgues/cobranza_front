import React from 'react';

const FiltroPago = ({ value, onChange }) => {
  return (
    <div className="m-2 text-center">
      <label htmlFor="filtroPago" className="mr-2 text-base font-medium text-center">
        Pago:
      </label>
      <select
        id="filtroPago"
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:border-blue-500"
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
