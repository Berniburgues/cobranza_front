import React from 'react';

const CeldaFeDesde = ({ cliente, fechasDesde }) => {
  return (
    <>
      {fechasDesde.map((fechaDesde, index) => {
        const isSelected = cliente.Archivos.some(
          (archivo) => archivo.feDesde === fechaDesde,
        );
        const cellColorClass = isSelected ? 'bg-gray-400' : '';

        return (
          <td
            key={index}
            className={`border-2 border-gray-800 px-1 py-2 text-sm ${cellColorClass}`}
          ></td>
        );
      })}
    </>
  );
};

export default CeldaFeDesde;
