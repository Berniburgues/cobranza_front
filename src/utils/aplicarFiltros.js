const aplicarFiltros = (cliente, filtroCBU, filtroPago, filtroCodigo) => {
  const cumpleCondicionPago = cliente.Pago.includes(filtroPago);

  if (filtroCBU === 'OTROS') {
    if (filtroCodigo === 'NO_ACE') {
      return (
        cliente.CBU !== '027' &&
        cumpleCondicionPago &&
        !cliente.Cobranzas.some((cobranza) => cobranza.Codigo.includes('ACE'))
      );
    } else {
      return cliente.CBU !== '027' && cumpleCondicionPago;
    }
  } else {
    if (filtroCodigo === 'NO_ACE') {
      return (
        cliente.CBU.includes(filtroCBU) &&
        cumpleCondicionPago &&
        !cliente.Cobranzas.some((cobranza) => cobranza.Codigo.includes('ACE'))
      );
    } else {
      return (
        cliente.CBU.includes(filtroCBU) &&
        cumpleCondicionPago &&
        cliente.Cobranzas.some((cobranza) => cobranza.Codigo.includes(filtroCodigo))
      );
    }
  }
};

export default aplicarFiltros;
