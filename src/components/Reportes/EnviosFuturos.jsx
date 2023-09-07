import React from 'react';

const EnviosFuturos = ({ isOpen, closeModal }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative text-center">
        <p className="font-semibold text-red-500">
          <span className="font-bold underline italic">TENER EN CUENTA:</span> VENTAS
          HASTA EL 31/05 de OTROS BANCOS NO ENVIAR al primer vencimiento mora. MARTES 2/10
          CRUZAR DEVOLUCIÓN CON BAJAS
        </p>
        <img
          src="https://i.ibb.co/Wn9dF6Z/Enviados-a-futuro.png"
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
