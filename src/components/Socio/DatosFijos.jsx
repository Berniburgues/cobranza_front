import React from 'react';
import { determinarBancoPorCBU } from '../../utils/determinarBancoPorCbu';

const DatosFijos = ({ datosFijos }) => {
  // Formatear el documento con puntos (xx.xxx.xx)
  const documentoFormateado = `${datosFijos.documento.substring(
    0,
    2,
  )}.${datosFijos.documento.substring(2, 5)}.${datosFijos.documento.substring(5)}`;

  return (
    <article className="bg-black rounded-md text-white shadow-lg p-3 mx-auto my-4">
      <div className="text-center mb-4">
        <h2 className="text-base md:text-2xl font-bold">
          {datosFijos.nombre} {datosFijos.apellido}
        </h2>
        <p className="text-sm md:text-base italic text-gray-400">
          Socio #{datosFijos.socio}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 text-center">
        <div>
          <p className="font-bold underline text-lg">Documento:</p>
          <p>{documentoFormateado}</p>
        </div>
        <div>
          <p className="font-bold underline text-lg">CUIL:</p>
          <p>{datosFijos.cuil}</p>
        </div>
        <div>
          <p className="font-bold underline text-lg">Banco:</p>
          <p>{determinarBancoPorCBU(datosFijos.banco)}</p>
        </div>
        <div>
          <p className="font-bold underline text-lg">CBU:</p>
          <p>{datosFijos.CBU}</p>
        </div>
      </div>
    </article>
  );
};

export default DatosFijos;
