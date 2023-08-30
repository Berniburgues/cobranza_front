import React from 'react';

const CeldaDNI = ({ cliente }) => {
  return (
    <td
      className="border-2 border-gray-800 text-[0.5rem] truncate md:text-sm font-semibold"
      title={cliente.DNI}
    >
      {cliente.DNI}
    </td>
  );
};

export default CeldaDNI;
