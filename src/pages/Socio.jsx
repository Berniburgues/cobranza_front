import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSociosData } from '../services/obtenerData';
import Historial from '../components/Socio/Historial';
import SocioSearch from '../components/Socio/SocioSearch';

const Socio = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialNumerosSocio = searchParams.getAll('numerosSocio');

  const [numerosSocio, setNumerosSocio] = useState(initialNumerosSocio);
  const [datosFijos, setDatosFijos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNumerosSocioChange = (event) => {
    const numeros = event.target.value.split(',').map((num) => num.trim());
    setNumerosSocio(numeros.length > 1 ? numeros : numeros[0]);
    setErrorMessage(null);
  };

  const handleBuscarClick = async () => {
    if (numerosSocio.length > 0) {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const sociosData = await fetchSociosData(numerosSocio);
        if (sociosData) {
          setDatosFijos(sociosData);
          setErrorMessage(null);
        } else {
          setDatosFijos(sociosData);
          setErrorMessage(
            'No se encontraron datos para los números de socio proporcionados.',
          );
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setDatosFijos(null);
        setErrorMessage('Error al cargar los datos en el servidor.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (initialNumerosSocio.length > 0) {
      handleBuscarClick();
    }
  }, [initialNumerosSocio]);

  return (
    <section className="flex flex-col items-center justify-center">
      <SocioSearch
        numerosSocio={Array.isArray(numerosSocio) ? numerosSocio.join(',') : numerosSocio}
        handleNumerosSocioChange={handleNumerosSocioChange}
        handleBuscarClick={handleBuscarClick}
        isLoading={isLoading}
        initialNumerosSocio={initialNumerosSocio.join(',')}
      />
      {errorMessage && (
        <p className="text-red-500 text-center font-semibold">{errorMessage}</p>
      )}
      {datosFijos && (
        <section className="flex flex-col items-center justify-center space-y-4">
          {Object.keys(datosFijos).map((socioKey) => {
            const socio = datosFijos[socioKey];

            return (
              <div key={socioKey}>
                {socio.cobranza && (
                  <Historial cobranza={socio.cobranza} datosFijos={socio.datosFijos} />
                )}
              </div>
            );
          })}
        </section>
      )}
    </section>
  );
};

export default Socio;
