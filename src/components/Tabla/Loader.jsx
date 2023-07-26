import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center">
          <ClipLoader color="black" loading={loading} size={25} />
        </div>
      )}
    </>
  );
};

export default Loader;
