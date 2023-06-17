import React from 'react';
import { formatFecha } from '../../../utils/fechas';

const ColumnaFeDesde = ({ fechasDesde }) => {
  return fechasDesde.map((fechaDesde, index) => (
    <th
      key={index}
      className="border-2 border-gray-800 px-1 py-2 sticky top-0 bg-slate-400 text-black z-10"
    >
      {formatFecha(fechaDesde)}
    </th>
  ));
};

export default ColumnaFeDesde;
