import React from 'react';
import CeldaSocio from './Celdas/CeldaSocio';
import CeldaCBU from './Celdas/CeldaCBU';
import CeldaImporte from './Celdas/CeldaImporte';
import CeldaPago from './Celdas/CeldaPago';
import CeldaCodigo from './Celdas/CeldaCodigo';
import CeldaFeDesde from './Celdas/CeldaFeDesde';

const Celdas = ({ data, getCobranzasByDate, fechasCobro, fechasDesde }) => {
  return (
    <tbody>
      {data.map((cliente) => {
        const cobranzasByDate = getCobranzasByDate(cliente.Cobranzas);

        return (
          <tr key={cliente.Socio}>
            <CeldaSocio cliente={cliente} />
            <CeldaCBU cliente={cliente} />
            <CeldaImporte cliente={cliente} />
            <CeldaPago cliente={cliente} />
            <CeldaCodigo
              cobranzasByDate={cobranzasByDate}
              fechasCobro={fechasCobro}
              cliente={cliente}
            />
            <CeldaFeDesde cliente={cliente} fechasDesde={fechasDesde} />
          </tr>
        );
      })}
    </tbody>
  );
};

export default Celdas;
