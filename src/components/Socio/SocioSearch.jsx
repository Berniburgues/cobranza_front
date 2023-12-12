// SocioSearch.js
import React, { useEffect, useState } from 'react';
import '../../pages/TablaPagos.css';

const SocioSearch = ({
  numerosSocio,
  handleNumerosSocioChange,
  handleBuscarClick,
  handleFileUpload,
  handleReset,
  isLoading,
  handleSelectFetch,
}) => {
  const [selectValue, setSelectValue] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado para el loader

  useEffect(() => {
    // Este efecto se ejecuta cuando cambia la prop numerosSocio
    setSelectValue(''); // Reinicia el valor del select
  }, [numerosSocio]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleSelectChange = async (value) => {
    try {
      setLoading(true); // Muestra el loader mientras se realiza la carga
      await handleSelectFetch(value);
    } catch (error) {
      console.error('Error al obtener los datos de filtrosSocio:', error);
    } finally {
      setLoading(false); // Oculta el loader después de la carga
    }
  };

  return (
    <div className="flex flex-col items-center mb-3">
      <h2 className="text-2xl font-semibold mb-2 text-center underline">
        Buscar Historial de Socio por DNI:
      </h2>
      <div className="flex flex-row items-center space-x-2">
        <div className="flex flex-col w-auto">
          <label htmlFor="dniInput" className="text-xs italic text-center pb-1">
            Ingresar el/los DNI manualmente:
          </label>
          <input
            id="dniInput"
            className="px-2 py-1 border-2 w-full text-sm border-black rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            value={numerosSocio}
            onChange={handleNumerosSocioChange}
            placeholder="Ingresar DNI"
          />
        </div>
        <div className="flex flex-col w-auto">
          <label
            htmlFor="fileInput"
            className="text-xs italic text-center pb-1 flex justify-center"
          >
            Seleccionar archivo (.txt, .csv, excel)
            <a
              href="https://drive.google.com/file/d/1WhDBhBnPKiWJsFN6ujiJALHc-raU2bgC/view?usp=sharing"
              className="italic text-blue-700 hover:text-blue-500 text-xs font-semibold pl-2"
              target="blank"
            >
              Ver Formato (pág. 2)
            </a>
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".txt, .csv, .xlsx, .xls"
            onChange={onFileChange}
            className="border-2 text-sm px-1 py-[1px] border-black rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col w-auto">
          <label htmlFor="selectInput" className="text-xs italic text-center pb-1">
            Opciones Predeterminadas:
          </label>
          <select
            id="selectInput"
            onChange={(e) => {
              setSelectValue(e.target.value);
              handleSelectChange(e.target.value);
            }}
            value={selectValue}
            className="border-2 text-sm px-2 py-1 border-black rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Seleccionar Opción
            </option>
            <option value="true">Últimos Aceptados</option>
            <option value="false">Últimos Rechazados</option>
          </select>
        </div>
      </div>
      {loading && (
        <p
          className={`text-center font-semibold text-sm pt-1 ${
            loading ? 'boton_parpadeo' : ''
          }`}
        >
          Cargando documentos...
        </p>
      )}
      <div className="flex flex-row items-center justify-center mt-2 gap-5">
        <button
          className={`w-24 rounded-md bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-center text-sm border-2 border-black${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleBuscarClick}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Buscar'}
        </button>
        <button
          className="w-auto rounded-md bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-center text-sm border-2 border-black"
          onClick={handleReset}
        >
          Nueva Consulta
        </button>
      </div>
    </div>
  );
};

export default SocioSearch;
