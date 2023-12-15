import React from 'react';
import { descripcionCodigo } from '../../utils/descripcionCodigos';

const TablaCodigos = () => {
  const codigos = [
    'ACE',
    'R01',
    'R02',
    'R03',
    'R04',
    'R05',
    'R06',
    'R07',
    'R08',
    'R10',
    'R11',
    'R12',
    'R13',
    'R14',
    'R15',
    'R16',
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
    'R43',
    'R50',
    'R51',
    'R52',
    'R54',
    'R55',
    'R57',
    'R58',
    'R61',
    'R62',
    'R64',
    'R66',
    'R75',
    'R76',
    'R77',
    'R78',
    'R79',
    'R80',
    'R84',
    'R85',
    'R86',
    'R87',
    'R88',
    'R89',
    'R90',
    'R91',
    'R93',
    'R98',
  ];

  // Función para obtener la clase CSS basada en el valor del código
  const getClassForCodigo = (codigo) => {
    switch (codigo) {
      case 'ACE':
        return 'text-green-500 font-bold'; // Clase de color verde
      case 'R10':
        return 'text-yellow-400 font-bold'; // Clase de color amarillo
      default:
        return 'text-red-500 font-bold'; // Clase de color rojo para otros códigos
    }
  };

  return (
    <article>
      <table className="table">
        <thead>
          <tr className="text-lg border-b border-white">
            <th>CÓDIGO</th>
            <th>DESCRIPCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {codigos.map((codigo) => (
            <tr key={codigo} className="border-b border-dotted border-white">
              <td className={getClassForCodigo(codigo)}>{codigo}</td>
              <td className="font-semibold">{descripcionCodigo(codigo).toUpperCase()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default TablaCodigos;
