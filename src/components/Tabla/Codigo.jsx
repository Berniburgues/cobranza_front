import React from 'react';

const Codigo = ({ codigo, setCodigo }) => {
  const handleCodigoChange = (event) => {
    const selectedCodigo = event.target.value;
    setCodigo(selectedCodigo);
  };

  const opcionesCodigos = [
    'ACE',
    'R02',
    'R03',
    'R04',
    'R05',
    'R08',
    'R10',
    'R13',
    'R14',
    'R15',
    'R17',
    'R18',
    'R19',
    'R20',
    'R22',
    'R23',
    'R24',
    'R25',
    'R26',
    'R27',
    'R29',
    'R31',
    'R75',
    'R76',
    'R77',
    'R78',
    'R79',
    'R80',
    'R87',
    'R88',
    'R89',
    'R90',
    'R91',
    'R93',
    'R98',
  ];

  return (
    <select
      value={codigo}
      onChange={handleCodigoChange}
      className="border-2 border-gray-800 p-1 text-xs md:text-sm w-16 md:w-24 rounded-md focus:outline-none focus:border-blue-500"
    >
      <option value="">Código</option>
      {opcionesCodigos.map((codigo) => (
        <option key={codigo} value={codigo}>
          {codigo}
        </option>
      ))}
    </select>
  );
};

export default Codigo;
