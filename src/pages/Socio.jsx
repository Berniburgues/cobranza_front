// Socio.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSociosData, uploadFile, fetchFiltroSocio } from '../services/obtenerData';
import Historial from '../components/Socio/Historial';
import SocioSearch from '../components/Socio/SocioSearch';
import Buscador from '../components/Socio/Buscador';

const Socio = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialNumerosSocio = searchParams.getAll('numerosSocio');
  const [numerosSocio, setNumerosSocio] = useState(initialNumerosSocio);
  const [datosFijos, setDatosFijos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [socioDestacado, setSocioDestacado] = useState(null);
  const [dni, setDNI] = useState('');
  const [buscadorVisible, setBuscadorVisible] = useState(false);

  //Mostrar u ocultar el botón de filtrador
  const toggleBuscador = () => {
    setBuscadorVisible(!buscadorVisible);
  };

  //Función que activa el scrolleo hacia el tope de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //Función que se activa cuando cambian los dnis en el input text del componente hijo SocioSearch
  const handleNumerosSocioChange = (event) => {
    const numeros = event.target.value.split(',').map((num) => num.trim());
    setNumerosSocio(numeros.length > 1 ? numeros : numeros[0]);
    setErrorMessage(null);
  };

  //Activa la búsqueda del botón Buscar del componente hijo SocioSearch
  const handleBuscarClick = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const sociosData = await fetchSociosData(numerosSocio);
      setDatosFijos(sociosData || {});
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      setDatosFijos(null);
      setErrorMessage('Error al cargar los datos en el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  //Función para cargar los archivos en el input File del componente hijo SocioSearch
  const handleFileUpload = async (file) => {
    setIsLoading(true);

    try {
      const dnis = await uploadFile(file);
      setNumerosSocio(dnis.documentos || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Resetear estados y limpiar la página
  const handleReset = () => {
    setNumerosSocio([]);
    setDatosFijos(null);
    setErrorMessage(null);
    setDNI('');
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  //Función para Buscar un DNI específico una vez que se renderizan las tarjetas
  const handleSearchByDNI = (dniInput) => {
    const foundSocioKey = Object.keys(datosFijos).find((socioKey) => {
      const socioDNI = datosFijos[socioKey]?.datosFijos?.documento || '';
      return socioDNI.includes(dniInput);
    });

    setSocioDestacado(foundSocioKey);

    if (foundSocioKey) {
      const socioCard = document.getElementById(`socio-card-${foundSocioKey}`);
      if (socioCard) {
        socioCard.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  //Función que llama los filtros de los select de opciones predeterminadas en SocioSearch
  const handleSelectFetch = async (value) => {
    try {
      const filtrosSocioData = await fetchFiltroSocio(value);
      updateNumerosSocio(filtrosSocioData);
    } catch (error) {
      console.error('Error al obtener los datos de filtrosSocio:', error);
    }
  };

  //Función que setea los dnis según el input text del componente SocioSearch
  const updateNumerosSocio = (documentos) => {
    setNumerosSocio(documentos);
  };

  return (
    <section className="relative flex flex-col items-center justify-center">
      <button
        onClick={() => scrollToTop()}
        className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        ▲
      </button>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        onClick={toggleBuscador}
      >
        🔍
      </button>
      <SocioSearch
        numerosSocio={Array.isArray(numerosSocio) ? numerosSocio.join(',') : numerosSocio}
        handleNumerosSocioChange={handleNumerosSocioChange}
        handleBuscarClick={handleBuscarClick}
        handleFileUpload={handleFileUpload}
        handleReset={handleReset}
        isLoading={isLoading}
        handleSelectFetch={handleSelectFetch}
      />
      {errorMessage && (
        <p className="text-red-500 text-center font-semibold">{errorMessage}</p>
      )}
      {datosFijos && (
        <section className="flex flex-col items-center justify-center space-y-4">
          {buscadorVisible && (
            <Buscador handleSearch={handleSearchByDNI} dni={dni} setDNI={setDNI} />
          )}
          {Object.keys(datosFijos).map((socioKey) => {
            const socio = datosFijos[socioKey];
            const destacado = socioKey === socioDestacado;

            return (
              <article
                key={socioKey}
                id={`socio-card-${socioKey}`}
                className={
                  destacado
                    ? 'shadow-md shadow-black border-[3px] border-dashed border-orange-500'
                    : ''
                }
              >
                {socio.cobranza && (
                  <Historial cobranza={socio.cobranza} datosFijos={socio.datosFijos} />
                )}
              </article>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default Socio;
