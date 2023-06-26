import React from 'react';

const FiltroCBU = ({ filtroCBU, setFiltroCBU }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <label htmlFor="filtroCBU" className="text-base font-medium  rounded-md">
          Banco:
        </label>
        <select
          id="filtroCBU"
          value={filtroCBU}
          onChange={(e) => setFiltroCBU(e.target.value)}
          className="border-2 border-gray-800 px-2 py-2 text-base rounded-md focus:outline-none focus:border-blue-500 w-32"
        >
          <option value="">Todos</option>
          <option value="027">Supervielle</option>
          <option value="OTROS">Otros bancos</option>
          <option value="011">Nación</option>
          <option value="014">Provincia</option>
          <option value="072">Santander</option>
          <option value="007">Galicia</option>
          <option value="017">BBVA Francés</option>
          <option value="034">Patagonia</option>
          <option value="015">ICBC</option>
          <option value="020">De Córdoba</option>
          <option value="016">Citibank</option>
          <option value="029">Ciudad Bs.As</option>
          <option value="044">Hipotecario</option>
          <option value="045">De San Juan</option>
          <option value="065">Municipal de Rosario</option>
          <option value="083">Del Chubut</option>
          <option value="086">De Santa Cruz</option>
          <option value="093">De La Pampa</option>
          <option value="094">De Corrientes</option>
          <option value="097">Del Neuquén</option>
          <option value="143">Brubank</option>
          <option value="147">Interfinanzas</option>
          <option value="150">HSBC</option>
          <option value="158">Open Bank</option>
          <option value="191">CREDICOOP</option>
          <option value="259">ITAÚ</option>
          <option value="268">Tierra del Fuego</option>
          <option value="269">Del Uruguay</option>
          <option value="281">Meridian</option>
          <option value="285">Macro</option>
          <option value="299">COMAFI</option>
          <option value="389">Columbia</option>
          <option value="321">Santiago del Estero</option>
          <option value="301">Piano</option>
          <option value="322">Industrial</option>
          <option value="386">Entre Ríos</option>
          <option value="330">Santa Fé</option>
          <option value="311">Del Chaco</option>
          <option value="315">De Formosa</option>
          <option value="310">Del Sol</option>
          <option value="309">De la Rioja</option>
          <option value="408">Financiera Argentina</option>
          <option value="453">Naranja X</option>
          <option value="415">Trasatlántico</option>
        </select>
      </div>
    </>
  );
};

export default FiltroCBU;
