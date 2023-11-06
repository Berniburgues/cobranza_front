import React, { useState } from 'react';

const ImportesSocios = ({
  importes,
  altaCuiles,
  bajaCuiles,
  cuilesTotales,
  serviciosTitulares,
  serviciosAdherentes,
}) => {
  function getTramoNombre(tramoKey) {
    const tramoNombres = {
      'tramo 1': '0-30',
      'tramo 2': '30-60',
      'tramo 3': '60-90',
      'tramo 4': '90+',
    };
    return tramoNombres[tramoKey] || tramoKey;
  }

  const [expandido, setExpandido] = useState(false);

  const handleToggleExpandido = () => {
    setExpandido(!expandido);
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
          <div>
            <p className="text-center text-base font-semibold italic">
              <span className="underline">Enviado Total:</span>{' '}
              <span className="font-bold text-blue-500">
                {Number(importes.totales.enviado).toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </span>{' '}
              | <span className="underline">Cobrado Total:</span>{' '}
              <span className="font-bold text-green-500">
                {Number(importes.totales.cobrado).toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 2,
                })}
              </span>{' '}
              | <span className="underline">Ratio Total:</span>{' '}
              <span className="font-bold text-green-500">
                {Number(importes.totales.ratio).toFixed(2)}%
              </span>
            </p>
            <div className="text-center font-semibold italic">
              {Object.keys(importes.tramos).map((tramoKey) => (
                <p key={tramoKey}>
                  <span className="underline">Enviado {getTramoNombre(tramoKey)}:</span>{' '}
                  <span className="font-bold text-blue-500">
                    {Number(importes.tramos[tramoKey].enviado).toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 2,
                    })}
                  </span>{' '}
                  | <span className="underline">Cobrado {getTramoNombre(tramoKey)}:</span>{' '}
                  <span className="font-bold text-green-500">
                    {Number(importes.tramos[tramoKey].cobrado).toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      minimumFractionDigits: 2,
                    })}
                  </span>{' '}
                  | <span className="underline">Ratio {getTramoNombre(tramoKey)}:</span>{' '}
                  <span className="font-bold text-green-500">
                    {Number(importes.tramos[tramoKey].ratio).toFixed(2)}%
                  </span>
                </p>
              ))}
            </div>
          </div>
        )}
        <div className="text-center">
          <button
            onClick={handleToggleExpandido}
            className=" font-bold text-blue-600 hover:text-blue-500"
          >
            {expandido ? 'Ocultar Importes ⬆️' : 'Mostrar Importes ⬇️'}
          </button>
        </div>
      </article>
    </section>
  );
};

export default ImportesSocios;
