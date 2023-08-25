import React from 'react';
import { formatFecha } from '../../../utils/fechas';

const ColumnaFechaCobro = ({ fechasCobro }) => {
  return fechasCobro.map((fecha, index) => (
    <th
      key={index}
      className="border-2 border-gray-800 p-1 sticky top-0 bg-black text-white z-10 text-[0.45rem] md:text-[0.7rem]"
    >
      {formatFecha(fecha)}
    </th>
  ));
};

export default ColumnaFechaCobro;
