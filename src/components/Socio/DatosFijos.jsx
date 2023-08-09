import React from 'react';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';
import { formatFechaSocio } from '../../utils/fechas';

const DatosFijos = ({ datosFijos }) => (
  <article className="bg-black rounded-md text-white shadow-lg p-3 mx-auto my-4">
    <div className="text-center mb-4">
      <h2 className="text-2xl font-bold">
        {datosFijos.nombre} {datosFijos.apellido}
      </h2>
      <p className="text-base italic text-gray-400">Socio #{datosFijos.socio}</p>
    </div>
    <div className="grid grid-cols-2 gap-6 text-center">
      <div>
        <p className="font-bold underline text-lg">Documento:</p>
        <p>{datosFijos.documento}</p>
      </div>
      <div>
        <p className="font-bold underline text-lg">CUIL:</p>
        <p>
          {datosFijos.cuil.substring(0, 2)}-
          {datosFijos.cuil.substring(2, datosFijos.cuil.length - 1)}-
          {datosFijos.cuil.substring(datosFijos.cuil.length - 1)}
        </p>
      </div>
      <div>
        <p className="font-bold underline text-lg">Nacimiento:</p>
        <p>
          {datosFijos.nacimiento ? (
            formatFechaSocio(new Date(datosFijos.nacimiento).toISOString().split('T')[0])
          ) : (
            <span className="italic">No hay registro</span>
          )}
        </p>
      </div>
      <div>
        <p className="font-bold underline text-lg">Banco:</p>
        <p>{determinarBancoPorCBU(datosFijos.banco)}</p>
      </div>
    </div>
  </article>
);

export default DatosFijos;
