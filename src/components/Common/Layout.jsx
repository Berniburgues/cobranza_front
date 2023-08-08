import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <section className="flex flex-col h-screen overflow-x-auto">
      <nav className="bg-gray-800 border-b-2 border-b-slate-500 px-4 py-1 text-white text-base font-semibold flex justify-between">
        <div>
          <Link to="/" className="hover:text-gray-500">
            Inicio
          </Link>
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
