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
  // Crear un objeto Date a partir de la fecha
  const date = new Date(fecha);
  // Obtener el año de la fecha y obtener solo los dos últimos dígitos
  const year = date.getFullYear().toString().slice(-2);
  // Obtener el mes de la fecha (0-11)
  const month = date.getMonth() + 1;
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
  const nombreMes = meses[month];
  // Devolver el nombre del período en formato "Mes Año"
  return `${nombreMes} ${year}`;
};
