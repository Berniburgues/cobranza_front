export const getCobranzasByDate = (cobranzas) => {
  const cobranzasByDate = {};
  cobranzas.forEach((cobranza) => {
    if (!cobranzasByDate[cobranza.FechaCobro]) {
      cobranzasByDate[cobranza.FechaCobro] = [];
    }
    cobranzasByDate[cobranza.FechaCobro].push(cobranza);
  });
  return cobranzasByDate;
};
