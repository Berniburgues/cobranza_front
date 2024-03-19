import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import EnviosFuturos from '../components/Reportes/EnviosFuturos';
import { fetchInfoHome, insertDatosTarjeta } from '../services/obtenerData';
import Tarjetas from '../components/Home/Tarjetas';
import { RefreshIcon } from '@heroicons/react/solid';

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fechaActual, setFechaActual] = useState('');
  const [infoHome, setInfoHome] = useState({
    SociosActivos: '',
    SociosSupervielle: '',
    SociosOtrosBancos: '',
    SociosTarjeta: '',
    Adherentes: '',
    Servicios: '',
  });
  const [isFetching, setIsFetching] = useState(false);
  const referencia = useRef();

  const fetchDataInicial = async () => {
    try {
      const data = await fetchInfoHome();
      const nuevaFecha = format(new Date(), 'dd/MM/yyyy - HH:mm', {
        timeZone: 'America/Argentina/Buenos_Aires',
      });
      setFechaActual(nuevaFecha);

      setInfoHome(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    fetchDataInicial();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => referencia.current,
    documentTitle: `Tarjetas Inicio, ${fechaActual}`,
  });

  const handleClick = async () => {
    setIsFetching(true);
    await fetchDataInfoHome();
    setIsFetching(false);
  };

  const fetchDataInfoHome = async () => {
    try {
      const data = await fetchInfoHome();
      const nuevaFecha = format(new Date(), 'dd/MM/yyyy - HH:mm', {
        timeZone: 'America/Argentina/Buenos_Aires',
      });
      setFechaActual(nuevaFecha);

      await insertDatosTarjeta({ ...data, fechaActualizacion: nuevaFecha });

      setInfoHome(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  return (
    <section
      className="flex flex-col justify-center items-center"
      style={{ height: '75vh' }}
    >
      <h1 className="text-xl md:text-2xl lg:text-4xl  font-bold font-libre mb-2 text-center italic underline">
        ATSAPRA
        <p className="text-base md:text-xl lg:text-3xl">SISTEMA DE CONTROL Y COBRANZA</p>
      </h1>
      <div className="grid grid-cols-2 items-center justify-center text-lg md:text-2xl gap-3 lg:w-full max-w-xl font-libre">
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
      <div ref={referencia} className="flex flex-col justify-center items-center ">
        <Tarjetas infoHome={infoHome} />
        {fechaActual ? (
          <p className="md:text-base text-xs p-1 mt-2 border-2 border-black rounded-md w-[25%] font-bold italic text-center bg-white text-black">
            {fechaActual}
          </p>
        ) : null}
      </div>
      <div className="flex items-center justify-center mt-5 gap-5">
        <button
          className="bg-red-500 hover:bg-red-700 text-white border-2 px-2 border-black h-auto rounded-lg text-sm shadow-md"
          onClick={handlePrint}
        >
          PDF
        </button>
        <button
          className={`bg-green-500 hover:bg-green-700 text-white border-2 px-2 border-black h-auto rounded-full text-sm shadow-md flex items-center ${
            isFetching ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleClick}
          disabled={isFetching}
        >
          <RefreshIcon className="h-5 w-auto" />
        </button>
        <Link to="/tablaSocios" target="blank">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white border-2 px-2 border-black h-auto rounded-lg text-sm shadow-md">
            TABLA
          </button>
        </Link>
      </div>
      {modalIsOpen && (
        <EnviosFuturos isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
      )}
    </section>
  );
};

export default Home;
