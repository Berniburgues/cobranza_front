import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnviosFuturos from '../components/Reportes/EnviosFuturos';
import { fetchInfoHome } from '../services/obtenerData';
import Tarjetas from '../components/Home/Tarjetas';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infoHome, setInfoHome] = useState({
    SociosActivos: '',
    SociosSupervielle: '',
    SociosOtrosBancos: '',
    SociosTarjeta: '',
    Adherentes: '',
    Servicios: '',
  });

  useEffect(() => {
    const fetchDataInfoHome = async () => {
      try {
        const data = await fetchInfoHome();
        setInfoHome({
          SociosActivos: data.SociosActivos,
          SociosSupervielle: data.SociosSupervielle,
          SociosOtrosBancos: data.SociosOtrosBancos,
          SociosTarjeta: data.SociosTarjeta,
          Adherentes: data.Adherentes,
          Servicios: data.Servicios,
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchDataInfoHome();
  }, []);

  return (
    <section
      className="flex flex-col justify-center items-center"
      style={{ height: '75vh' }}
    >
      <h1 className="text-xl md:text-2xl lg:text-4xl  font-bold font-libre mb-4 text-center italic underline">
        ATSAPRA
        <p className="text-base md:text-xl lg:text-3xl">SISTEMA DE CONTROL Y COBRANZA</p>
      </h1>
      <div className="grid grid-cols-1 items-center justify-center text-lg md:text-2xl md:grid-cols-2 gap-5 lg:w-full max-w-xl font-libre">
        <Link to="/tablas">
          <button className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black p-2 rounded-lg shadow-md w-full">
            TABLAS
          </button>
        </Link>
        <Link to="/reportes">
          <button className="bg-green-500 hover:bg-green-700 text-white border-2 border-black p-2 rounded-lg shadow-md w-full mt-3 md:mt-0">
            REPORTES
          </button>
        </Link>
      </div>
      <Tarjetas infoHome={infoHome} />
      {modalIsOpen && (
        <EnviosFuturos isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
      )}
    </section>
  );
};

export default Home;
