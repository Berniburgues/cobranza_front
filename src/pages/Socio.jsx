import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSocioData } from '../services/obtenerData';
import DatosFijos from '../components/Socio/DatosFijos';
import Historial from '../components/Socio/Historial';
import SocioSearch from '../components/Socio/SocioSearch';

const Socio = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialNumeroSocio = searchParams.get('numeroSocio') || '';

  const [numeroSocio, setNumeroSocio] = useState(initialNumeroSocio);
  const [datosFijos, setDatosFijos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNumeroSocioChange = (event) => {
    setNumeroSocio(event.target.value);
    setErrorMessage(null);
  };

  const handleBuscarClick = async () => {
    if (numeroSocio) {
      setIsLoading(true);
      setErrorMessage(null); // Limpiar cualquier mensaje de error anterior

      try {
        const socioData = await fetchSocioData(numeroSocio);
        if (socioData) {
          setDatosFijos(socioData);
        } else {
          setDatosFijos(null);
          setErrorMessage(
            'No se encontraron datos para el número de socio proporcionado.',
          );
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setDatosFijos(null);
        setErrorMessage('Error al cargar los datos en el servidor.');
      } finally {
        setIsLoading(false); // Siempre restablecer isLoading, independientemente del resultado
      }
    }
  };

  useEffect(() => {
    if (initialNumeroSocio) {
      handleBuscarClick();
    }
  }, [initialNumeroSocio]);

  return (
    <section className="flex flex-col items-center justify-center">
      <SocioSearch
        numeroSocio={numeroSocio}
        handleNumeroSocioChange={handleNumeroSocioChange}
        handleBuscarClick={handleBuscarClick}
        isLoading={isLoading}
        initialNumeroSocio={initialNumeroSocio}
      />
      {errorMessage && (
        <p className="text-red-500 text-center font-semibold">{errorMessage}</p>
      )}
      {datosFijos && (
        <section className="flex flex-col items-center justify-center space-y-4">
          <DatosFijos datosFijos={datosFijos} />
          {datosFijos.cobranza && <Historial datosFijos={datosFijos} />}
        </section>
      )}
    </section>
  );
};

export default Socio;
