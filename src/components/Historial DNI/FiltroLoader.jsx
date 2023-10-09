import React from 'react';
import { BeatLoader } from 'react-spinners';

const FiltroLoader = ({ loading }) => {
  return (
    <div className="flex items-center justify-center">
      <BeatLoader color="black" size={15} />
    </div>
  );
};

export default FiltroLoader;
