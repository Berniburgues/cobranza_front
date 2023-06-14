import React, { useEffect, useState, useRef } from 'react';
// Importación de Funciones
import {
  obtenerFechasCobranza,
  obtenerFechasDesde,
  formatFecha,
} from '../../utils/fechas';
import { filtrarDatos } from '../../utils/filtros';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';
import { showCodigoDescription } from '../../utils/descripcionCodigos';
import { crearPDF } from '../../utils/crearPDF';
// Importación de Componentes
import Recuento from './Recuento';

const TablaCliente = ({ data, filtroCodigo, filtroCBU, filtroPago, filteredData }) => {
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [fechasCobro, setFechasCobro] = useState([]);
  const [fechasDesde, setFechasDesde] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fechasDesde = obtenerFechasDesde(data);
    const fechasCobro = obtenerFechasCobranza(data);

    setFechasDesde(fechasDesde);
    setFechasCobro(fechasCobro);
  }, [data]);

  useEffect(() => {
    const datosFiltrados = filtrarDatos(
      filteredData, // Utilizar los datos filtrados en lugar de los datos sin filtrar
      filtroCodigo,
      filtroCBU,
      filtroPago,
    );
    setDatosFiltrados(datosFiltrados);
  }, [filteredData, filtroCodigo, filtroCBU, filtroPago]);

  return (
    <table className="w-4/6 border-collapse text-center" ref={tableRef}>
      <thead>
        <Recuento
          fechasCobro={fechasCobro}
          fechasDesde={fechasDesde}
          datosFiltrados={datosFiltrados}
        />
        <tr>
          <th className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-black text-white z-10">
            Socio
          </th>
          <th className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-black text-white z-10">
            CBU
          </th>
          <th className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-black text-white z-10">
            Importe
          </th>
          <th className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-black text-white z-10">
            Pago
          </th>
          {fechasCobro.map((fecha, index) => (
            <th
              key={index}
              className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-black text-white z-10"
            >
              {formatFecha(fecha)}
            </th>
          ))}
          {fechasDesde.map((fechaDesde, index) => (
            <th
              key={index}
              className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-black text-white z-10"
            >
              {formatFecha(fechaDesde)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datosFiltrados.map((cliente) => {
          const cobranzasByDate = {};
          cliente.Cobranzas.forEach((cobranza) => {
            if (!cobranzasByDate[cobranza.FechaCobro]) {
              cobranzasByDate[cobranza.FechaCobro] = [];
            }
            cobranzasByDate[cobranza.FechaCobro].push(cobranza);
          });

          const nombreBanco = determinarBancoPorCBU(cliente.CBU);

          return (
            <tr key={cliente.Socio}>
              <td className="border-2 border-gray-800 px-1 py-2 text-sm">
                {cliente.Socio}
              </td>
              <td
                className={`border-2 border-gray-800 px-1 py-2 text-sm ${
                  cliente.CBU !== '027' ? 'bg-blue-500 text-black font-semibold' : ''
                }`}
                title={`${nombreBanco}`}
              >
                {cliente.CBU}
              </td>
              <td className="border-2 border-gray-800 px-1 py-2 text-sm">
                ${cliente.Importe}
              </td>
              <td
                className={`border-2 border-gray-800 px-1 py-2 text-sm font-bold ${
                  cliente.Pago === 'OK'
                    ? 'bg-green-400'
                    : cliente.Pago === 'NO'
                    ? 'bg-red-400'
                    : cliente.Pago === 'NN'
                    ? 'bg-orange-400'
                    : 'bg-yellow-300'
                }`}
              >
                {cliente.Pago}
              </td>
              {fechasCobro.map((fecha, index) => {
                const cobranzas = cobranzasByDate[fecha] || [];
                const uniqueCodigos = [
                  ...new Set(cobranzas.map((cobranza) => cobranza.Codigo)),
                ];
                const hasACE = uniqueCodigos.includes('ACE');
                const isR10 = uniqueCodigos.includes('R10');

                let cellColorClass = '';
                if (hasACE && isR10) {
                  cellColorClass = 'bg-gradient-to-b from-yellow-400 to-green-500';
                } else if (hasACE) {
                  cellColorClass = 'bg-green-500';
                } else if (isR10) {
                  cellColorClass = 'bg-yellow-400';
                } else if (uniqueCodigos.length > 0) {
                  cellColorClass = 'bg-red-500';
                }
                return (
                  <td
                    key={index}
                    className={`border-2 border-gray-800 px-1 py-2 text-sm font-bold w-1/12 ${cellColorClass}`}
                    title={
                      uniqueCodigos.length > 0 && showCodigoDescription(uniqueCodigos[0])
                    }
                  >
                    {uniqueCodigos.length > 0 && uniqueCodigos.join('-')}
                  </td>
                );
              })}
              {fechasDesde.map((fechaDesde, index) => {
                const isSelected = cliente.Archivos.some(
                  (archivo) => archivo.feDesde === fechaDesde,
                );
                const cellColorClass = isSelected ? 'bg-slate-400' : '';
                return (
                  <td
                    key={index}
                    className={`border-2 border-gray-800 px-1 py-2 text-sm ${cellColorClass}`}
                  ></td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <Recuento
          fechasCobro={fechasCobro}
          fechasDesde={fechasDesde}
          datosFiltrados={datosFiltrados}
        />
      </tfoot>
      <button onClick={() => crearPDF(tableRef)}>Exportar a PDF</button>
    </table>
  );
};

export default TablaCliente;
