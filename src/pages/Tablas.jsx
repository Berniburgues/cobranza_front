import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Tablas = () => {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="space-x-5 mt-1 mb-10">
        <Link
          to="tabla"
          className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center"
        >
          Tabla Madre
        </Link>
        <Link
          to="socio"
          className="bg-yellow-500 hover:bg-yellow-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center"
        >
          Historial Socio
        </Link>
        <Link
          to="historialACE"
          className="bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center"
        >
          Historial ACE
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Tablas;
