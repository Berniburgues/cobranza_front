import React, { useState, useEffect } from 'react';
import { fetchCargaNovedades } from '../services/obtenerData';
import { getNombrePeriodo } from '../utils/fechas';

const Archivos = () => {
  const [combo, setCombo] = useState([]);
  const [reenvioTildado, setReenvioTildado] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState({
    aplEnviosID: '',
    aplFecCarga: '',
    aplFecProceso: null,
    aplFecAplicado: null,
    aplDirectorio: '',
    aplArchivo: '',
    aplEstado: 0,
    aplNumeracion: '',
    aplFecReenvio: '',
  });

  useEffect(() => {
    const fetchDataCombo = async () => {
      try {
        const data = await fetchCargaNovedades();
        setCombo(data || []);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchDataCombo();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const mostrarFecha =
    reenvioTildado &&
    selectedOption &&
    combo.some(
      (item) => item.Bajada.includes('Supervielle') && selectedOption === item.Bajada,
    );

  const mostrarTramos =
    reenvioTildado &&
    selectedOption &&
    combo.some(
      (item) => item.Bajada.includes('First Data') && selectedOption === item.Bajada,
    );

  const handleCheckboxChange = (e) => {
    setReenvioTildado(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos si es necesario
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Carga de Archivos</h2>
      <div className="mb-4">
        <label
          htmlFor="ComboNovedades"
          className="block text-sm font-medium text-gray-600"
        >
          Seleccionar Modalidad
        </label>
        <select
          name="ComboNovedades"
          id="ComboNovedades"
          className="border p-2 rounded w-full"
          onChange={handleSelectChange}
        >
          <option value=""> -- Seleccionar Modalidad --</option>
          {combo.map((item) => (
            <option key={item.ID} value={item.Bajada}>
              {getNombrePeriodo(item.Periodo)} - {item.Bajada}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="fileInput" className="block text-sm font-medium text-gray-600">
          Archivo
        </label>
        <input
          type="file"
          id="fileInput"
          className="border p-2 rounded w-full"
          disabled={!selectedOption}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          <input
            type="checkbox"
            className="mr-2"
            onChange={handleCheckboxChange}
            checked={reenvioTildado}
            disabled={!selectedOption}
          />
          Reenvio
        </label>
      </div>
      {mostrarFecha && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Fecha de Reenvío
          </label>
          <input type="date" className="border p-2 rounded w-full" />
        </div>
      )}
      {mostrarTramos && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Tramos</label>
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((tramo) => (
              <label key={tramo} className="block">
                <input type="radio" name="tramo" value={tramo} />
                {tramo}
              </label>
            ))}
          </div>
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        disabled={!selectedOption}
      >
        Enviar
      </button>
    </form>
  );
};

export default Archivos;
