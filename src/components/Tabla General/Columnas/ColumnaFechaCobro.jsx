import React from 'react';
import { formatFecha } from '../../../utils/fechas';

const ColumnaFechaCobro = ({ fechasCobro }) => {
  return fechasCobro.map((fecha, index) => (
    <th
      key={index}
      className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-black text-white z-10"
    >
      {formatFecha(fecha)}
    </th>
  ));
};

export default ColumnaFechaCobro;
