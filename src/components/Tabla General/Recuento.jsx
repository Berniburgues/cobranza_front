import React from 'react';
import aplicarFiltros from '../../utils/aplicarFiltros';

const Recuento = ({ fechasCobro, fechasDesde, data, filtros }) => {
  // Aplicar filtros para obtener los datos filtrados
  const datosFiltrados = data.filter((cliente) =>
    aplicarFiltros(cliente, filtros.filtroCBU, filtros.filtroPago, filtros.filtroCodigo),
  );

  return (
    <tr>
      <td
        colSpan={4 + fechasCobro.length + fechasDesde.length}
        className="border-2 border-gray-800 px-1 py-2 text-sm font-bold bg-gray-200"
      >
        Socios encontrados: {datosFiltrados.length}
      </td>
    </tr>
  );
};

export default Recuento;
