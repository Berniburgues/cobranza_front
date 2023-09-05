import React from 'react';
import CeldaSocio from './Celdas/CeldaSocio';
import CeldaCBU from './Celdas/CeldaCBU';
import CeldaDNI from './Celdas/CeldaDNI';
import CeldaPago from './Celdas/CeldaPago';
import CeldaCodigo from './Celdas/CeldaCodigo';
import CeldaCL from './Celdas/CeldaCL';
import CeldaExB from './Celdas/CeldaExB';

const Celdas = ({ data, getCobranzasByDate, fechasCobro, fechasDesde }) => {
  return (
    <tbody>
      {data.map((cliente) => {
        const cobranzasByDate = getCobranzasByDate(cliente.Cobranzas);

        return (
          <tr key={cliente.Identificador}>
            <CeldaSocio cliente={cliente} />
            <CeldaDNI cliente={cliente} />
            <CeldaCL cliente={cliente} />
            <CeldaCBU cliente={cliente} />
            <CeldaExB cliente={cliente} />
            <CeldaPago cliente={cliente} />
            <CeldaCodigo
              cobranzasByDate={cobranzasByDate}
              fechasCobro={fechasCobro}
              cliente={cliente}
            />
          </tr>
        );
      })}
    </tbody>
  );
};

export default Celdas;
