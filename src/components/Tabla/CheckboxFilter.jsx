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
    <div className="flex flex-wrap items-center justify-between gap-5 text-sm">
      <label className="flex items-center space-x-1 cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4"
          checked={DNI}
          onChange={handleIncludeDNI}
        />
        <span className="text-black">DNI</span>
      </label>
      <label className="flex items-center space-x-1 cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4"
          checked={CL}
          onChange={handleIncludeCL}
        />
        <span className="text-black">CL</span>
      </label>
      <label className="flex items-center space-x-1 cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4"
          checked={EXB}
          onChange={handleIncludeEXB}
        />
        <span className="text-black">ExB</span>
      </label>
    </div>
  );
};

export default CheckboxFilter;
