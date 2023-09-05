import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center">
          <BeatLoader color="black" loading={loading} size={15} />
        </div>
      )}
    </>
  );
};

export default Loader;
