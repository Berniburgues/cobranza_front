import FiltroCBU from '../Filtros/FiltroCBU';
import FiltroCodigo from './FiltroCodigo';
import FiltroPago from './FiltroPago';

const Filtros = ({
  filtroCodigo,
  filtroCBU,
  filtroPago,
  setFiltroCBU,
  setFiltroCodigo,
  setFiltroPago,
}) => {
  const reiniciarFiltros = () => {
    setFiltroCBU('');
    setFiltroPago('');
    setFiltroCodigo('');
  };
  return (
    <section className="flex justify-center items-center space-x-4 mb-3">
      <FiltroCBU filtroCBU={filtroCBU} setFiltroCBU={setFiltroCBU} />

      <FiltroPago filtroPago={filtroPago} setFiltroPago={setFiltroPago} />

      <FiltroCodigo filtroCodigo={filtroCodigo} setFiltroCodigo={setFiltroCodigo} />

      <div className="self-end">
        <button
          onClick={reiniciarFiltros}
          className="border-2 border-black px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white"
        >
          Reiniciar Filtros
        </button>
      </div>
    </section>
  );
};

export default Filtros;
