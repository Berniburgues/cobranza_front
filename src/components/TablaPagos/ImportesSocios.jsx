import React, { useState, useEffect } from 'react';

const ImportesSocios = ({
  pageSize,
  data,
  count,
  importeCobrado,
  importeEnviado,
  altaCuiles,
  bajaCuiles,
  cuilesTotales,
}) => {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    // Cuando cambian los importes, actualiza el gráfico y el ratio
    const importeEnviadoNumerico = parseFloat(importeEnviado.replace('$', ''));
    const importeCobradoNumerico = parseFloat(importeCobrado.replace('$', ''));
    const newRatio = ((importeCobradoNumerico / importeEnviadoNumerico) * 100).toFixed(2);
    setRatio(isNaN(newRatio) ? '-' : newRatio + '%');
  }, [importeEnviado, importeCobrado]);

  return (
    <div>
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

      <article className="flex flex-wrap text-center items-center justify-center gap-5 mb-1 border-2 border-black rounded-md">
        <p className="font-semibold">
          Enviado:{' '}
          <span className="font-bold italic text-blue-600">{importeEnviado}</span>
        </p>
        <p className="font-semibold">
          Cobrado:{' '}
          <span className="font-bold italic text-green-500">{importeCobrado}</span>
        </p>
        <p className="font-semibold">
          Ratio: <span className="font-bold italic text-green-500">{ratio}</span>
        </p>
      </article>
    </div>
  );
};

export default ImportesSocios;
