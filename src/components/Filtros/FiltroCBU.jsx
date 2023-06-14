import React from 'react';

const FiltroCBU = ({ value, onChange }) => {
  return (
    <div className="m-2 text-center">
      <label htmlFor="filtroCBU" className="mr-2 text-base font-medium text-center">
        Banco:
      </label>
      <select
        id="filtroCBU"
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm focus:outline-none focus:border-blue-500"
      >
        <option value="">Todos</option>
        <option value="027">Supervielle</option>
        <option value="011">Nación</option>
        <option value="072">Santander</option>
        <option value="007">Galicia</option>
        <option value="017">BBVA</option>
        <option value="034">Patagonia</option>
        <option value="014">Provincia</option>
        <option value="020">Córdoba</option>
        <option value="016">Citibank</option>
        <option value="029">Ciudad Bs.As</option>
        <option value="044">Hipotecario</option>
        <option value="045">San Juan</option>
        <option value="065">Rosario</option>
        <option value="083">Chubut</option>
        <option value="086">Santa Cruz</option>
        <option value="093">La Pampa</option>
        <option value="094">Corrientes</option>
        <option value="097">Neuquén</option>
        <option value="143">Brubank</option>
        <option value="147">Interfinanzas</option>
        <option value="150">HSBC</option>
        <option value="158">Open Bank</option>
        <option value="191">Credicoop</option>
        <option value="259">ITAÚ</option>
        <option value="268">Tierra del Fuego</option>
        <option value="269">Del Uruguay</option>
        <option value="281">Meridian</option>
        <option value="285">Macro</option>
        <option value="299">COMAFI</option>
        <option value="389">Columbia</option>
        <option value="321">Sgo. Del Estero</option>
        <option value="301">Piano</option>
        <option value="322">Industrial</option>
        <option value="386">Entre Ríos</option>
        <option value="330">Santa Fé</option>
        <option value="311">Del Chaco</option>
        <option value="315">Formosa</option>
        <option value="310">Del Sol</option>
        <option value="309">De la Rioja</option>
        <option value="408">Financiera Argentina</option>
      </select>
    </div>
  );
};

export default FiltroCBU;
