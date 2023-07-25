import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Control de Cobranza y Gráficos. ATSAPRA
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/tabla">
          <button className="bg-blue-500 hover:bg-blue-600 text-white  px-5 py-3 rounded-lg text-xl shadow-md w-full">
            Tabla
          </button>
        </Link>
        <Link to="/graficos">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg text-xl shadow-md w-full">
            Gráficos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
