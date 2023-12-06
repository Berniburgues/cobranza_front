import React from 'react';

const Buscador = ({ handleSearch, dni, setDNI }) => {
  const handleChange = (event) => {
    setDNI(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(dni);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-1 sticky top-10 bg-white p-1 shadow shadow-black rounded-md text-sm bg-opacity-80"
    >
      <label className="mr-2 font-semibold">
        Filtrar
        <input
          type="text"
          value={dni}
          onChange={handleChange}
          className="ml-2 p-1 border rounded-md"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
      >
        Ir
      </button>
    </form>
  );
};

export default Buscador;
