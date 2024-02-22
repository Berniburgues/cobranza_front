import { React, useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import EnviosFuturos from '../components/Reportes/EnviosFuturos';
import { fetchInfoHome } from '../services/obtenerData';
import Tarjetas from '../components/Home/Tarjetas';

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
  const referencia = useRef();

  const handlePrint = useReactToPrint({
    content: () => referencia.current,
    documentTitle: `Tarjetas Inicio, ${fechaActual}`,
  });

  useEffect(() => {
    const obtenerFechaActual = () => {
      const fecha = format(new Date(), 'dd/MM/yyyy, HH:mm', {
        timeZone: 'America/Argentina/Buenos_Aires',
      });
      setFechaActual(fecha);
    };

    // Llamada inicial para establecer la fecha con el formato deseado
    obtenerFechaActual();

    // Configura el intervalo para actualizar la fecha cada minuto
    const intervalo = setInterval(obtenerFechaActual, 60000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, []);

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
      <div ref={referencia} className="flex flex-col justify-center items-center ">
        <Tarjetas infoHome={infoHome} />
        <p className=" md:text-base text-xs p-1 mt-2 border-2 border-black rounded-md w-[25%] font-bold italic text-center bg-white text-black">
          {fechaActual}
        </p>
      </div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white border-2 border-black h-auto  rounded-lg text-sm shadow-md w-1/12 my-2"
        onClick={handlePrint}
      >
        PDF
      </button>
      {modalIsOpen && (
        <EnviosFuturos isOpen={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
      )}
    </section>
  );
};

export default Home;
