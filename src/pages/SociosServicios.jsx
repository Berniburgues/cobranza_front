import React, { useState } from 'react';
import { getSociosYServicios } from '../services/obtenerData';
import { numerosDeBanco } from '../utils/bancos';
import { serviciosMap } from '../utils/nombreServicios';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCBU';
import ExcelSociosYServicios from '../components/Socios y Servicios/ExcelSociosYServicios';
import { Link } from 'react-router-dom';
import './TablaPagos.css';

const SociosServicios = () => {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [banco, setBanco] = useState('');
  const [ExB, setExB] = useState('');
  const [titular, setTitular] = useState('');
  const itemsPerPage = 5000;

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getSociosYServicios(banco, ExB, titular);
      setSocios(data);
      setLoading(false);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const serviciosColumns =
    socios.length > 0
      ? Object.keys(socios[0]).filter(
          (key) =>
            key !== 'SOCIO' &&
            key !== 'NOMBRE' &&
            key !== 'DOCUMENTO' &&
            key !== 'ESADHERENTE' &&
            key !== 'BANCO' &&
            key !== 'ENVIOBCO',
        )
      : [];

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReset = async () => {
    setSocios([]);
    setBanco('');
    setExB('');
    setTitular('');
    setLoading(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = socios.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(socios.length / itemsPerPage);

  return (
    <div className="container mx-auto">
      <h1 className="font-bold  text-gray-900 text-2xl text-center underline">
        SOCIOS Y SERVICIOS
      </h1>
      <div className="flex justify-center items-center mb-1 space-x-4">
        <div className="flex flex-col items-center">
          <label htmlFor="Banco" className="italic text-base">
            Banco
          </label>
          <select
            name="Banco"
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
            className="p-1 border rounded-md"
          >
            <option value="">--Todos--</option>
            {numerosDeBanco.map((banco, index) => (
              <option key={index} value={banco}>
                {determinarBancoPorCBU(banco)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="ExB" className="italic text-base">
            Banco Envío
          </label>
          <select
            name="ExB"
            value={ExB}
            onChange={(e) => setExB(e.target.value)}
            className="p-1 border rounded-md"
          >
            <option value="">--Todos--</option>
            <option value="027">Supervielle</option>
            <option value="TAR">First Data</option>
          </select>
        </div>

        <div className="flex flex-col items-center">
          <label htmlFor="Titularidad" className="italic text-base">
            Titularidad
          </label>
          <select
            name="Titularidad"
            value={titular}
            onChange={(e) => setTitular(e.target.value)}
            className="p-1 border rounded-md"
          >
            <option value="">--Todos--</option>
            <option value="Titular">Titular</option>
            <option value="Adherente">Adherente</option>
          </select>
        </div>

        <button
          onClick={fetchData}
          className="bg-orange-500 text-white  hover:bg-orange-600 focus:outline-none mt-5 px-4 border border-black rounded-md"
        >
          Buscar
        </button>

        <button
          onClick={handleReset}
          className="bg-yellow-500 text-white hover:bg-yellow-600 max-h-[25px] text-ellipsis focus:outline-none mt-5 px-4 border border-black rounded-md"
        >
          Nueva Consulta
        </button>

        <ExcelSociosYServicios
          banco={banco}
          ExB={ExB}
          titular={titular}
          socios={socios}
          serviciosColumns={serviciosColumns}
          loading={loading}
        />
      </div>

      {loading && (
        <div className="text-center font-bold text-lg boton_parpadeo">Cargando...</div>
      )}

      {error && (
        <div className="text-center font-bold text-lg text-red-500">Error: {error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto overflow-y-auto max-h-[475px] border border-gray-200 rounded">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-black text-white sticky top-0 z-50">
                <tr className="">
                  <th className="p-1 sticky top-0 z-50 border border-white">N°S</th>
                  <th className="p-1 sticky top-0 z-50 border border-white">
                    Nombre Completo
                  </th>
                  <th className="p-1 sticky top-0 z-50 border border-white">DNI</th>
                  <th className="p-1 sticky top-0 z-50 border border-white">Titular</th>
                  <th className="p-1 sticky top-0 z-50 border border-white">Banco</th>
                  <th
                    className="p-1 sticky top-0 z-50 border border-white"
                    title="Enviado Por"
                  >
                    ExB
                  </th>
                  {serviciosColumns.map((servicio, index) => {
                    const nombreServicio = serviciosMap[servicio] || 'Nombre desconocido';
                    return (
                      <th
                        key={index}
                        className="p-1 sticky top-0 z-50 border border-white"
                        title={nombreServicio}
                      >
                        <Link to={`/servicios/beneficiosServicios`} target="_blank">
                          {servicio}
                        </Link>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((socio, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-1 border border-black">{socio.SOCIO}</td>
                    <td className="p-1 border border-black uppercase">{socio.NOMBRE}</td>
                    <td className="p-1 border border-black hover:bg-black hover:text-white">
                      <Link
                        to={`/tablas/historialSocios?DNI=${socio.DOCUMENTO}`}
                        target="_blank"
                        className="block w-full h-full text-center"
                        title="Buscar Historial"
                      >
                        {socio.DOCUMENTO}
                      </Link>
                    </td>
                    <td
                      className={`p-1 border border-black text-base ${
                        socio.ESADHERENTE === 0 ? 'bg-green-100' : 'bg-red-100'
                      }`}
                    >
                      {socio.ESADHERENTE === 0 ? '✅' : '❌'}
                    </td>
                    <td
                      className={`p-1 border border-black font-semibold ${
                        socio.BANCO === '027'
                          ? 'bg-white'
                          : socio.BANCO === '004' ||
                            socio.BANCO === '002' ||
                            socio.BANCO === '005' ||
                            socio.BANCO === '003' ||
                            socio.BANCO === '006'
                          ? 'bg-violet-500'
                          : 'bg-blue-500'
                      }`}
                      title={socio.BANCO}
                    >
                      {determinarBancoPorCBU(socio.BANCO)}
                    </td>
                    <td
                      className={`p-1 border border-black font-semibold ${
                        socio.ENVIOBCO === '027' ? 'bg-white' : 'bg-violet-500'
                      }`}
                      title={socio.ENVIOBCO}
                    >
                      {determinarBancoPorCBU(socio.ENVIOBCO)}
                    </td>
                    {serviciosColumns.map((servicio, index) => (
                      <td
                        key={index}
                        className={`p-1 text-base border border-black ${
                          socio[servicio] === 1 ? 'bg-green-200' : 'bg-red-200'
                        } text-center`}
                      >
                        {socio[servicio] === 1 ? '✅' : '❌'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`mx-1 px-2 py-1 text-sm rounded hover:bg-black hover:text-white ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SociosServicios;
