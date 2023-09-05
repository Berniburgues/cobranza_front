import React from 'react';
import ColumnaSocio from './Columnas/ColumnaSocio';
import ColumnaDNI from './Columnas/ColumnaDNI';
import ColumnaCBU from './Columnas/ColumnaCBU';
import ColumnaPago from './Columnas/ColumnaPago';
import ColumnaFechaCobro from './Columnas/ColumnaFechaCobro';
import ColumnaCL from './Columnas/ColumnaCL';
import ColumnaExB from './Columnas/ColumnaExB';

const Columnas = ({ fechasCobro, fechasDesde }) => {
  return (
    <tr>
      <ColumnaSocio />
      <ColumnaDNI />
      <ColumnaCL />
      <ColumnaCBU />
      <ColumnaExB />
      <ColumnaPago />
      <ColumnaFechaCobro fechasCobro={fechasCobro} />
    </tr>
  );
};

export default Columnas;
