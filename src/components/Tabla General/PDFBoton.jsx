import { React } from 'react';
import { crearPDF } from '../../utils/crearPDF';

const PDFBoton = ({ fechasCobro, fechasDesde, tableRef }) => {
  return (
    <tr>
      <td colSpan={fechasCobro.length + fechasDesde.length + 4}>
        <button
          onClick={() => crearPDF(tableRef)}
          className="border-2 border-gray-800 p-1 text-sm font-semibold bg-red-200 hover:bg-red-300 w-full"
        >
          Descargar PDF
        </button>
      </td>
    </tr>
  );
};

export default PDFBoton;
