import React from 'react';
import TablaCodigos from './TablaCodigos';

const ModalCodigos = ({ isOpen, closeModal }) => {
  const handleModalClick = (e) => {
    // Evitar que el clic en el contenido del modal cierre el modal
    e.stopPropagation();
  };

  const handleBackgroundClick = () => {
    // Cerrar el modal al hacer clic en el fondo
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <article
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="w-auto rounded-lg shadow-lg p-1 relative text-center overflow-y-auto max-h-full bg-black text-white"
        onClick={handleModalClick}
      >
        <TablaCodigos />
        <button
          className="bg-red-500 hover:bg-red-700 text-white border-2 border-black h-auto rounded-lg text-sm shadow-md w-1/3 mt-1"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </article>
  );
};

export default ModalCodigos;
