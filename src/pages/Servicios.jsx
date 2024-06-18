import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Servicios = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center h-full mt-1 mb-3">
      <div className="space-x-5 mt-1 mb-3">
        <Link
          to="beneficiosServicios"
          className={`bg-blue-500 hover:bg-blue-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
            location.pathname === '/servicios/beneficiosServicios'
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          BENEFICIOS Y SERVICIOS
        </Link>

        <Link
          to="sociosServicios"
          className={`bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
            location.pathname === '/servicios/sociosServicios'
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          SOCIOS Y SERVICIOS
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Servicios;
