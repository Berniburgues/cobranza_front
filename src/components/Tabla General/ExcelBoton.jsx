import React from 'react';
import { crearExcel } from '../../utils/crearExcel';

const ExcelBoton = ({ tableRef, fechasCobro, fechasDesde }) => {
  return (
    <tr>
      <td colSpan={fechasCobro.length + fechasDesde.length + 4}>
        <button
          onClick={() => crearExcel(tableRef, fechasCobro, fechasDesde)}
          className="border-2 border-gray-800 p-1 text-sm font-semibold bg-green-200 hover:bg-green-300 w-full"
        >
          Descargar Excel
        </button>
      </td>
    </tr>
  );
};

export default ExcelBoton;
