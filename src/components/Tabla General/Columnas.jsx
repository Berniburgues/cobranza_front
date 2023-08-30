import React from 'react';
import ColumnaSocio from './Columnas/ColumnaSocio';
import ColumnaDNI from './Columnas/ColumnaDNI';
import ColumnaCBU from './Columnas/ColumnaCBU';
import ColumnaImporte from './Columnas/ColumnaImporte';
import ColumnaPago from './Columnas/ColumnaPago';
import ColumnaFechaCobro from './Columnas/ColumnaFechaCobro';
import ColumnaFeDesde from './Columnas/ColumnaFeDesde';

const Columnas = ({ fechasCobro, fechasDesde }) => {
  return (
    <tr>
      <ColumnaSocio />
      <ColumnaDNI />
      <ColumnaCBU />
      <ColumnaImporte />
      <ColumnaPago />
      <ColumnaFechaCobro fechasCobro={fechasCobro} />
      <ColumnaFeDesde fechasDesde={fechasDesde} />
    </tr>
  );
};

export default Columnas;
