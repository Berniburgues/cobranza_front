import React from 'react';

const CheckboxFilter = ({
  DNI,
  CL,
  EXB,
  handleIncludeDNI,
  handleIncludeCL,
  handleIncludeEXB,
}) => {
  return (
    <div className="flex flex-col justify-center gap-1 text-xs p-1">
      <label className="flex items-center space-x-3 cursor-pointer">
        <input
          type="checkbox"
          className="h-3 w-3 cursor-pointe"
          checked={DNI}
          onChange={handleIncludeDNI}
        />
        <span className="text-black">Documento</span>
      </label>
      <label className="flex items-center space-x-1 cursor-pointer">
        <input
          type="checkbox"
          className="h-3 w-3 cursor-pointer"
          checked={CL}
          onChange={handleIncludeCL}
        />
        <span className="text-black">Condición Laboral</span>
      </label>
      <label className="flex items-center space-x-1 cursor-pointer">
        <input
          type="checkbox"
          className="h-3 w-3 cursor-pointer"
          checked={EXB}
          onChange={handleIncludeEXB}
        />
        <span className="text-black">Enviado por Banco</span>
      </label>
    </div>
  );
};

export default CheckboxFilter;
