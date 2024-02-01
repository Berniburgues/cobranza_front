import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { UserContext } from '../../contexts/UserContext';
import ScrollTop from '../Common/ScrollTop';

const Layout = ({ children }) => {
  const { user, removeUser } = useContext(UserContext); // Obtén el usuario y la función removeUser del contexto
  const navigate = useNavigate(); // Obtén la función de navegación

  const handleLogout = () => {
    removeUser(); // Llama a la función de deslogueo al hacer clic en el botón
    navigate('/'); // Utiliza la función navigate para redirigir al usuario a la página de inicio
  };

  return (
    <section className="flex flex-col min-h-screen">
      <ScrollTop />
      <nav className="bg-slate-800 border-b border-black p-2 text-white text-sm font-semibold flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/home" className="hover:text-blue-400">
            INICIO
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-400 ml-4"
            >
              SALIR
            </button>
          )}
        </div>
        <a href="https://atsapra.com.ar/" target="blank" className="mx-auto">
          <img
            src="https://atsapra.com.ar/wp-content/uploads/2023/09/Mesa-de-trabajo-9.png"
            alt="Logo"
            className="w-auto h-7"
          />
        </a>

        <div className="space-x-4">
          <Link to="/tablas" className="hover:text-blue-400" target="_blank">
            TABLAS
          </Link>
          <Link to="/reportes" className="hover:text-blue-400" target="_blank">
            REPORTES
          </Link>
        </div>
      </nav>
      <main className="container mx-auto pt-1 flex-grow max-w-screen-3xl">
        {children}
      </main>
      <footer className="bg-slate-800 text-white gap-3 pt-1 text-center text-xs mt-auto border-t border-black flex flex-wrap items-center justify-center">
        <p className="italic">
          &copy; 2024{' '}
          <a href="https://atsapra.com.ar" className="text-blue-600 hover:text-blue-500">
            ATSAPRA
          </a>{' '}
          TODOS LOS DERECHOS RESERVADOS
        </p>
      </footer>
    </section>
  );
};

export default Layout;
