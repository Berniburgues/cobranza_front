import React, { useState } from 'react';

const ImportesSocios = ({
  importes,
  altaCuiles,
  bajaCuiles,
  cuilesTotales,
  serviciosTitulares,
  serviciosAdherentes,
}) => {
  const [expandido, setExpandido] = useState(false);
  const [tiposExpandidos, setTiposExpandidos] = useState([]);

  const handleToggleExpandido = () => {
    setExpandido(!expandido);
    setTiposExpandidos([]);
  };

  const handleToggleExpandidoTipo = (tipo) => {
    setTiposExpandidos((prevTiposExpandidos) =>
      prevTiposExpandidos.includes(tipo)
        ? prevTiposExpandidos.filter((t) => t !== tipo)
        : [...prevTiposExpandidos, tipo],
    );
  };

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
      <article className="rounded-md border-2 border-black mb-1 p-1">
        {expandido && (
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(importes).map((tipo) => (
              <div key={tipo} className="text-center">
                <button
                  onClick={() => handleToggleExpandidoTipo(tipo)}
                  className={`text-base font-semibold cursor-pointer text-blue-600 hover:text-blue-500 ${
                    tiposExpandidos.includes(tipo) ? 'font-bold underline' : ''
                  }`}
                >
                  {tipo === 'CBU' ? 'Bancos' : tipo === 'TAR' ? 'Tarjeta' : 'Totales'}
                  {tiposExpandidos.includes(tipo) ? ' ⬆️' : ' ⬇️'}
                </button>
                {tiposExpandidos.includes(tipo) && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold italic">
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
                      <p className="text-sm font-semibold italic">
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
                      <p className="text-sm font-semibold italic">
                        <span className="underline block">{`Rat 0-90:`}</span>{' '}
                        <span className="font-bold text-green-500 block">
                          {Number(importes[tipo]['0-90'].Ratio).toFixed(2)}%
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold italic">
                        <span className="underline">{`Env Total:`}</span>{' '}
                        <span className="font-bold text-blue-500 block">
                          {Number(importes[tipo].Total.Enviado).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                      <p className="text-sm font-semibold italic">
                        <span className="underline">{`Cob Total:`}</span>{' '}
                        <span className="font-bold text-green-500 block">
                          {Number(importes[tipo].Total.Cobrado).toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                      <p className="text-sm font-semibold italic">
                        <span className="underline">{`Rat Total:`}</span>{' '}
                        <span className="font-bold text-green-500 block">
                          {Number(importes[tipo].Total.Ratio).toFixed(2)}%
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
            className={`font-bold text-blue-600 hover:text-blue-500  ${
              tiposExpandidos.length > 0 ? 'mt-1' : 'mt-0'
            } ${expandido ? 'mt-3' : 'mt-0'}`}
          >
            {expandido ? 'Ocultar Importes ⬆️' : 'Mostrar Importes ⬇️'}
          </button>
        </div>
      </article>
    </section>
  );
};

export default ImportesSocios;
