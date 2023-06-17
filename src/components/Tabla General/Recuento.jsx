import React from 'react';

const Recuento = ({ fechasCobro, fechasDesde, data }) => {
  return (
    <tr>
      <td
        colSpan={4 + fechasCobro.length + fechasDesde.length}
        className="border-2 border-gray-800 px-1 py-2 text-sm font-bold bg-gray-200"
      >
        Socios encontrados: {data.length}
      </td>
    </tr>
  );
};

export default Recuento;
