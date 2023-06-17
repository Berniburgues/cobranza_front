import React, { useEffect, useState, useRef } from 'react';
import { obtenerFechasCobranza, obtenerFechasDesde } from '../../utils/fechas';
import Tabla from './Tabla';

const TablaCliente = ({ data }) => {
  const [fechasCobro, setFechasCobro] = useState([]);
  const [fechasDesde, setFechasDesde] = useState([]);

  const tableRef = useRef(null);

  useEffect(() => {
    const fechasDesde = obtenerFechasDesde(data);
    const fechasCobro = obtenerFechasCobranza(data);

    setFechasDesde(fechasDesde);
    setFechasCobro(fechasCobro);
  }, [data]);

  return (
    <Tabla
      data={data}
      tableRef={tableRef}
      fechasCobro={fechasCobro}
      fechasDesde={fechasDesde}
    />
  );
};

export default TablaCliente;
