import React, { useState, useEffect, useMemo } from 'react';
import { fetchDataPagos } from '../services/obtenerData';
import { formatFecha } from '../utils/fechas';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { descripcionCodigo } from '../utils/descripcionCodigos';

const TablaPagos = () => {
  const [periodo, setPeriodo] = useState('');
  const [cbu, setCbu] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const handlePeriodoChange = (e) => {
    setPeriodo(e.target.value);
  };

  const handleCbuChange = (e) => {
    setCbu(e.target.value);
  };

  const handleBuscarClick = async (newPage) => {
    try {
      setLoading(true);
      const pageSize = 2500;
      const response = await fetchDataPagos(periodo, cbu, newPage, pageSize);
      setData(response.data.data);
      setTotalCount(response.data.totalCount);
      setTotalPages(response.data.totalPages);
      setPage(response.data.page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBuscarClick(1);
  }, []);

  const fechasDeCobroUnicas = useMemo(() => {
    const uniqueFechas = new Set();
    data.forEach((socio) => {
      socio.Cobranzas.forEach((cobranza) => {
        uniqueFechas.add(cobranza.FechaCobro);
      });
    });
    return [...uniqueFechas].sort();
  }, [data]);

  return (
    <section className="w-full flex flex-col items-center justify-start">
      <h1 className="text-2xl font-bold mb-2">Tabla de Pagos</h1>
      <article className="mb-2 w-[30%] flex flex-grow justify-start items-center gap-5">
        <input
          type="text"
          placeholder="Período"
          value={periodo}
          onChange={handlePeriodoChange}
          className="border rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Banco"
          value={cbu}
          onChange={handleCbuChange}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={() => handleBuscarClick(1)}
          disabled={loading}
          className={`bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </article>
      {data.length > 0 && (
        <section className=" w-[95%] mt-1 overflow-x-auto h-screen">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead className="min-h-[0.5rem] max-h-2">
              <tr className="bg-black text-white">
                <th className="border-2 border-gray-800 min-w-[2.5rem] max-w-[2.5rem] bg-black whitespace-nowrap font-semibold md:font-bold sticky top-0">
                  Socio
                </th>
                <th className="border-2 border-gray-800 bg-black whitespace-nowrap font-semibold md:font-bold sticky top-0">
                  Nombre
                </th>
                <th className="border-2 border-gray-800 bg-black whitespace-nowrap font-semibold md:font-bold sticky top-0">
                  DNI
                </th>
                <th className="border-2 border-gray-800 bg-black whitespace-nowrap font-semibold md:font-bold sticky top-0">
                  CUIL
                </th>
                <th className="border-2 border-gray-800 bg-black whitespace-nowrap font-semibold md:font-bold sticky top-0">
                  CL
                </th>
                <th className="border-2 border-gray-800 bg-black whitespace-nowrap font-semibold md:font-bold sticky top-0">
                  CBU
                </th>
                <th className="border-2 border-gray-800 bg-black whitespace-nowrap font-semibold md:font-bold sticky top-0">
                  ExB
                </th>
                {fechasDeCobroUnicas.map((fecha) => (
                  <th
                    key={fecha}
                    className="border-2 p-[1px] min-w-[3rem] max-w-[3rem] border-gray-800 bg-black whitespace-nowrap truncate font-semibold md:font-bold sticky top-0"
                  >
                    {formatFecha(fecha)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((socio) => (
                <tr key={socio.Identificador}>
                  <td className="border-2 border-black min-w-[2.5rem] max-w-[2.5rem] text-center text-xs font-semibold truncate whitespace-nowrap">
                    {socio.Socio}
                  </td>
                  <td
                    className="border-2 border-black min-w-[5rem] max-w-[5rem] text-center text-xs font-bold truncate whitespace-nowrap p-1"
                    title={socio.NombreCompleto}
                  >
                    {socio.NombreCompleto}
                  </td>
                  <td className="border-2 border-black text-center text-xs font-bold truncate whitespace-nowrap p-1">
                    {socio.DNI}
                  </td>
                  <td className="border-2 border-black text-center text-xs font-bold truncate whitespace-nowrap p-1">
                    {socio.CUIL}
                  </td>
                  <td
                    className="border-2 border-black text-center min-w-[5rem] max-w-[5rem] text-xs font-bold truncate whitespace-nowrap p-1"
                    title={socio.CL}
                  >
                    {socio.CL}
                  </td>
                  <td
                    className="border-2 border-black text-center text-[0.50rem] md:text-sm font-bold truncate whitespace-nowrap p-1"
                    title={determinarBancoPorCBU(socio.CBU)}
                  >
                    {socio.CBU}
                  </td>
                  <td
                    className="border-2 border-black text-center text-[0.50rem] md:text-sm font-bold truncate whitespace-nowrap p-1"
                    title={determinarBancoPorCBU(socio.ExB)}
                  >
                    {socio.ExB}
                  </td>
                  {fechasDeCobroUnicas.map((fecha) => (
                    <td
                      key={fecha}
                      className="border-2 border-black text-center text-xs font-bold truncate whitespace-nowrap p-[1px] min-w-[3rem] max-w-[3rem]"
                      title={descripcionCodigo()}
                    >
                      {socio.Cobranzas.find((c) => c.FechaCobro === fecha)
                        ? socio.Cobranzas.find((c) => c.FechaCobro === fecha).Codigo
                        : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {data.length === 0 && <p className="mt-4">No hay datos disponibles.</p>}
      <div className="mt-4">
        <span>
          Página{' '}
          <strong>
            {page} de {totalPages}
          </strong>{' '}
        </span>
        <button
          onClick={() => {
            handleBuscarClick(page - 1);
          }}
          disabled={page === 1 || loading}
          className="px-2 py-1 mx-1 bg-gray-300 rounded"
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            handleBuscarClick(page + 1);
          }}
          disabled={totalPages === 0 || loading}
          className="px-2 py-1 mx-1 bg-gray-300 rounded"
        >
          {'>'}
        </button>
      </div>
    </section>
  );
};

export default TablaPagos;
