import React from 'react';
import { getCobranzasByDate } from '../../utils/cobranzas';
import Celdas from './Celdas';
import Columnas from './Columnas';
import Recuento from './Recuento';
import PDFBoton from './PDFBoton';

const Tabla = ({ data, tableRef, fechasCobro, fechasDesde }) => {
  return (
    <table className="w-4/6 border-collapse text-center" ref={tableRef}>
      <thead>
        <Recuento fechasCobro={fechasCobro} fechasDesde={fechasDesde} data={data} />
        <Columnas fechasCobro={fechasCobro} fechasDesde={fechasDesde} />
      </thead>
      <Celdas
        data={data}
        getCobranzasByDate={getCobranzasByDate}
        fechasCobro={fechasCobro}
        fechasDesde={fechasDesde}
      />
      <tfoot>
        <Recuento fechasCobro={fechasCobro} fechasDesde={fechasDesde} data={data} />
        <PDFBoton
          fechasCobro={fechasCobro}
          fechasDesde={fechasDesde}
          tableRef={tableRef}
        />
      </tfoot>
    </table>
  );
};

export default Tabla;
