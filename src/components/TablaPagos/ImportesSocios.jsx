import React from 'react';

const ImportesSocios = ({ pageSize, data, count, importeCobrado, importeEnviado }) => {
  const importeEnviadoNumerico = parseFloat(importeEnviado.replace('$', ''));
  const importeCobradoNumerico = parseFloat(importeCobrado.replace('$', ''));
  const ratio = ((importeCobradoNumerico / importeEnviadoNumerico) * 100).toFixed(2);

  return (
    <div>
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
          Ratio:{' '}
          <span className="font-bold italic text-green-500">
            {isNaN(ratio) ? '-' : `${ratio}%`}
          </span>
        </p>
      </article>
    </div>
  );
};

export default ImportesSocios;
