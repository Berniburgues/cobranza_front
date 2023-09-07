import React, { useState } from 'react';
import CheckboxFilter from './CheckboxFilter';

const Condiciones = ({
  DNI,
  CL,
  EXB,
  handleIncludeCL,
  handleIncludeDNI,
  handleIncludeEXB,
}) => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <div className="relative inline-block text-center">
      <button
        onClick={toggleMenu}
        type="button"
        className="w-16 md:w-24 rounded-md bg-white hover:bg-gray-300 focus:outline-none focus:border-blue-500 text-black p-1 md:px-2 md:py-1 text-center md:text-sm text-xs border-2 border-black flex items-center justify-center"
        id="options-menu"
      >
        Condic.<span className="ml-1">▼</span>
      </button>

      {menuAbierto && (
        <div
          className="absolute right-0 my-1 bg-white border border-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div role="none">
            <CheckboxFilter
              DNI={DNI}
              CL={CL}
              EXB={EXB}
              handleIncludeDNI={handleIncludeDNI}
              handleIncludeCL={handleIncludeCL}
              handleIncludeEXB={handleIncludeEXB}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Condiciones;
