import React from 'react';
import { Link } from 'react-router-dom';
import ScrollTop from '../Common/ScrollTop';

const Layout = ({ children }) => {
  return (
    <section className="flex flex-col min-h-screen">
      <ScrollTop />
      <nav className="bg-slate-800 border-b h-12 border-black p-2 text-white text-base font-semibold flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/home"
            className="hover:text-blue-400 border-b border-transparent hover:border-blue-400 transition transform"
          >
            INICIO
          </Link>
        </div>
        <div className="flex items-center justify-center gap-10 ml-56">
          <a
            href="https://atsapra.com.ar/"
            target="blank"
            className="mx-auto hover:filter hover:saturate-200 transition transform hover:scale-105"
          >
            <img
              src="https://atsapra.com.ar/wp-content/uploads/2025/01/cropped-cropped-Mesa-de-trabajo-5-1-1-300x68.png"
              alt="Logo Atsapra"
              className="w-auto h-8"
            />
          </a>
          <a
            href="https://www.asistirservicios.com.ar/"
            target="blank"
            className="mx-auto hover:filter hover:saturate-200 transition transform hover:scale-110"
          >
            <img
              src="https://www.asistirservicios.com.ar/assets/img/logo.png"
              alt="Logo Asistir"
              className="w-auto h-10"
            />
          </a>
        </div>
        <div className="space-x-3">
          <Link
            to="/tablas"
            className="hover:text-blue-400 border-b border-transparent hover:border-blue-400 transition transform"
            target="_blank"
          >
            TABLAS
          </Link>
          <Link
            to="/reportes"
            className="hover:text-blue-400 border-b border-transparent hover:border-blue-400 transition transform"
            target="_blank"
          >
            REPORTES
          </Link>
          <Link
            to="/servicios"
            className="hover:text-blue-400 text-blu-500 border-b border-transparent hover:border-blue-400 transition transform"
            target="_blank"
          >
            SERVICIOS
          </Link>
          <Link
            to="/padron"
            className="hover:text-blue-400 text-blu-500 border-b border-transparent hover:border-blue-400 transition transform"
            target="_blank"
          >
            PADRONES
          </Link>
          <Link
            to="/tablas/stopDebit"
            className="hover:text-red-400 text-red-500 border-b border-transparent hover:border-red-400 transition transform"
            target="_blank"
          >
            STOP-DEBIT
          </Link>
        </div>
      </nav>
      <main className="container mx-auto pt-1 flex-grow max-w-screen-3xl transition">
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
