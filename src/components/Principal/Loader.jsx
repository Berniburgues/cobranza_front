import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center mt-5 h-32">
          <ClipLoader color="#3B82F6" loading={loading} size={100} />
        </div>
      )}
    </>
  );
};

export default Loader;
