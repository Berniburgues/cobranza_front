import React, { useState, useEffect } from 'react';

const ImportesSocios = ({
  importeCobrado,
  importeEnviadoTotal,
  importeEnviadoTramo1,
  altaCuiles,
  bajaCuiles,
  cuilesTotales,
  serviciosTitulares,
  serviciosAdherentes,
}) => {
  const [ratioTotal, setRatioTotal] = useState(0);
  const [ratioTramo1, setRatioTramo1] = useState(0);

  useEffect(() => {
    // Cuando cambian los importes, actualiza el gráfico y el ratio
    const importeEnviadoTotalNumerico = parseFloat(importeEnviadoTotal.replace('$', ''));
    const importeEnviadoTramo1Numerico = parseFloat(
      importeEnviadoTramo1.replace('$', ''),
    );
    const importeCobradoNumerico = parseFloat(importeCobrado?.replace('$', ''));
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
      <article className="rounded-md border-2 border-black mb-1 p-1">
        <p className="text-center text-base font-semibold italic">
          <span>Cuiles Altas:</span>{' '}
          <span className="text-green-500 font-bold">{altaCuiles}</span> |{' '}
          <span>Cuiles Bajas:</span>{' '}
          <span className="text-red-600 font-bold">{bajaCuiles}</span> |{' '}
          <span>Totales:</span>{' '}
          <span className="text-blue-600 font-bold">{cuilesTotales}</span>
        </p>
      </article>
      <article className="bg-slate-300 rounded-md border-2 border-black mb-1 p-1">
        <p className="text-center text-base font-semibold italic">
          <span>Servicios Titulares:</span>{' '}
          <span className="text-blue-600 font-bold">{serviciosTitulares}</span> |{' '}
          <span>Servicios Adherentes:</span>{' '}
          <span className="text-blue-600 font-bold">{serviciosAdherentes}</span> |{' '}
          <span>Totales:</span>{' '}
          <span className="text-green-500 font-bold">
            {serviciosTitulares + serviciosAdherentes}
          </span>
        </p>
      </article>

      <article className="flex flex-wrap text-center items-center justify-center gap-3 mb-1 border-2 border-black rounded-md p-1">
        <p className="font-semibold">
          <span>Enviado 0-30:</span>{' '}
          <span className="font-bold italic text-blue-600">{importeEnviadoTramo1}</span>
        </p>
        <p className="font-semibold">
          <span>Cobrado:</span>{' '}
          <span className="font-bold italic text-green-500">{importeCobrado}</span>
        </p>
        <p className="font-semibold">
          <span>Ratio 0-30:</span>{' '}
          <span className="font-bold italic text-green-500">{ratioTramo1}</span>
        </p>
      </article>
    </section>
  );
};

export default ImportesSocios;
