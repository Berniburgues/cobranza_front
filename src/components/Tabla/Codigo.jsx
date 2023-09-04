import React from 'react';

const Codigo = ({
  codigo,
  setCodigo,
  filtrosData,
  cbuSeleccionado,
  periodoSeleccionado,
}) => {
  const handleCodigoChange = (event) => {
    const selectedCodigo = event.target.value;
    setCodigo(selectedCodigo);
  };

  const mostrarTodosLosCodigos = periodoSeleccionado && !cbuSeleccionado;

  const opcionesCodigos = mostrarTodosLosCodigos
    ? [...new Set(Object.values(periodoSeleccionado).flat())] // Mostrar todos los códigos únicos
    : periodoSeleccionado[cbuSeleccionado] || [];

  return (
    <select
      value={codigo}
      onChange={handleCodigoChange}
      className="border-2 border-gray-800 p-1 text-xs md:text-sm w-16 md:w-24 rounded-md focus:outline-none focus:border-blue-500"
    >
      <option value="">Código</option>
      {opcionesCodigos.map((codigo) => (
        <option key={codigo} value={codigo}>
          {codigo}
        </option>
      ))}
    </select>
  );
};

export default Codigo;
