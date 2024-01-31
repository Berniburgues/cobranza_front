import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import EnviosFuturos from '../components/Reportes/EnviosFuturos';
import AnimatedCounter from '../components/Home/AnimatedCounter';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section
      className="flex flex-col justify-center items-center"
      style={{ height: '75vh' }}
    >
      <h1 className="text-[45px] font-bold font-libre mb-4 text-center italic underline">
        ATSAPRA
        <p className="font-base">SISTEMA DE CONTROL Y COBRANZA</p>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 w-full max-w-3xl font-libre">
        <Link to="/tablas">
          <button className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black p-2 rounded-lg text-3xl shadow-md w-full">
            TABLAS
          </button>
        </Link>
        <Link to="/reportes">
          <button className="bg-green-500 hover:bg-green-700 text-white border-2 border-black p-2 rounded-lg text-3xl shadow-md w-full mt-3 md:mt-0">
            REPORTES
          </button>
        </Link>
      </div>
      <section className="grid grid-cols-3 gap-5 mt-10 text-white">
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={132753} />
            RESPONSABLES ACTIVOS
          </div>
        </article>

        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-b from-slate-800 to-slate-700">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={217931} />
            SERVICIOS
          </div>
        </article>
        <article className="p-4 border-2 border-black rounded-md py-2 bg-gradient-to-l from-slate-800 to-slate-700">
          <div className="text-center flex flex-col">
            <AnimatedCounter value={29751} />
            ADHERENTES
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
