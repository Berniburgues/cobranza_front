import React from 'react';

const SocioSearch = ({
  numerosSocio,
  handleNumerosSocioChange,
  handleBuscarClick,
  isLoading,
}) => {
  return (
    <div className="flex flex-col items-center my-3">
      <h2 className="text-2xl font-semibold mb-2 text-center underline">
        Buscar por DNI:
        <span className="text-center block italic text-xs">
          Si es más de uno, separar por coma sin espacio
        </span>
      </h2>
      <div className="flex space-x-2 items-center justify-center">
        <input
          className="px-2 py-1 w-[500px] border-2 text-sm border-black rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          value={numerosSocio}
          onChange={handleNumerosSocioChange}
        />
        <button
          className={`w-24 rounded-md justify-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleBuscarClick}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Buscar'}
        </button>
      </div>
    </div>
  );
};

export default SocioSearch;
