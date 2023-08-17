import React from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { permisosRoles } from '../utils/roles';

const Reportes = () => {
  const { user } = useContext(UserContext);
  const rolesPermitidos = permisosRoles[user.rol];

  // Verifica si el usuario tiene permisos para acceder a la ruta actual
  const accesoDirecto = rolesPermitidos.includes('/reportes/directos');
  const accesoIndirecto = rolesPermitidos.includes('/reportes/indirectos');

  // Si el usuario no tiene acceso a directos ni a indirectos, redirige a home
  if (!accesoDirecto && !accesoIndirecto) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4 font-mono">Reportes</h2>
      <div className="space-x-5">
        {accesoDirecto && (
          <Link
            to="directos"
            className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 font-mono rounded-md w-72 text-center"
          >
            Reportes Directos
          </Link>
        )}
        {accesoIndirecto && (
          <Link
            to="indirectos"
            className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 font-mono rounded-md w-72 text-center"
          >
            Reportes Indirectos
          </Link>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Reportes;
