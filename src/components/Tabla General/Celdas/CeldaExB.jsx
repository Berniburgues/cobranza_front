import React from 'react';
import { determinarBancoPorCBU } from '../../../utils/determinarBancoPorCbu';

const CeldaExB = ({ cliente }) => {
  const hasData = cliente.ExB !== null && cliente.ExB !== undefined;
  //const bgClass = hasData ? 'bg-violet-500' : 'bg-white';

  return (
    <td
      className="border-2 border-gray-800 text-[0.5rem] truncate md:text-xs font-semibold"
      title={hasData ? determinarBancoPorCBU(cliente.ExB) : null}
    >
      {cliente.ExB}
    </td>
  );
};

export default CeldaExB;
