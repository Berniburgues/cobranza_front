import React from 'react';
import { descripcionCodigo } from '../../utils/descripcionCodigos';
import { getNombrePeriodo } from '../../utils/fechas';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const Historial = ({ datosFijos, cobranza }) => {
  // Obtener la lista única de días de cobro
  const diasCobro = [...new Set(cobranza.map((item) => item.dia))].sort((a, b) => a - b);

  // Obtener la lista única de periodos
  const periodos = [...new Set(cobranza.map((item) => item.periodo))];

  // Agrupar la información de cobranza por día y periodo
  const datosAgrupados = {};
  cobranza.forEach((item) => {
    const clave = `${item.periodo}-${item.dia}-${item.codigo}`;
    if (!datosAgrupados[clave]) {
      datosAgrupados[clave] = { ...item, importeTotal: item.importe };
    } else {
      datosAgrupados[clave].importeTotal += item.importe;
    }
  });

  return (
    <article className="p-1">
      <table className="w-full border-collapse text-center table-fixed text-xs md:text-sm">
        <thead>
          <tr>
            <th
              className="border-2 border-black bg-slate-800 text-white truncate whitespace-normal md:whitespace-nowrap font-mono text-xs md:text-sm font-semibold md:font-bold"
              colSpan={diasCobro.length + 1}
            >
              {datosFijos && (
                <>
                  <div>
                    #{datosFijos.socio} || {datosFijos.nombre} {datosFijos.apellido} ||
                    DNI: {datosFijos.documento} || CUIL: {datosFijos.cuil} || Banco:{' '}
                    {determinarBancoPorCBU(datosFijos.banco)}
                  </div>
                </>
              )}
            </th>
          </tr>
          <tr>
            <th className="border-2 border-gray-800 bg-black text-white font-mono truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold">
              PERÍODO
            </th>
            {diasCobro.map((dia, index) => (
              <th
                key={index}
                className="border-2 border-gray-800 bg-black text-white truncate whitespace-normal md:whitespace-nowrap text-xs md:text-sm font-semibold md:font-bold font-mono"
              >
                DÍA {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periodos.map((periodo, index) => (
            <tr key={index}>
              <td
                className="border-2 border-gray-800 text-center font-semibold md:font-bold text-[0.50rem] md:text-xs truncate whitespace-nowrap font-mono bg-white text-black"
                title={getNombrePeriodo(periodo)}
              >
                {getNombrePeriodo(periodo)}
              </td>
              {diasCobro.map((dia, index) => {
                const clave = `${periodo}-${dia}`;
                const cobroDia = Object.values(datosAgrupados).filter(
                  (item) => item.dia === dia && item.periodo === periodo,
                );

                const codigosAplanados = cobroDia
                  .map((item) => item.codigo)
                  .filter((value, index, self) => self.indexOf(value) === index)
                  .join('-');
                const importeTotal = cobroDia.reduce(
                  (total, item) => total + item.importeTotal,
                  0,
                );

                const ultimoCodigo = cobroDia[cobroDia.length - 1]?.codigo || '';
                const descripcion = ultimoCodigo ? descripcionCodigo(ultimoCodigo) : '';

                const hasACE = codigosAplanados.includes('ACE');
                const isR10 = codigosAplanados.includes('R10');
                const hasTwoR =
                  codigosAplanados.split('-').filter((codigo) => codigo.startsWith('R'))
                    .length === 2;

                let cellColorClass = '';
                if (hasACE && isR10) {
                  cellColorClass = 'bg-gradient-to-b from-yellow-400 to-green-500';
                } else if (hasTwoR) {
                  cellColorClass = 'bg-gradient-to-b from-yellow-500 to-red-500';
                } else if (hasACE) {
                  cellColorClass = 'bg-green-500';
                } else if (isR10) {
                  cellColorClass = 'bg-yellow-400';
                } else if (ultimoCodigo) {
                  cellColorClass = 'bg-red-500';
                }

                // Agregar fecha de cobro al título
                const fechaCobro = cobroDia.length > 0 ? cobroDia[0].fecCobro : '';
                const fechaCobroFormateada = fechaCobro
                  ? fechaCobro.split('-').slice(1).reverse().join('/')
                  : '';

                const titleText = codigosAplanados
                  ? `${fechaCobroFormateada} - ${descripcion} - $${importeTotal}`
                  : null;

                return (
                  <td
                    key={index}
                    className={`border-2 border-black text-center text-[0.50rem] md:text-sm font-mono font-bold truncate whitespace-nowrap ${cellColorClass}`}
                    title={titleText}
                  >
                    {codigosAplanados || ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Historial;
