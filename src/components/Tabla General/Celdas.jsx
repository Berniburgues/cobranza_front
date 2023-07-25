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
  // Crear un objeto Set vacío
  const sociosRenderizados = new Set();

  return (
    <tbody>
      {data.map((cliente) => {
        // Obtener el número de socio del cliente
        const numeroSocio = cliente.Socio;
        // Verificar si el número de socio ya está en el Set
        if (!sociosRenderizados.has(numeroSocio)) {
          // Si no está, agregarlo al Set
          sociosRenderizados.add(numeroSocio);
          // Aplicar los filtros y renderizar el cliente
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
                  cliente={cliente}
                />
                <CeldaFeDesde cliente={cliente} fechasDesde={fechasDesde} />
              </tr>
            );
          }
        }

        return null;
      })}
    </tbody>
  );
};

export default Celdas;
