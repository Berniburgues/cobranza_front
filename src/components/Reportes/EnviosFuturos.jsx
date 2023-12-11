import React from 'react';

const EnviosFuturos = ({ isOpen, closeModal }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative text-center">
        <img
          src="https://i.ibb.co/3kBhh5C/futurooo.jpg"
          alt="Reporte"
          className="mx-auto mb-4"
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white border-2 border-black rounded-lg text-base shadow-md w-1/3 mt-1 md:mt-0"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default EnviosFuturos;
