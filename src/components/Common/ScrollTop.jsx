import React from 'react';

const ScrollTop = () => {
  //Función que activa el scrolleo hacia el tope de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button
      onClick={() => scrollToTop()}
      className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full z-50"
    >
      ▲
    </button>
  );
};

export default ScrollTop;
