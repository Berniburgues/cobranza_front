import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Tablas = () => {
  // Obtén la ubicación actual
  const location = useLocation();

  return (
    <div className="flex flex-col items-center h-full">
      <div className="space-x-5 mt-1 mb-10">
        <Link
          to="tablaPagos"
          target="_blank"
          className={`bg-blue-500 hover:bg-blue-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
            location.pathname === '/tablas/tablaPagos'
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          Tabla General
        </Link>
        <Link
          to="socio"
          target="_blank"
          className={`bg-yellow-500 hover:bg-yellow-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
            location.pathname === '/tablas/socio' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Historial Socio
        </Link>
        <Link
          to="historialACE"
          target="_blank"
          className={`bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
            location.pathname === '/tablas/historialACE'
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          Historial ACE
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Tablas;
