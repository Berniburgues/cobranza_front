import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveUser = (userData, authToken) => {
    setUser({ ...userData, rol: obtenerRolUsuario(userData) });
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const removeUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const obtenerRolUsuario = (userData) => {
    // Lógica para obtener el rol del usuario según la estructura de tu objeto de usuario
    return userData ? userData.rol : null;
  };

  const value = { user, token, saveUser, removeUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
