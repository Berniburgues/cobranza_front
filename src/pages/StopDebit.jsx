import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { stopDebit, filtroPeriodos } from '../services/obtenerData';
import { getNombrePeriodo } from '../utils/fechas';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';

const StopDebit = () => {
  const [data, setData] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [periodos, setPeriodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPeriodos = async () => {
      try {
        const getPeriodos = await filtroPeriodos();
        setPeriodos(getPeriodos);
      } catch (error) {
        console.error(error);
      }
    };
    getPeriodos();
  }, []);

  const handlePeriodoChange = (e) => {
    setSelectedPeriodo(e.target.value);
  };

  const handleSearchClick = async () => {
    setLoading(true);
    try {
      const data = await stopDebit(selectedPeriodo);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setData([]);
    setSelectedPeriodo('');
  };

  return (
    <div className="mx-auto max-w-full">
      <h2 className="text-xl text-center font-bold underline">SOCIOS CON STOP-DEBIT</h2>
      <div className="my-2 flex items-center justify-center">
        <label htmlFor="periodo" className="mr-2 italic">
          Período:
        </label>
        <select
          id="periodo"
          value={selectedPeriodo}
          onChange={handlePeriodoChange}
          className="border border-gray-300 rounded px-4"
        >
          <option value="">--Selecciona--</option>
          {periodos.map((periodo, index) => (
            <option value={periodo} key={index}>
              {getNombrePeriodo(periodo)}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearchClick}
          className={`ml-2 bg-blue-500 text-white px-4 rounded hover:bg-blue-600 ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? 'Cargando..' : 'Buscar'}
        </button>
        <button
          onClick={handleReset}
          className={`ml-2 bg-yellow-500 text-white px-4 rounded hover:bg-yellow-600 ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {loading ? 'Cargando..' : 'Nueva Búsqueda'}
        </button>
      </div>
      <table className="border-collapse w-full table-auto text-sm text-center">
        <thead>
          <tr>
            <th className="border border-gray-800 p-1 text-white bg-black sticky top-0 z-50">
              SOCIO
            </th>
            <th className="border border-gray-800 p-1 text-white bg-black sticky top-0 z-50">
              NOMBRE
            </th>
            <th className="border border-gray-800 p-1 text-white bg-black sticky top-0 z-50">
              DNI
            </th>
            <th className="border border-gray-800 p-1 text-white bg-black sticky top-0 z-50">
              BANCO
            </th>
            <th className="border border-gray-800 p-1 text-white bg-black sticky top-0 z-50">
              TEL 1
            </th>
            <th className="border border-gray-800 p-1 text-white bg-black sticky top-0 z-50">
              TEL 2
            </th>
            <th className="border border-gray-800 p-1 text-white bg-black sticky top-0 z-50">
              MAIL
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 hover:text-white hover:bg-black">
                <Link
                  to={`/tablas/historialSocios?DNI=${item.Documento}`}
                  target="_blank"
                  className="block w-auto h-full text-center "
                  title="Buscar Historial"
                >
                  {item.NroSocio}
                </Link>
              </td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">
                {item.Nombre} {item.Apellido}
              </td>
              <td className="border border-gray-300 p-2 hover:text-white hover:bg-black">
                <Link
                  to={`/tablas/historialSocios?DNI=${item.Documento}`}
                  target="_blank"
                  className="block w-auto h-full text-center "
                  title="Buscar Historial"
                >
                  {item.Documento}
                </Link>
              </td>
              <td className="border border-gray-300 p-2 whitespace-nowrap">
                {determinarBancoPorCBU(item.CBU)}
              </td>
              <td className="border border-gray-300 p-2 font-semibold italic">
                {item.Telefono}
              </td>
              <td className="border border-gray-300 p-2 font-semibold italic">
                {item.Telefono2}
              </td>
              <td className="border border-gray-300 p-2 font-semibold italic">
                {item.Email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StopDebit;
