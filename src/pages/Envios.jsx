import React, { useState, useEffect } from 'react';
import {
  obtenerEnvios,
  obtenerArchivos,
  obtenerContenidoTXT,
} from '../services/obtenerData';
import { getNombrePeriodo } from '../utils/fechas';

const FormularioEnvios = () => {
  const [periodos, setPeriodos] = useState([]);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
  const [envios, setEnvios] = useState([]);
  const [envioIdSeleccionado, setEnvioIdSeleccionado] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState('');
  const [contenidoArchivo, setContenidoArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cargandoArchivo, setCargandoArchivo] = useState(false);

  useEffect(() => {
    const fetchEnvios = async () => {
      try {
        const enviosData = await obtenerEnvios();
        const periodosUnicos = [
          ...new Set(enviosData.map((envio) => envio.EnviosPeriodoCobro)),
        ];
        setPeriodos(periodosUnicos);
        setEnvios(enviosData);
      } catch (error) {
        console.error('Error al obtener los envíos:', error);
      }
    };
    fetchEnvios();
  }, []);

  const handlePeriodoSeleccionado = (periodo) => {
    setPeriodoSeleccionado(periodo);
    setEnvioIdSeleccionado('');
    setArchivos([]);
    setArchivoSeleccionado('');
    setContenidoArchivo(null);
  };

  const handleEnvioSeleccionado = async (envioId) => {
    setEnvioIdSeleccionado(envioId);
    setArchivoSeleccionado('');
    setContenidoArchivo(null);
    setCargando(true);
    try {
      const archivosData = await obtenerArchivos(envioId);
      setArchivos(archivosData);
    } catch (error) {
      console.error('Error al obtener los archivos:', error);
    }
    setCargando(false);
  };

  const handleArchivoSeleccionado = async (archivo) => {
    setArchivoSeleccionado(archivo);
    setCargandoArchivo(true);
    try {
      const txtData = await obtenerContenidoTXT(envioIdSeleccionado, archivo);
      const contenidoTXT = txtData.map((linea) => linea.TXT).join('\n');
      setContenidoArchivo(contenidoTXT);
    } catch (error) {
      console.error('Error al obtener el contenido del archivo:', error);
    }
    setCargandoArchivo(false);
  };

  const descargarArchivo = () => {
    if (!contenidoArchivo) return;

    const blob = new Blob([contenidoArchivo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${archivoSeleccionado}`;
    link.click();
  };

  const reiniciarConsulta = () => {
    setPeriodoSeleccionado('');
    setEnvioIdSeleccionado('');
    setArchivos([]);
    setArchivoSeleccionado('');
    setContenidoArchivo(null);
  };

  const limpiarPeriodoSeleccionado = () => {
    setPeriodoSeleccionado('');
  };

  const limpiarEnvioSeleccionado = () => {
    setEnvioIdSeleccionado('');
    setArchivos([]);
    setArchivoSeleccionado('');
    setContenidoArchivo(null);
  };

  const limpiarArchivoSeleccionado = () => {
    setArchivoSeleccionado('');
    setContenidoArchivo(null);
  };

  return (
    <div className="max-w-xl mx-auto p-5 my-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        FORMULARIO DE ENVÍOS
      </h2>

      <div className="mb-2">
        <label
          htmlFor="periodos"
          className="block text-md font-medium text-gray-700 mb-1"
        >
          Selecciona el Periodo:
        </label>
        <div className="flex space-x-4">
          <select
            id="periodos"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={periodoSeleccionado}
            onChange={(e) => handlePeriodoSeleccionado(e.target.value)}
          >
            <option value="">Seleccionar</option>
            {periodos.map((periodo, index) => (
              <option key={index} value={periodo}>
                {getNombrePeriodo(periodo)}
              </option>
            ))}
          </select>
          {periodoSeleccionado && (
            <button
              className={`bg-red-600 text-white p-2 rounded-md shadow hover:bg-red-700 ${
                cargando || cargandoArchivo ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={limpiarPeriodoSeleccionado}
              disabled={cargando || cargandoArchivo}
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {periodoSeleccionado && (
        <div className="mb-2 mt-4">
          <label
            htmlFor="envios"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Selecciona el Envío:
          </label>
          <div className="flex space-x-4">
            <select
              id="envios"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={envioIdSeleccionado}
              onChange={(e) => handleEnvioSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar</option>
              {envios
                .filter((envio) => envio.EnviosPeriodoCobro === periodoSeleccionado)
                .map((envio) => (
                  <option key={envio.EnviosId} value={envio.EnviosId}>
                    {envio.TenviosDescri}
                  </option>
                ))}
            </select>
            {envioIdSeleccionado && (
              <button
                className={`bg-red-600 text-white p-2 rounded-md shadow hover:bg-red-700 ${
                  cargando || cargandoArchivo ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={limpiarEnvioSeleccionado}
                disabled={cargando || cargandoArchivo}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}

      {cargando && <p className="text-center text-indigo-600">Cargando archivos..</p>}

      {archivos.length > 0 && (
        <div className="mb-2 mt-5">
          <label
            htmlFor="archivos"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Selecciona el Archivo:
          </label>
          <div className="flex space-x-4">
            <select
              id="archivos"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={archivoSeleccionado}
              onChange={(e) => handleArchivoSeleccionado(e.target.value)}
            >
              <option value="">Seleccionar</option>
              {archivos.map((archivo) => (
                <option key={archivo.ARCHIVO} value={archivo.ARCHIVO}>
                  {archivo.ARCHIVO}
                </option>
              ))}
            </select>
            {archivoSeleccionado && (
              <button
                className={`bg-red-600 text-white p-2 rounded-md shadow hover:bg-red-700 ${
                  cargando || cargandoArchivo ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={limpiarArchivoSeleccionado}
                disabled={cargando || cargandoArchivo}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}

      {cargandoArchivo && <p className="text-center text-indigo-600">Cargando TXT..</p>}

      {contenidoArchivo && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className={`bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 ${
              cargando || cargandoArchivo ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={descargarArchivo}
            disabled={cargando || cargandoArchivo}
          >
            Descargar TXT
          </button>

          <button
            className={`bg-gray-600 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 ${
              cargando || cargandoArchivo ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={reiniciarConsulta}
            disabled={cargando || cargandoArchivo}
          >
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
};

export default FormularioEnvios;
