import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnviosFuturos from '../components/Reportes/EnviosFuturos';
import AnimatedCounter from '../components/Home/AnimatedCounter';
import { fetchInfoHome } from '../services/obtenerData';

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
      <h1 className="text-xl md:text-2xl lg:text-5xl  font-bold font-libre mb-4 text-center italic underline">
        ATSAPRA
        <p className="font-base">SISTEMA DE CONTROL Y COBRANZA</p>
      </h1>
      <div className="grid grid-cols-1 items-center justify-center text-lg md:text-2xl md:grid-cols-2 gap-5 lg:w-full max-w-3xl font-libre">
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
      <section className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10 text-white md:text-base text-xs">
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-r from-red-800 to-red-500">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={infoHome.SociosSupervielle} />
            SOCIOS SUPERVIELLE
          </div>
        </article>
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-b from-blue-800 to-blue-500">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={infoHome.SociosOtrosBancos} />
            SOCIOS OTROS BANCOS
          </div>
        </article>
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-l from-violet-800 to-violet-500">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={infoHome.SociosTarjeta} />
            SOCIOS TARJETA
          </div>
        </article>
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-r from-slate-800 to-slate-500">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={infoHome.SociosActivos} />
            RESPONSABLES ACTIVOS
          </div>
        </article>
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-b from-slate-800 to-slate-500">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={infoHome.Adherentes} />
            SOCIOS ADHERENTES
          </div>
        </article>
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-l from-slate-800 to-slate-500">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={infoHome.Servicios} />
            SERVICIOS TOTALES
          </div>
        </article>
      </section>

      {modalIsOpen && (
        <EnviosFuturos isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
      )}
    </section>
  );
};

export default Home;
