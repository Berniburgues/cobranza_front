import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">
        ATSAPRA: Control de Cobranza y Reportes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-3xl">
        <Link to="/tabla">
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg text-base shadow-md w-full">
            Tabla
          </button>
        </Link>
        <Link to="/socio">
          <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg text-base shadow-md w-full mt-3 md:mt-0">
            Historial de Socio
          </button>
        </Link>
        <Link to="/reportes">
          <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg text-base shadow-md w-full mt-3 md:mt-0">
            Reportes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
