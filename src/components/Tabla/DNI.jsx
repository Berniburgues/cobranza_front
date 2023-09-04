import React from 'react';

const DNI = ({ includeDNI, setIncludeDNI, handleIncludeDNIToggle }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-xs text-black">DNI</span>
      <input
        type="checkbox"
        checked={includeDNI}
        onChange={handleIncludeDNIToggle}
        id="includeDNI"
        className="hidden"
      />
      <label
        htmlFor="includeDNI"
        className={`cursor-pointer ${
          includeDNI ? 'bg-green-500' : 'bg-red-500'
        } rounded-full border w-12 h-6 flex items-center transition duration-300 ease-in-out`}
      >
        <span
          className={`${
            includeDNI ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform rounded-full bg-white transition duration-300 ease-in-out`}
        ></span>
      </label>
    </div>
  );
};

export default DNI;
