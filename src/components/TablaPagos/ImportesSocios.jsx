import React, { useState, useEffect } from 'react';

const ImportesSocios = ({
  pageSize,
  data,
  count,
  importeCobrado,
  importeEnviadoTotal,
  importeEnviadoTramo1,
  altaCuiles,
  bajaCuiles,
  cuilesTotales,
}) => {
  const [ratioTotal, setRatioTotal] = useState(0);
  const [ratioTramo1, setRatioTramo1] = useState(0);

  useEffect(() => {
    // Cuando cambian los importes, actualiza el gráfico y el ratio
    const importeEnviadoTotalNumerico = parseFloat(importeEnviadoTotal.replace('$', ''));
    const importeEnviadoTramo1Numerico = parseFloat(
      importeEnviadoTramo1.replace('$', ''),
    );
    const importeCobradoNumerico = parseFloat(importeCobrado.replace('$', ''));
    const newRatioTotal = (
      (importeCobradoNumerico / importeEnviadoTotalNumerico) *
      100
    ).toFixed(2);
    setRatioTotal(isNaN(newRatioTotal) ? '-' : newRatioTotal + '%');
    const newRatioTramo1 = (
      (importeCobradoNumerico / importeEnviadoTramo1Numerico) *
      100
    ).toFixed(2);
    setRatioTramo1(isNaN(newRatioTramo1) ? '-' : newRatioTramo1 + '%');
  }, [importeEnviadoTotal, importeEnviadoTramo1, importeCobrado]);

  return (
    <section>
      <article className="rounded-md border-2 border-black mb-1">
        <p className="text-center text-base font-semibold italic">
          Cuiles Altas: <span className="text-green-600 font-bold">{altaCuiles}</span> |
          Cuiles Bajas: <span className="text-red-600 font-bold">{bajaCuiles}</span> |
          Totales: <span className="text-blue-600 font-bold">{cuilesTotales}</span>
        </p>
      </article>
      <article className="bg-slate-300 rounded-md border-2 border-black mb-1">
        <p className="text-center text-base font-semibold italic">
          Mostrando{' '}
          <span className="text-blue-600 font-bold">
            {Math.min(pageSize, data.length)}
          </span>{' '}
          de <span className="text-blue-600 font-bold">{count}</span> Socios
        </p>
      </article>

      <article className="flex flex-wrap text-center items-center justify-center gap-3 mb-1 border-2 border-black rounded-md">
        <p className="font-semibold">
          Enviado Total:{' '}
          <span className="font-bold italic text-blue-600">{importeEnviadoTotal}</span>
        </p>
        <p className="font-semibold">
          Enviado 0-90:{' '}
          <span className="font-bold italic text-blue-600">{importeEnviadoTramo1}</span>
        </p>
        <p className="font-semibold">
          Cobrado:{' '}
          <span className="font-bold italic text-green-500">{importeCobrado}</span>
        </p>
        <p className="font-semibold">
          Ratio Total:{' '}
          <span className="font-bold italic text-green-500">{ratioTotal}</span>
        </p>
        <p className="font-semibold">
          Ratio 0-90:{' '}
          <span className="font-bold italic text-green-500">{ratioTramo1}</span>
        </p>
      </article>
    </section>
  );
};

export default ImportesSocios;
