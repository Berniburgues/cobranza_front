import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { stopDebit, filtroPeriodos } from '../services/obtenerData';
import { getNombrePeriodo } from '../utils/fechas';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { numerosDeBanco } from '../utils/bancos';
import ExcelStopDebit from '../components/Stop Debit/ExcelStopDebit';

const StopDebit = () => {
  const [data, setData] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedBanco, setSelectedBanco] = useState('');
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

  const handleBancoChange = (e) => {
    setSelectedBanco(e.target.value);
  };

  const handleSearchClick = async () => {
    setLoading(true);
    try {
      const data = await stopDebit(selectedPeriodo, selectedBanco);
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
    setSelectedBanco('');
  };

  return (
    <div className="mx-auto max-w-full">
      <h2 className="text-xl text-center font-bold underline">SOCIOS CON STOP-DEBIT</h2>
      <div className="my-2 flex items-center justify-center gap-3">
        <div className="flex flex-col text-center">
          <label htmlFor="periodo" className="italic">
            Período:
          </label>
          <select
            id="periodo"
            value={selectedPeriodo}
            onChange={handlePeriodoChange}
            className="border border-gray-300 rounded px-4"
          >
            <option disabled value="">
              --Seleccionar--
            </option>
            {periodos.map((periodo, index) => (
              <option value={periodo} key={index}>
                {getNombrePeriodo(periodo)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col text-center">
          <label htmlFor="banco" className="italic">
            Banco:
          </label>
          <select
            id="banco"
            value={selectedBanco}
            onChange={handleBancoChange}
            className="border border-gray-300 rounded px-4"
          >
            <option value="">--Todos--</option>
            {numerosDeBanco.map((banco, index) => (
              <option value={banco} key={index}>
                {determinarBancoPorCBU(banco)}
              </option>
            ))}
          </select>
        </div>
        <div className="pt-6 space-x-2">
          <button
            onClick={handleSearchClick}
            className={`bg-blue-500 text-white px-4 rounded hover:bg-blue-600 ${
              loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
          >
            {loading ? 'Cargando..' : 'Buscar'}
          </button>
          <button
            onClick={handleReset}
            className={`bg-yellow-500 text-white px-4 rounded hover:bg-yellow-600 ${
              loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
          >
            {loading ? 'Cargando..' : 'Nueva Búsqueda'}
          </button>
          <ExcelStopDebit
            data={data}
            selectedBanco={selectedBanco}
            selectedPeriodo={selectedPeriodo}
            loading={loading}
          />
        </div>
      </div>
      {data.length > 0 && (
        <div>
          <h3 className="text-center font-bold italic text-sm pt-3">
            Socios Encontrados: {data.length}
          </h3>
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
              {data.map((socio, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 hover:text-white hover:bg-black">
                    <Link
                      to={`/tablas/historialSocios?DNI=${socio.Documento}`}
                      target="_blank"
                      className="block w-auto h-full text-center cursor-pointer"
                      title="Buscar Historial"
                    >
                      {socio.NroSocio}
                    </Link>
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">
                    {socio.Nombre} {socio.Apellido}
                  </td>
                  <td className="border border-gray-300 p-2 hover:text-white hover:bg-black">
                    <Link
                      to={`/tablas/historialSocios?DNI=${socio.Documento}`}
                      target="_blank"
                      className="block w-auto h-full text-center cursor-pointer"
                      title="Buscar Historial"
                    >
                      {socio.Documento}
                    </Link>
                  </td>
                  <td className="border border-gray-300 p-2 whitespace-nowrap">
                    {determinarBancoPorCBU(socio.CBU)}
                  </td>
                  <td className="border border-gray-300 p-2 font-semibold italic">
                    {socio.Telefono}
                  </td>
                  <td className="border border-gray-300 p-2 font-semibold italic">
                    {socio.Telefono2}
                  </td>
                  <td className="border border-gray-300 p-2 font-semibold italic">
                    {socio.Email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StopDebit;
