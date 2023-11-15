export function determinarBancoPorCBU(cbu) {
  // Obtener los primeros dígitos del CBU
  const primerosDigitos = cbu.substr(0, 3);

  // Comparar con las secuencias iniciales de cada Banco
  if (primerosDigitos === '011') {
    return 'Nación';
  } else if (primerosDigitos === '072') {
    return 'Santander Río';
  } else if (primerosDigitos === '007') {
    return 'Galicia';
  } else if (primerosDigitos === '017') {
    return 'Francés (BBVA)';
  } else if (primerosDigitos === '034') {
    return 'Patagonia';
  } else if (primerosDigitos === '027') {
    return 'Supervielle';
  } else if (primerosDigitos === '014') {
    return 'Provincia';
  } else if (primerosDigitos === '015') {
    return 'ICBC';
  } else if (primerosDigitos === '020') {
    return 'Provincia de Córdoba';
  } else if (primerosDigitos === '016') {
    return 'Citibank';
  } else if (primerosDigitos === '029') {
    return 'Ciudad de Bs.As';
  } else if (primerosDigitos === '044') {
    return 'Hipotecario';
  } else if (primerosDigitos === '045') {
    return 'San Juan';
  } else if (primerosDigitos === '065') {
    return 'Municipal de Rosario';
  } else if (primerosDigitos === '083') {
    return 'Chubut';
  } else if (primerosDigitos === '086') {
    return 'Santa Cruz';
  } else if (primerosDigitos === '093') {
    return 'La Pampa';
  } else if (primerosDigitos === '094') {
    return 'Corrientes';
  } else if (primerosDigitos === '097') {
    return 'Neuquén';
  } else if (primerosDigitos === '143') {
    return 'Brubank';
  } else if (primerosDigitos === '147') {
    return 'Interfinanzas';
  } else if (primerosDigitos === '150') {
    return 'HSBC';
  } else if (primerosDigitos === '158') {
    return 'Open Bank';
  } else if (primerosDigitos === '191') {
    return 'CREDICOOP';
  } else if (primerosDigitos === '259') {
    return 'ITAU';
  } else if (primerosDigitos === '268') {
    return 'Tierra del Fuego';
  } else if (primerosDigitos === '269') {
    return 'Del Uruguay';
  } else if (primerosDigitos === '281') {
    return 'Meridian';
  } else if (primerosDigitos === '285') {
    return 'Macro';
  } else if (primerosDigitos === '299') {
    return 'COMAFI';
  } else if (primerosDigitos === '389') {
    return 'Columbia';
  } else if (primerosDigitos === '321') {
    return 'Santiago del Estero';
  } else if (primerosDigitos === '301') {
    return 'Piano';
  } else if (primerosDigitos === '322') {
    return 'Industrial';
  } else if (primerosDigitos === '384') {
    return 'WILOBANK';
  } else if (primerosDigitos === '386') {
    return 'Entre Ríos';
  } else if (primerosDigitos === '340') {
    return 'BACS';
  } else if (primerosDigitos === '330') {
    return 'Santa Fé';
  } else if (primerosDigitos === '311') {
    return 'Chaco';
  } else if (primerosDigitos === '315') {
    return 'Formosa';
  } else if (primerosDigitos === '310') {
    return 'Del Sol';
  } else if (primerosDigitos === '309') {
    return 'La Rioja';
  } else if (primerosDigitos === '408') {
    return 'Compañía Financiera Argentina';
  } else if (primerosDigitos === '438') {
    return 'CORDIAL Compañía Financiera';
  } else if (primerosDigitos === '453') {
    return 'Naranja X';
  } else if (primerosDigitos === '415') {
    return 'Transatlántico';
  } else if (primerosDigitos === '426') {
    return 'Banco BICA S.A';
  } else if (primerosDigitos === '431') {
    return 'COINAG';
  } else if (primerosDigitos === '448') {
    return 'DINO';
  } else if (primerosDigitos === '000') {
    return 'Billetera Virtual';
  } else if (primerosDigitos === 'TAR') {
    return 'First Data';
  } else if (primerosDigitos === 'PRI') {
    return 'Prisma';
  } else if (primerosDigitos === '004') {
    return 'Visa';
  } else if (primerosDigitos === '005') {
    return 'MasterCard';
  }
  // Si no se encuentra el banco, retornar un valor por defecto
  return 'Desconocido';
}
