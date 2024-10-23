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
  const [cargando, setCargando] = useState(false);
  const [cargandoPeriodos, setCargandoPeriodos] = useState(true);
  const [archivoEnDescarga, setArchivoEnDescarga] = useState(null); // Estado para archivo en descarga

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
      } finally {
        setCargandoPeriodos(false);
      }
    };
    fetchEnvios();
  }, []);

  const handlePeriodoSeleccionado = (periodo) => {
    setPeriodoSeleccionado(periodo);
    setEnvioIdSeleccionado('');
    setArchivos([]);
  };

  const handleEnvioSeleccionado = async (envioId) => {
    setEnvioIdSeleccionado(envioId);
    setCargando(true); // Iniciar cargando
    setArchivos([]); // Limpiar archivos al seleccionar un nuevo envío

    try {
      const archivosData = await obtenerArchivos(envioId);
      setArchivos(archivosData);
    } catch (error) {
      console.error('Error al obtener los archivos:', error);
    }
    setCargando(false); // Finalizar cargando
  };

  const descargarArchivo = async (archivo) => {
    setArchivoEnDescarga(archivo); // Marcar el archivo como en descarga
    try {
      const txtData = await obtenerContenidoTXT(envioIdSeleccionado, archivo);
      const contenidoTXT = txtData.map((linea) => linea.TXT).join('\n');
      const blob = new Blob([contenidoTXT], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = archivo; // Usar el nombre del archivo como descarga
      link.click();
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
    setArchivoEnDescarga(null); // Reiniciar el estado después de la descarga
  };

  const limpiarPeriodoSeleccionado = () => {
    setPeriodoSeleccionado('');
  };

  const limpiarEnvioSeleccionado = () => {
    setEnvioIdSeleccionado('');
    setArchivos([]);
  };

  return (
    <div className="max-w-xl mx-auto p-5 my-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        FORMULARIO DE ENVÍOS
      </h2>

      {cargandoPeriodos ? (
        <p className="text-center text-xl italic font-semibold text-indigo-600">
          Cargando...
        </p>
      ) : (
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
                  cargando ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={limpiarPeriodoSeleccionado}
                disabled={cargando}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}

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
                  cargando ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={limpiarEnvioSeleccionado}
                disabled={cargando}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}

      {cargando && (
        <p className="text-center font-semibold italic text-indigo-600">
          Cargando Archivos...
        </p>
      )}

      {archivos.length > 0 && (
        <div className="mb-2 mt-5">
          <h3 className="block text-md font-medium text-gray-700 mb-1">
            Archivos disponibles:
          </h3>
          <div className="overflow-y-auto max-h-80">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1 text-sm text-gray-600">
                    Orden
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-sm text-gray-600">
                    Archivo
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-sm text-gray-600">
                    Registros
                  </th>
                  <th className="border border-gray-300 px-2 py-1 text-sm text-gray-600">
                    Importe
                  </th>
                </tr>
              </thead>
              <tbody>
                {archivos.map((archivo, index) => (
                  <tr key={archivo.ARCHIVO}>
                    <td className="border border-gray-300 px-2 py-1 text-sm text-center">
                      {index + 1}
                    </td>
                    <td
                      className="border border-gray-300 px-2 py-1 text-sm text-center"
                      title="Descargar TXT"
                    >
                      {archivoEnDescarga === archivo.ARCHIVO ? (
                        <span className="italic text-blue-500">Descargando...</span>
                      ) : (
                        <span
                          className={`${
                            archivoEnDescarga
                              ? 'text-gray-500 cursor-not-allowed'
                              : 'cursor-pointer text-blue-500 hover:underline'
                          }`}
                          onClick={() => {
                            if (!archivoEnDescarga) {
                              descargarArchivo(archivo.ARCHIVO);
                            }
                          }}
                        >
                          {archivo.ARCHIVO}
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm text-center">
                      {archivo.Registros}
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-sm text-center">
                      {new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(archivo.Importe)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioEnvios;
