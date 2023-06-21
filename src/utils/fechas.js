export const obtenerFechasDesde = (data) => {
  const fechasDesde = [];
  const ultimaFechaCobro = obtenerFechasCobranza(data).slice(-1)[0];

  data.forEach((cliente) => {
    cliente.Archivos.forEach((archivo) => {
      if (archivo.feDesde > ultimaFechaCobro && !fechasDesde.includes(archivo.feDesde)) {
        fechasDesde.push(archivo.feDesde);
      }
    });
  });

  return fechasDesde.sort();
};

export const obtenerFechasCobranza = (data) => {
  const cobranzasByDate = new Set();

  data.forEach((cliente) => {
    cliente.Cobranzas.forEach((cobranza) => {
      cobranzasByDate.add(cobranza.FechaCobro);
    });
  });

  return Array.from(cobranzasByDate).sort();
};

export const formatFecha = (fecha) => {
  if (!fecha) {
    return '';
  }
  const [año, mes, dia] = fecha.split('-');
  return `${dia}/${mes}`;
};
