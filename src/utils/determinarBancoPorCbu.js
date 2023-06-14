export function determinarBancoPorCBU(cbu) {
  // Obtener los primeros dígitos del CBU
  const primerosDigitos = cbu.substr(0, 3);

  // Comparar con las secuencias iniciales de cada Banco
  if (primerosDigitos === '011') {
    return 'Banco Nación';
  } else if (primerosDigitos === '072') {
    return 'Banco Santander Río';
  } else if (primerosDigitos === '007') {
    return 'Banco Galicia';
  } else if (primerosDigitos === '017') {
    return 'Banco Francés (BBVA)';
  } else if (primerosDigitos === '034') {
    return 'Banco Patagonia';
  } else if (primerosDigitos === '027') {
    return 'Banco Supervielle';
  } else if (primerosDigitos === '014') {
    return 'Banco Provincia';
  } else if (primerosDigitos === '015') {
    return 'Banco ICBC';
  } else if (primerosDigitos === '020') {
    return 'Banco de la Provincia de Córdoba';
  } else if (primerosDigitos === '016') {
    return 'Citibank';
  } else if (primerosDigitos === '029') {
    return 'Banco de la Ciudad de Bs.As';
  } else if (primerosDigitos === '044') {
    return 'Banco Hipotecario';
  } else if (primerosDigitos === '045') {
    return 'Banco de San Juan';
  } else if (primerosDigitos === '065') {
    return 'Banco Municipal de Rosario';
  } else if (primerosDigitos === '083') {
    return 'Banco del Chubut';
  } else if (primerosDigitos === '086') {
    return 'Banco de Santa Cruz';
  } else if (primerosDigitos === '093') {
    return 'Banco de la Pampa';
  } else if (primerosDigitos === '094') {
    return 'Banco de Corrientes';
  } else if (primerosDigitos === '097') {
    return 'Banco Provincia del Neuquén';
  } else if (primerosDigitos === '143') {
    return 'Brubank';
  } else if (primerosDigitos === '147') {
    return 'Banco Interfinanzas';
  } else if (primerosDigitos === '150') {
    return 'Banco HSBC';
  } else if (primerosDigitos === '158') {
    return 'Open Bank';
  } else if (primerosDigitos === '191') {
    return 'Banco CREDICOOP';
  } else if (primerosDigitos === '259') {
    return 'Banco ITAU';
  } else if (primerosDigitos === '268') {
    return 'Banco Provincia Tierra del Fuego';
  } else if (primerosDigitos === '269') {
    return 'Banco del Uruguay';
  } else if (primerosDigitos === '281') {
    return 'Banco Meridian';
  } else if (primerosDigitos === '285') {
    return 'Banco Macro';
  } else if (primerosDigitos === '299') {
    return 'Banco COMAFI';
  } else if (primerosDigitos === '389') {
    return 'Banco Columbia';
  } else if (primerosDigitos === '321') {
    return 'Banco Santiago del Estero';
  } else if (primerosDigitos === '301') {
    return 'Banco Piano';
  } else if (primerosDigitos === '322') {
    return 'Banco Industrial';
  } else if (primerosDigitos === '386') {
    return 'Banco Entre Ríos';
  } else if (primerosDigitos === '330') {
    return 'Banco Santa Fé';
  } else if (primerosDigitos === '311') {
    return 'Banco del Chaco';
  } else if (primerosDigitos === '315') {
    return 'Banco de Formosa';
  } else if (primerosDigitos === '310') {
    return 'Banco del Sol';
  } else if (primerosDigitos === '309') {
    return 'Banco de la Rioja';
  } else if (primerosDigitos === '408') {
    return 'Compañía Financiera Argentina';
  } else if (primerosDigitos === '453') {
    return 'Naranja X';
  } else if (primerosDigitos === '415') {
    return 'Trasatlántico';
  }
  // Si no se encuentra el banco, retornar un valor por defecto
  return 'Desconocido';
}
