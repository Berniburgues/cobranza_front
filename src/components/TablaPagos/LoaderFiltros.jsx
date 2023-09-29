import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoaderFiltros = () => {
  return (
    <div className="flex items-center justify-center">
      <BeatLoader color="black" size={20} />
    </div>
  );
};

export default LoaderFiltros;
