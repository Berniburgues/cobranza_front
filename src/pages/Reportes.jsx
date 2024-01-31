import React from 'react';
import { Outlet, Link, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { permisosRoles } from '../utils/roles';

const Reportes = () => {
  const { user } = useContext(UserContext);
  const rolesPermitidos = permisosRoles[user.rol];
  const location = useLocation();
  // Verifica si el usuario tiene permisos para acceder a la ruta actual
  const accesoDirecto = rolesPermitidos.includes('/reportes/directos');
  const accesoIndirecto = rolesPermitidos.includes('/reportes/parciales');

  // Si el usuario no tiene acceso a directos ni a indirectos, redirige a home
  if (!accesoDirecto && !accesoIndirecto) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex flex-col items-center h-full mt-1 mb-10">
      <div className="space-x-5 mt-1 mb-10">
        {accesoDirecto && (
          <>
            <Link
              to="directos"
              className={`bg-blue-500 hover:bg-blue-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
                location.pathname === '/reportes/directos'
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              DIRECTOS
            </Link>

            <Link
              to="indirectos"
              className={`bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
                location.pathname === '/reportes/indirectos'
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              INDIRECTOS
            </Link>
            <Link
              to="parciales"
              className={`bg-orange-500 hover:bg-orange-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
                location.pathname === '/reportes/parciales'
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              PARCIALES
            </Link>
          </>
        )}

        {accesoIndirecto && (
          <Link
            to="parciales"
            className={`bg-orange-500 hover:bg-orange-700 text-white border-2 border-black font-bold p-1 text-base font-libre rounded-md w-72 text-center ${
              location.pathname === '/reportes/parciales'
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Parciales
          </Link>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default Reportes;
