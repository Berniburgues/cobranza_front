import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { permisosRoles } from '../../utils/roles';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const rutaActual = window.location.pathname;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const rolesPermitidos = permisosRoles[user.rol];

  // Verifica si el usuario tiene acceso a la ruta actual
  if (rolesPermitidos.includes(rutaActual)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/denegado" replace />;
  }
};

export default ProtectedRoute;
