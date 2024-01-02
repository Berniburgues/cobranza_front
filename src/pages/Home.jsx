import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnviosFuturos from '../components/Reportes/EnviosFuturos';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // Abre el modal al principio

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Llamamos a openModal en el efecto, después de que el componente se haya montado
  useEffect(() => {
    const openModal = () => {
      setModalIsOpen(false);
    };

    openModal();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center" style={{ height: '92vh' }}>
      <h1 className="text-[45px] font-bold font-libre mb-4 text-center italic underline">
        ATSAPRA: Sistema de Control
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full max-w-3xl font-libre">
        <Link to="/tablas">
          <button className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black p-2 rounded-lg text-3xl shadow-md w-full">
            Tablas
          </button>
        </Link>
        <Link to="/reportes">
          <button className="bg-green-500 hover:bg-green-700 text-white border-2 border-black p-2 rounded-lg text-3xl shadow-md w-full mt-3 md:mt-0">
            Reportes
          </button>
        </Link>
        {modalIsOpen && <EnviosFuturos isOpen={modalIsOpen} closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default Home;
