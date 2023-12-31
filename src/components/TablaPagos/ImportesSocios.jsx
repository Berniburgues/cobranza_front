import React, { useState } from 'react';

const ImportesSocios = ({
  importes,
  altaCuiles,
  bajaCuiles,
  cuilesTotales,
  serviciosTitulares,
  serviciosAdherentes,
}) => {
  const [expandido, setExpandido] = useState(true);
  const [tiposExpandidos, setTiposExpandidos] = useState(['CBU', 'TAR', 'TOT']);

  const handleToggleExpandido = () => {
    setExpandido(!expandido);
    setTiposExpandidos(['CBU', 'TAR', 'TOT']);
  };

  const handleToggleExpandidoTipo = (tipo) => {
    setTiposExpandidos((prevTiposExpandidos) =>
      prevTiposExpandidos.includes(tipo)
        ? prevTiposExpandidos.filter((t) => t !== tipo)
        : [...prevTiposExpandidos, tipo],
    );
  };

  return (
    <section className="text-xs font-family">
      <article className="rounded-md border-2 border-black mb-1 p-1">
        <p className="text-center font-semibold">
          <span>Cuiles Altas:</span>{' '}
          <span className="text-green-500 font-bold">{altaCuiles}</span> |{' '}
          <span>Cuiles Bajas:</span>{' '}
          <span className="text-red-600 font-bold">{bajaCuiles}</span> |{' '}
          <span>Totales:</span>{' '}
          <span className="text-blue-600 font-bold">{cuilesTotales}</span>
        </p>
      </article>
      <article className="bg-slate-300 rounded-md border-2 border-black mb-1 p-1">
        <p className="text-center font-semibold">
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
      <article className="rounded-md border-2 border-black mb-1 p-1">
        {expandido && (
          <div className="grid grid-cols-3">
            {Object.keys(importes).map((tipo) => (
              <div key={tipo} className="text-center">
                <button
                  onClick={() => handleToggleExpandidoTipo(tipo)}
                  className={`font-semibold cursor-pointer text-blue-600 hover:text-blue-500 mb-2 text-sm ${
                    tiposExpandidos.includes(tipo) ? 'font-bold underline' : ''
                  }`}
                >
                  {tipo === 'CBU'
                    ? 'Bancos'
                    : tipo === 'TAR'
                    ? 'Tarjeta'
                    : 'CBU + Tarjeta'}
                  {tiposExpandidos.includes(tipo) ? ' ⬆️' : ' ⬇️'}
                </button>
                {tiposExpandidos.includes(tipo) && (
                  <div className="flex flex-col">
                    <div>
                      <p className="font-semibold">
                        <span className="underline">{`Env 0-90:`}</span>{' '}
                        <span className="font-bold text-blue-500 block">
                          {Number(importes[tipo]['0-90'].Enviado).toLocaleString(
                            'es-AR',
                            {
                              style: 'currency',
                              currency: 'ARS',
                              minimumFractionDigits: 2,
                            },
                          )}
                        </span>
                      </p>
                      <p className="font-semibold">
                        <span className="underline">{`Cob 0-90:`}</span>{' '}
                        <span className="font-bold text-green-500 block">
                          {Number(importes[tipo]['0-90'].Cobrado).toLocaleString(
                            'es-AR',
                            {
                              style: 'currency',
                              currency: 'ARS',
                              minimumFractionDigits: 2,
                            },
                          )}
                        </span>
                      </p>
                      <p className="font-semibold">
                        <span className="underline block">{`Ratio 0-90:`}</span>{' '}
                        <span className="font-bold text-green-500 block">
                          {Number(importes[tipo]['0-90'].Ratio).toFixed(2)}%
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="text-center">
          <button
            onClick={handleToggleExpandido}
            className="font-bold text-blue-600 hover:text-blue-500"
          >
            {expandido ? 'Ocultar Importes ⬆️' : 'Mostrar Importes ⬇️'}
          </button>
        </div>
      </article>
    </section>
  );
};

export default ImportesSocios;
