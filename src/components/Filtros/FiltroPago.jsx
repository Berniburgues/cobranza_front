import React from 'react';

const FiltroPago = ({ filtroPago, setFiltroPago }) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="filtroPago" className="text-sm">
        Pago:
      </label>
      <select
        id="filtroPago"
        value={filtroPago}
        onChange={(e) => setFiltroPago(e.target.value)}
        className="border-2 border-gray-800 px-2 py-1 text-sm"
      >
        <option value="">Todos</option>
        <option value="OK">OK</option>
        <option value="NO">NO</option>
        <option value="P">Parcial</option>
        <option value="NN">Sin datos</option>
      </select>
    </div>
  );
};

export default FiltroPago;
