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

export const formatFechaSocio = (fecha) => {
  if (!fecha) {
    return '';
  }
  const [año, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${año}`;
};

// Función que recibe una fecha en formato YYYY-MM-DD y devuelve un nombre de mes y año
export const getNombrePeriodo = (fecha) => {
  // Dividir la fecha en partes (año, mes, día)
  const [year, month, day] = fecha.split('-');
  // Crear un objeto Date con las partes de la fecha
  const date = new Date(year, month - 1, day);
  // Obtener solo los dos últimos dígitos del año
  const yearShort = date.getFullYear().toString().slice(-2);
  // Crear un arreglo con los nombres de los meses en español
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  // Obtener el nombre del mes correspondiente al índice
  const nombreMes = meses[date.getMonth()];
  // Devolver el nombre del período en formato "Mes Año"
  return `${nombreMes} ${yearShort}`;
};
