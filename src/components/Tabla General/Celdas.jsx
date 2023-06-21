import React from 'react';
import CeldaSocio from './Celdas/CeldaSocio';
import CeldaCBU from './Celdas/CeldaCBU';
import CeldaImporte from './Celdas/CeldaImporte';
import CeldaPago from './Celdas/CeldaPago';
import CeldaCodigo from './Celdas/CeldaCodigo';
import CeldaFeDesde from './Celdas/CeldaFeDesde';
import aplicarFiltros from '../../utils/aplicarFiltros';

const Celdas = ({
  data,
  getCobranzasByDate,
  fechasCobro,
  fechasDesde,
  filtroCodigo,
  filtroCBU,
  filtroPago,
}) => {
  return (
    <tbody>
      {data.map((cliente) => {
        if (aplicarFiltros(cliente, filtroCBU, filtroPago, filtroCodigo)) {
          const cobranzasByDate = getCobranzasByDate(cliente.Cobranzas);

          return (
            <tr key={cliente.Socio}>
              <CeldaSocio cliente={cliente} />
              <CeldaCBU cliente={cliente} filtroCBU={filtroCBU} />
              <CeldaImporte cliente={cliente} />
              <CeldaPago cliente={cliente} filtroPago={filtroPago} />
              <CeldaCodigo
                cobranzasByDate={cobranzasByDate}
                fechasCobro={fechasCobro}
                filtroCodigo={filtroCodigo}
              />
              <CeldaFeDesde cliente={cliente} fechasDesde={fechasDesde} />
            </tr>
          );
        }

        return null;
      })}
    </tbody>
  );
};

export default Celdas;
