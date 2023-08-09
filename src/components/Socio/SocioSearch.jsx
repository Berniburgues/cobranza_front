// SocioSearch.js
import React, { useEffect } from 'react';

const SocioSearch = ({
  numeroSocio,
  handleNumeroSocioChange,
  handleBuscarClick,
  isLoading,
  initialNumeroSocio,
}) => {
  useEffect(() => {
    if (numeroSocio && isLoading && numeroSocio === initialNumeroSocio) {
      handleBuscarClick();
    }
  }, [numeroSocio, isLoading, initialNumeroSocio]);

  return (
    <div className="flex flex-col items-center my-3">
      <h2 className="text-2xl font-semibold mb-2 text-center underline">Nº Socio:</h2>
      <div className="flex space-x-2 items-center justify-center">
        <input
          className="px-2 py-1 w-24 border-2 text-sm border-black text-center rounded-md focus:outline-none focus:border-blue-500"
          type="number"
          value={numeroSocio}
          onChange={handleNumeroSocioChange}
        />
        <button
          className="w-24 rounded-md bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center"
          onClick={handleBuscarClick}
        >
          {isLoading ? 'Cargando...' : 'Buscar'}
        </button>
      </div>
    </div>
  );
};

export default SocioSearch;
