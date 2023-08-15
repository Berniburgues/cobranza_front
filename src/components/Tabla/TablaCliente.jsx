import React, { useEffect, useState, useRef } from 'react';
import { obtenerFechasCobranza, obtenerFechasDesde } from '../../utils/fechas';
import { getCobranzasByDate } from '../../utils/cobranzas';
import Columnas from '../Tabla General/Columnas';
import Celdas from '../Tabla General/Celdas';
import ExcelBoton from '../Tabla General/ExcelBoton';

const TablaCliente = ({ data, filtroCodigo, filtroPago, filtroCBU }) => {
  const [fechasCobro, setFechasCobro] = useState([]);
  const [fechasDesde, setFechasDesde] = useState([]);
  const [filtros, setFiltros] = useState({
    filtroCBU,
    filtroCodigo,
    filtroPago,
  });

  const tableRef = useRef(null);

  useEffect(() => {
    const fechasDesde = obtenerFechasDesde(data);
    const fechasCobro = obtenerFechasCobranza(data);

    setFechasDesde(fechasDesde);
    setFechasCobro(fechasCobro);
  }, [data]);

  useEffect(() => {
    setFiltros({
      filtroCBU,
      filtroCodigo,
      filtroPago,
    });
  }, [filtroCBU, filtroCodigo, filtroPago]);

  return (
    <div className="overflow-x-scroll min-w-full">
      <table
        className="w-full border-collapse text-center mx-auto table-fixed text-[0.50rem] md:text-xs"
        ref={tableRef}
      >
        <thead>
          <Columnas fechasCobro={fechasCobro} fechasDesde={fechasDesde} />
        </thead>
        <Celdas
          data={data}
          getCobranzasByDate={getCobranzasByDate}
          fechasCobro={fechasCobro}
          fechasDesde={fechasDesde}
          filtroCBU={filtros.filtroCBU}
          filtroCodigo={filtros.filtroCodigo}
          filtroPago={filtros.filtroPago}
        />
      </table>

      <table className="w-full border-collapse text-center mx-auto table-fixed text-xs">
        <tbody>
          <ExcelBoton
            tableRef={tableRef}
            fechasCobro={fechasCobro}
            fechasDesde={fechasDesde}
          />
        </tbody>
      </table>
    </div>
  );
};

export default TablaCliente;
