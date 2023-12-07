export const determinarColorPorBanco = (codigoBanco) => {
  switch (codigoBanco) {
    case '027':
      return 'bg-gradient-to-r from-red-900 to-red-500';
    case '011':
      return 'bg-gradient-to-r from-blue-900 to-blue-500';
    case '014':
      return 'bg-gradient-to-r from-green-900 to-green-500';
    case '003':
    case '004':
    case '005':
    case '006':
      return 'bg-gradient-to-r from-violet-900 to-violet-500';
    default:
      return 'bg-gradient-to-r from-slate-900 to-slate-500';
  }
};
