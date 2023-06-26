import React from 'react';

const FiltroCodigo = ({ filtroCodigo, setFiltroCodigo }) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="filtroCodigo" className="text-base font-medium rounded-md">
        Código:
      </label>
      <select
        id="filtroCodigo"
        value={filtroCodigo}
        onChange={(e) => setFiltroCodigo(e.target.value)}
        className="border-2 border-gray-800 px-2 py-2 text-base rounded-md focus:outline-none focus:border-blue-500 w-32"
      >
        <option value="">Todos</option>
        <option value="ACE">ACE</option>
        <option value="NO_ACE">No ACE</option>
        <option value="R02">R02</option>
        <option value="R04">R04</option>
        <option value="R05">R05</option>
        <option value="R08">R08</option>
        <option value="R10">R10</option>
        <option value="R13">R13</option>
        <option value="R14">R14</option>
        <option value="R15">R15</option>
        <option value="R17">R17</option>
        <option value="R18">R18</option>
        <option value="R19">R19</option>
        <option value="R20">R20</option>
        <option value="R22">R22</option>
        <option value="R23">R23</option>
        <option value="R24">R24</option>
        <option value="R25">R25</option>
        <option value="R26">R26</option>
        <option value="R27">R27</option>
        <option value="R29">R29</option>
        <option value="R31">R31</option>
        <option value="R75">R75</option>
        <option value="R76">R76</option>
        <option value="R77">R77</option>
        <option value="R78">R78</option>
        <option value="R79">R80</option>
        <option value="R80">R80</option>
        <option value="R87">R87</option>
        <option value="R88">R88</option>
        <option value="R89">R89</option>
        <option value="R90">R90</option>
        <option value="R91">R91</option>
        <option value="R93">R93</option>
        <option value="R98">R98</option>
      </select>
    </div>
  );
};

export default FiltroCodigo;
