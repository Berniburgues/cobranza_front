// Reportes.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Reportes = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4 font-mono">Reportes</h2>
      <div className="space-x-5">
        <Link
          to="internos"
          className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 font-mono rounded-md w-52 text-center"
        >
          Reportes Internos
        </Link>
        <Link
          to="varios"
          className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 font-mono rounded-md w-52 text-center"
        >
          Reportes Varios
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Reportes;
