import React from 'react';

const Recuento = ({ fechasCobro, fechasDesde, data, filtros }) => {
  // Aplicar filtros para obtener los datos filtrados
  const datosFiltrados = data.filter((item) => {
    // Verificar los filtros aplicados a cada elemento
    const filtroCBU = filtros.filtroCBU ? item.CBU.includes(filtros.filtroCBU) : true;
    const filtroCodigo = filtros.filtroCodigo
      ? item.Codigo.includes(filtros.filtroCodigo)
      : true;
    const filtroPago = filtros.filtroPago ? item.Pago.includes(filtros.filtroPago) : true;

    // Retornar true solo si todos los filtros coinciden
    return filtroCBU && filtroCodigo && filtroPago;
  });

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
