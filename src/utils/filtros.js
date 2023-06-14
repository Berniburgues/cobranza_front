export const filtrarDatos = (data, filtroCodigo, filtroCBU, filtroPago) => {
  let datosFiltrados = data;

  if (filtroCodigo !== '') {
    if (filtroCodigo === 'R02') {
      datosFiltrados = datosFiltrados.filter(
        (cliente) =>
          cliente.Cobranzas.some((cobranza) => cobranza.Codigo === filtroCodigo) &&
          !cliente.Cobranzas.some((cobranza) => cobranza.Codigo === 'R10'),
      );
    } else {
      datosFiltrados = datosFiltrados.filter((cliente) =>
        cliente.Cobranzas.some((cobranza) => cobranza.Codigo === filtroCodigo),
      );
    }
  }

  if (filtroCBU !== '') {
    datosFiltrados = datosFiltrados.filter((cliente) => cliente.CBU === filtroCBU);
  }

  if (filtroPago !== '') {
    datosFiltrados = datosFiltrados.filter((cliente) => cliente.Pago === filtroPago);
  }

  return datosFiltrados;
};
