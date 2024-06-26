export const descripcionCodigo = (codigo) => {
  let description = '';
  switch (codigo) {
    case 'ACE':
      description = 'Pago aceptado';
      break;
    case 'R01':
      description = 'Remitirse al Emisor';
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
      description = 'Orden de no Pagar';
      break;
    case 'R06':
      description = 'Otro Error/Error Genérico';
      break;
    case 'R07':
      description = 'Recoger Tarjeta (Fraude)';
      break;
    case 'R08':
      description = 'STOP DEBIT';
      break;
    case 'R10':
      description = 'Falta de fondos';
      break;
    case 'R11':
      description = 'Imposible Autorizar';
      break;
    case 'R12':
      description = 'Transacción Inválida';
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
    case 'R16':
      description = 'Autorización Rechazada Emisor / Reservado Uso Privado';
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
    case 'R43':
      description = 'Tarjeta Robada/Extraviada';
      break;
    case 'R50':
      description = 'Causa de Rechazo en Boletín';
      break;
    case 'R51':
      description = 'Fondos Insuficientes';
      break;
    case 'R52':
      description = 'Supera el límite de compra';
      break;
    case 'R54':
      description = 'Tarjeta Expirada';
      break;
    case 'R55':
      description = 'Tarjeta Denegada';
      break;
    case 'R57':
      description = 'Transacción no permitida';
      break;
    case 'R58':
      description = 'Transacción no permitida (terminal)';
      break;
    case 'R61':
      description = 'Socio dado de baja';
      break;
    case 'R62':
      description = 'Tarjeta vencida';
      break;
    case 'R64':
      description = 'Tarjeta privada en comercio no autorizado';
      break;
    case 'R66':
      description = 'Tarjeta inexistente';
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
    case 'R84':
      description = 'Autorización Rechazada, adhesión dada de baja, stop debit';
      break;
    case 'R85':
      description = 'Stop debit';
      break;
    case 'R86':
      description = 'Sistema emisor no disponible';
      break;
    case 'R87':
      description = 'Moneda inválida';
      break;
    case 'R88':
      description = 'Autorización rechazada, socio en mora';
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
      description = '';
      break;
  }
  return description;
};
