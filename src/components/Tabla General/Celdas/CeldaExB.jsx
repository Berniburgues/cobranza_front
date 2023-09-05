import React from 'react';
import { determinarBancoPorCBU } from '../../../utils/determinarBancoPorCbu';

const CeldaExB = ({ cliente }) => {
  return (
    <td
      className="border-2 border-gray-800 text-[0.5rem] truncate md:text-xs font-semibold bg-violet-500"
      title={determinarBancoPorCBU(cliente.ExB)}
    >
      {cliente.ExB}
    </td>
  );
};

export default CeldaExB;
