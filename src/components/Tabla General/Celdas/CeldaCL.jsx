import React from 'react';

const CeldaCL = ({ cliente }) => {
  return (
    <td
      className="border-2 border-gray-800 text-[0.5rem] truncate md:text-xs font-semibold"
      title={cliente.CL}
    >
      {cliente.CL}
    </td>
  );
};

export default CeldaCL;
