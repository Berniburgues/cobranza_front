import React, { useEffect, useState } from 'react';
import {
  insertarReporte,
  actualizarReporte,
  eliminarReporte,
} from '../../services/obtenerData';

const EditorReportes = ({ reportes, onClose, onInformesChange }) => {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [tipo, setTipo] = useState('directo');
  const [esParcial, setEsParcial] = useState(false);
  const [editando, setEditando] = useState(false);
  const [error, setError] = useState(''); // Manejo de errores
  const [loading, setLoading] = useState(false); // Estado de carga
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  useEffect(() => {
    if (reporteSeleccionado) {
      setTitulo(reporteSeleccionado.title);
      setUrl(reporteSeleccionado.url);
      setTipo(reporteSeleccionado.tipo);
      setEsParcial(reporteSeleccionado.parcial);
      setEditando(true);
    } else {
      resetForm();
    }
  }, [reporteSeleccionado]);

  const resetForm = () => {
    setTitulo('');
    setUrl('');
    setTipo('directo');
    setEsParcial(false);
    setEditando(false);
    setError(''); // Reseteo de error
  };

  const handleSave = async () => {
    if (!titulo || !url) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const nuevoReporte = { title: titulo, url, tipo, parcial: esParcial ? 1 : 0 };
    setLoading(true); // Inicio de carga

    try {
      if (editando && reporteSeleccionado) {
        await actualizarReporte(reporteSeleccionado.id, nuevoReporte);
        onInformesChange((prevInformes) =>
          prevInformes.map((informe) =>
            informe.id === reporteSeleccionado.id
              ? { ...informe, ...nuevoReporte }
              : informe,
          ),
        );
      } else {
        const insertado = await insertarReporte(nuevoReporte);
        onInformesChange((prevInformes) => [...prevInformes, insertado]);
      }
      handleClose();
    } catch (error) {
      setError('Error al guardar el reporte. Intenta nuevamente.'); // Mensaje de error
    } finally {
      setLoading(false); // Final de carga
    }
  };

  const handleClose = () => {
    setReporteSeleccionado(null);
    resetForm();
    onClose();
  };

  const handleDelete = async (informe) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar el reporte "${informe.title}"?`, // Usar el title del informe directamente
      )
    ) {
      try {
        await eliminarReporte(informe.id); // Usar el id del informe
        onInformesChange((prevInformes) =>
          prevInformes.filter((item) => item.id !== informe.id),
        );
        handleClose();
      } catch (error) {
        setError('Error al eliminar el reporte. Intenta nuevamente.'); // Manejo de error
      }
    }
  };

  const handleSelectReporte = (informe) => {
    setReporteSeleccionado(informe); // Establece el reporte seleccionado
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-xl shadow-black w-96 max-h-[100vh] overflow-auto">
        {' '}
        {/* Ajusta la altura máxima aquí */}
        <h2 className="text-base italic text-center font-bold mb-2">
          EDITOR DE REPORTES
        </h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}{' '}
        {/* Mensaje de error */}
        <div className="mb-1">
          <label className="block italic font-semibold text-sm mb-1">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-1 rounded-md w-full"
          />
        </div>
        <div className="mb-1">
          <label className="block italic font-semibold text-sm mb-1">URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border p-1 rounded-md w-full"
          />
        </div>
        <div className="mb-1">
          <label className="block italic font-semibold text-sm mb-1">Tipo:</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border p-1 rounded-md w-full"
          >
            <option value="directo">Directo</option>
            <option value="indirecto">Indirecto</option>
            <option value="general">General</option>
          </select>
        </div>
        <div className="my-2 flex items-center">
          <input
            type="checkbox"
            checked={esParcial}
            onChange={() => setEsParcial(!esParcial)}
            className="mr-2 w-4 h-4"
          />
          <label className="italic font-semibold text-sm">¿Es un reporte parcial?</label>
        </div>
        <h3 className="text-sm text-center italic underline font-semibold mb-1">
          Reportes:
        </h3>
        <ul className="mb-2 max-h-48 overflow-y-auto">
          {' '}
          {/* Aquí se aplica el scroll vertical */}
          {reportes.map((informe) => (
            <li
              key={informe.id}
              className="flex justify-between text-sm lowercase items-center mb-1"
            >
              <button
                onClick={() => handleSelectReporte(informe)} // Selección de reporte
                className="text-blue-500 hover:underline"
              >
                {informe.title}
              </button>
              <div>
                <button
                  onClick={() => handleSelectReporte(informe)} // Seleccionar el informe para editar
                  className="p-1 bg-yellow-100 rounded-lg hover:bg-yellow-200 mr-2"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(informe)} // Pasar el objeto informe completo
                  className="p-1 bg-red-100 rounded-lg hover:bg-red-200"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-5">
          <button
            onClick={handleSave}
            className={`bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md mr-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
            title={editando ? 'Guardar Cambios' : 'Crear'}
          >
            {editando
              ? loading
                ? 'Guardando...'
                : '💾'
              : loading
              ? 'Agregando...'
              : '➕'}
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded-md"
            title="Cancelar"
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorReportes;
