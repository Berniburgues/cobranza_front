import React from 'react';

const FiltroCodigo = ({ value, onChange }) => {
  return (
    <div className="m-2 text-center">
      <label htmlFor="filtroCodigo" className="mr-2 text-lg font-medium">
        Código:
      </label>
      <select
        id="filtroCodigo"
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:border-blue-500"
      >
        <option value="">Todos</option>
        <option value="ACE">ACE</option>
        <option value="R02">R02</option>
        <option value="R03">R03</option>
        <option value="R04">R04</option>
        <option value="R05">R05</option>
        <option value="R08">R08</option>
        <option value="R10">R10</option>
      </select>
    </div>
  );
};

export default FiltroCodigo;
