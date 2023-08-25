import React from 'react';

const CBU = ({ cbu, setCBU }) => {
  const handleCBUChange = (event) => {
    const selectedCBU = event.target.value;
    setCBU(selectedCBU);
  };

  const opcionesBancos = [
    { codigo: '011', nombre: 'Nación' },
    { codigo: '072', nombre: 'Santander Río' },
    { codigo: '007', nombre: 'Galicia' },
    { codigo: '017', nombre: 'Francés (BBVA)' },
    { codigo: '034', nombre: 'Patagonia' },
    { codigo: '027', nombre: 'Supervielle' },
    { codigo: '014', nombre: 'Provincia' },
    { codigo: '015', nombre: 'ICBC' },
    { codigo: '020', nombre: 'Provincia de Córdoba' },
    { codigo: '016', nombre: 'Citibank' },
    { codigo: '029', nombre: 'Ciudad de Bs.As' },
    { codigo: '044', nombre: 'Hipotecario' },
    { codigo: '045', nombre: 'San Juan' },
    { codigo: '065', nombre: 'Municipal de Rosario' },
    { codigo: '083', nombre: 'Chubut' },
    { codigo: '086', nombre: 'Santa Cruz' },
    { codigo: '093', nombre: 'La Pampa' },
    { codigo: '094', nombre: 'Corrientes' },
    { codigo: '097', nombre: 'Neuquén' },
    { codigo: '143', nombre: 'Brubank' },
    { codigo: '147', nombre: 'Interfinanzas' },
    { codigo: '150', nombre: 'HSBC' },
    { codigo: '158', nombre: 'Open Bank' },
    { codigo: '191', nombre: 'CREDICOOP' },
    { codigo: '259', nombre: 'ITAU' },
    { codigo: '268', nombre: 'Tierra del Fuego' },
    { codigo: '269', nombre: 'del Uruguay' },
    { codigo: '281', nombre: 'Meridian' },
    { codigo: '285', nombre: 'Macro' },
    { codigo: '299', nombre: 'COMAFI' },
    { codigo: '389', nombre: 'Columbia' },
    { codigo: '321', nombre: 'Santiago del Estero' },
    { codigo: '301', nombre: 'Piano' },
    { codigo: '322', nombre: 'Industrial' },
    { codigo: '386', nombre: 'Entre Ríos' },
    { codigo: '330', nombre: 'Santa Fé' },
    { codigo: '311', nombre: 'Chaco' },
    { codigo: '315', nombre: 'Formosa' },
    { codigo: '310', nombre: 'Del Sol' },
    { codigo: '309', nombre: 'La Rioja' },
    { codigo: '408', nombre: 'Compañía Financiera Argentina' },
    { codigo: '453', nombre: 'Naranja X' },
    { codigo: '415', nombre: 'Trasatlántico' },
  ];

  return (
    <select
      value={cbu}
      onChange={handleCBUChange}
      className="border-2 border-gray-800 p-1 text-xs md:text-sm w-16 md:w-24 rounded-md focus:outline-none focus:border-blue-500"
    >
      <option value="">Banco</option>
      {opcionesBancos.map((opcion) => (
        <option key={opcion.codigo} value={opcion.codigo}>
          {opcion.nombre}
        </option>
      ))}
    </select>
  );
};

export default CBU;
