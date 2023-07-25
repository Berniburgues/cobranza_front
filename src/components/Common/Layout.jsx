import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-auto">
      <nav className="bg-gray-800 p-4 text-white text-2xl font-semibold flex justify-between">
        <div>
          <Link to="/" className="hover:text-gray-500">
            Inicio
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/tabla" className="hover:text-gray-300">
            Tabla
          </Link>
          <Link to="/graficos" className="hover:text-gray-300">
            Gráficos
          </Link>
        </div>
      </nav>
      <main className="container mx-auto py-2 flex-grow max-w-screen-3xl">
        {children}
      </main>
      <footer className="bg-gray-800 p-4 text-white text-center fixed bottom-0 w-full">
        © {new Date().getFullYear()} ATSAPRA
      </footer>
    </div>
  );
};

export default Layout;
