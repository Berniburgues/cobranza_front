export const showCodigoDescription = (codigo) => {
  let description = '';
  switch (codigo) {
    case 'ACE':
      description = 'Pago aceptado';
      break;
    case 'R02':
      description = 'Cuenta cerrada por orden judicial';
      break;
    case 'R03':
      description = 'Cuenta inexistente';
      break;
    case 'R04':
      description = 'Digito verificador de CBU incorrecto';
      break;
    case 'R05':
      description = 'Stop debit';
      break;
    case 'R08':
      description = 'Orden de no pagar';
      break;
    case 'R10':
      description = 'Falta de fondos';
      break;
    case 'R13':
      description = 'Sucursal/Entidad de destino incorrecta';
      break;
    case 'R14':
      description = 'Cliente inexistente';
      break;
    case 'R15':
      description = 'Adherente dado de baja';
      break;
    case 'R17':
      description = 'Error de formato';
      break;
    case 'R18':
      description = 'Fecha de compensación errónea';
      break;
    case 'R19':
      description = 'Importe erróneo';
      break;
    case 'R20':
      description = 'Moneda diferente a la de la cuenta';
      break;
    case 'R22':
      description = 'Devolución por solicitud del beneficiario';
      break;
    case 'R23':
      description = 'Sucursal no habilitada';
      break;
    case 'R24':
      description = 'Transacción duplicada';
      break;
    case 'R25':
      description = 'Error en registro adicional';
      break;
    case 'R26':
      description = 'Error por campo mandatorio';
      break;
    case 'R27':
      description = 'Error en contador de registro';
      break;
    case 'R29':
      description = 'Reversión ya efectuada';
      break;
    case 'R31':
      description = 'Vuelta atrás de cámara';
      break;
    case 'R75':
      description = 'Fecha inválida';
      break;
    case 'R76':
      description = 'Error en el CUIT o dígito verificador';
      break;
    case 'R77':
      description = 'Error en campo 4, Reg. Individ.';
      break;
    case 'R78':
      description = 'Error en campo 5, Reg. Individ.';
      break;
    case 'R79':
      description = 'Error en referencia unívoca transf.';
      break;
    case 'R80':
      description = 'Error en campo 3, Reg. Adic (Concepto)';
      break;
    case 'R87':
      description = 'Moneda inválida';
      break;
    case 'R88':
      description = 'Error en campo 2, Reg. Individ.';
      break;
    case 'R89':
      description = 'Errores en adhesión';
      break;
    case 'R90':
      description = 'Transacción no correspondiente: No existe original';
      break;
    case 'R91':
      description = 'Código entidad incompatible con moneda';
      break;
    case 'R93':
      description = 'Día no laborable';
      break;
    case 'R98':
      description = 'Solicitud entidad originante';
      break;
    default:
      description = 'Descripción para otros códigos';
      break;
  }
  return description;
};
