import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnviosFuturos from '../components/Reportes/EnviosFuturos';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true); // Abre el modal al principio

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Llamamos a openModal en el efecto, después de que el componente se haya montado
  useEffect(() => {
    const openModal = () => {
      setModalIsOpen(true);
    };

    openModal();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold font-libre mb-4 text-center">
        ATSAPRA: Sistema de Control
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-3xl font-libre">
        <Link to="/tabla">
          <button className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black p-2 rounded-lg text-lg shadow-md w-full">
            Tabla
          </button>
        </Link>
        {/* 
<Link to="/historialDNI">
  <button className="bg-violet-500 hover:bg-violet-700 text-white border-2 border-black p-2 rounded-lg text-lg shadow-md w-full">
    Historial DNI
  </button>
</Link>
*/}

        <Link to="/socio">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white border-2 border-black p-2 rounded-lg text-lg shadow-md w-full mt-3 md:mt-0">
            Historial de Socio
          </button>
        </Link>
        <Link to="/reportes">
          <button className="bg-green-500 hover:bg-green-700 text-white border-2 border-black p-2 rounded-lg text-lg shadow-md w-full mt-3 md:mt-0">
            Reportes
          </button>
        </Link>
        {modalIsOpen && <EnviosFuturos isOpen={modalIsOpen} closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default Home;
