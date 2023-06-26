import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import FiltroCBU from '../Filtros/FiltroCBU';
import FiltroCodigo from '../Filtros/FiltroCodigo';
import FiltroPago from '../Filtros/FiltroPago';

const Filtros = ({
  filtroCodigo,
  filtroCBU,
  filtroPago,
  setFiltroCBU,
  setFiltroCodigo,
  setFiltroPago,
  setCurrentPage,
}) => {
  const reiniciarFiltros = () => {
    setFiltroCBU('');
    setFiltroPago('');
    setFiltroCodigo('');
    setCurrentPage(1);
  };
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <section className="flex justify-center my-5 h-14">
      <div className="flex items-end gap-5">
        <button
          onClick={toggleFilters}
          className={`border-2 border-black px-2 py-2 w-32 text-base font-bold rounded-md bg-yellow-500 hover:bg-yellow-600 text-black ${
            showFilters ? 'ml-0' : 'ml-auto'
          }`}
        >
          {showFilters ? 'Ocultar ⚙️' : 'Filtros ⚙️'}
        </button>
        <Transition
          show={showFilters}
          enter="transition duration-500 ease-in"
          enterFrom="opacity-0 transform translate-x-2"
          enterTo="opacity-100 transform translate-x-0"
          leave="transition duration-500 ease-in"
          leaveFrom="opacity-100 transform translate-x-0"
          leaveTo="opacity-0 transform translate-x-2"
        >
          {(ref) => (
            <div ref={ref} className="flex items-end gap-5">
              <FiltroCBU filtroCBU={filtroCBU} setFiltroCBU={setFiltroCBU} />
              <FiltroCodigo
                filtroCodigo={filtroCodigo}
                setFiltroCodigo={setFiltroCodigo}
              />
              <FiltroPago filtroPago={filtroPago} setFiltroPago={setFiltroPago} />

              <div className="self-end">
                <button
                  onClick={reiniciarFiltros}
                  className="border-2 border-black px-2 py-2 text-base rounded-md bg-blue-500 hover:bg-blue-600 text-white w-36"
                >
                  Reiniciar Filtros
                </button>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </section>
  );
};

export default Filtros;
