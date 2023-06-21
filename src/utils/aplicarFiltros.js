const aplicarFiltros = (cliente, filtroCBU, filtroPago, filtroCodigo) => {
  if (filtroCodigo === 'NO_ACE') {
    if (
      cliente.CBU.includes(filtroCBU) &&
      cliente.Pago.includes(filtroPago) &&
      !cliente.Cobranzas.some((cobranza) => cobranza.Codigo.includes('ACE'))
    ) {
      return true;
    }
  } else if (filtroCBU === 'OTROS') {
    if (cliente.Pago.includes(filtroPago) && cliente.CBU !== '027') {
      return true;
    }
  } else {
    if (
      cliente.CBU.includes(filtroCBU) &&
      cliente.Pago.includes(filtroPago) &&
      cliente.Cobranzas.some((cobranza) => cobranza.Codigo.includes(filtroCodigo))
    ) {
      return true;
    }
  }
  return false;
};

export default aplicarFiltros;
