import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { UserContext } from '../../contexts/UserContext';

const Layout = ({ children }) => {
  const { user, removeUser } = useContext(UserContext); // Obtén el usuario y la función removeUser del contexto
  const navigate = useNavigate(); // Obtén la función de navegación

  const handleLogout = () => {
    removeUser(); // Llama a la función de deslogueo al hacer clic en el botón
    navigate('/'); // Utiliza la función navigate para redirigir al usuario a la página de inicio
  };

  return (
    <section className="flex flex-col h-screen overflow-x-auto">
      <nav className="bg-gray-800 border-b-2 border-b-slate-500 px-4 py-2 text-white text-sm md:text-base font-semibold flex justify-between">
        <div>
          <Link to="/home" className="hover:text-gray-300">
            Inicio
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-400 ml-4"
            >
              Salir
            </button>
          )}
        </div>
        <div className="space-x-4">
          <Link to="/tabla" className="hover:text-gray-300" target="_blank">
            Tabla
          </Link>
          <Link to="/socio" className="hover:text-gray-300" target="_blank">
            Historial Socio
          </Link>
          <Link to="/reportes" className="hover:text-gray-300" target="_blank">
            Reportes
          </Link>
        </div>
      </nav>
      <main className="container mx-auto pt-1 flex-grow max-w-screen-3xl">
        {children}
      </main>
    </section>
  );
};

export default Layout;
