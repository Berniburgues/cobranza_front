import React, { useState } from 'react';
import { fetchPadronData } from '../services/obtenerData';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format, parseISO } from 'date-fns';
import arLocale from 'date-fns/locale/ar';

const Padron = () => {
  const [padron, setPadron] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(''); // Puede ser 'total' o 'fechas'
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let excel = false;
    let txt = false;

    if (opcionSeleccionada === 'total') {
      excel = true;
    } else if (opcionSeleccionada === 'fechas') {
      excel = true;
      txt = true;
    }

    const params = {
      padron,
      excel: excel ? 'true' : undefined,
      txt: txt ? 'true' : undefined,
      fechaInicio: opcionSeleccionada === 'fechas' ? fechaInicio : undefined,
      fechaFin: opcionSeleccionada === 'fechas' ? fechaFin : undefined,
    };

    try {
      const data = await fetchPadronData(params);

      if (excel && data) {
        handleExcelDownload(data);
      }

      if (txt && data) {
        handleTxtDownload(data);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false); // Cambiar el estado de loading al finalizar la solicitud
    }
  };

  const handleReset = async () => {
    setPadron('');
    setOpcionSeleccionada('');
    setFechaFin('');
    setFechaInicio('');
    setLoading(false);
  };

  const handleExcelDownload = (data) => {
    if (!data || data.length === 0) {
      console.error('No existen altas entre las fechas seleccionadas');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const nombreHoja = `Padrón ${padron}${
      opcionSeleccionada === 'fechas'
        ? ` Altas entre ${format(parseISO(fechaInicio), 'dd-MM-yy', {
            locale: arLocale,
          })} y ${format(parseISO(fechaFin), 'dd-MM-yy', { locale: arLocale })}`
        : ''
    }`;
    const worksheet = workbook.addWorksheet(nombreHoja);

    worksheet.addTable({
      name: 'Padrón',
      ref: 'A1',
      headerRow: true,
      totalsRow: false,
      style: {
        theme: 'TableStyleMedium9', // Estilo de tabla
        showRowStripes: true, // Mostrar rayas en las filas
      },
      columns: Object.keys(data[0] || {}).map((key) => ({
        name: key,
        filterButton: true,
      })),
      rows: data.map((row) => Object.values(row)),
    });

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        saveAs(new Blob([buffer]), `${nombreHoja}.xlsx`);
      })
      .catch((error) => {
        console.error('Error generating Excel file', error);
      });
  };

  const handleTxtDownload = (data) => {
    if (!data || data.length === 0) {
      console.error('No existen altas entre las fechas seleccionadas');
      return;
    }

    const fechaInicioFormateada = fechaInicio
      ? format(parseISO(fechaInicio), 'dd-MM-yy', { locale: arLocale })
      : '';
    const fechaFinFormateada = fechaFin
      ? format(parseISO(fechaFin), 'dd-MM-yy', { locale: arLocale })
      : '';

    const nombreTxt = `Altas ${padron}${
      opcionSeleccionada === 'fechas'
        ? ` Entre ${fechaInicioFormateada} y ${fechaFinFormateada}`
        : ''
    }.txt`;

    const txtData = data.map((row) => Object.values(row).join('\t')).join('\n');
    const blob = new Blob([txtData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, nombreTxt);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Padrones</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            Selecciona el Padrón:
            <select
              value={padron}
              onChange={(e) => setPadron(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona una opción</option>
              <option value="ATSAPRA">ATSAPRA</option>
              <option value="CONSUMAS">Consumas</option>
              <option value="RAMA PLUS">RAMA PLUS</option>
              <option value="MPHG">MPHG</option>
            </select>
          </label>
        </div>
        <div>
          <label className="block mb-2">Opción de Descarga:</label>
          <div>
            <label className="mr-4">
              <input
                type="radio"
                value="total"
                checked={opcionSeleccionada === 'total'}
                onChange={() => setOpcionSeleccionada('total')}
                className="mr-2"
              />
              Padrón Total
            </label>
            <label>
              <input
                type="radio"
                value="fechas"
                checked={opcionSeleccionada === 'fechas'}
                onChange={() => setOpcionSeleccionada('fechas')}
                className="mr-2"
              />
              Altas entre Fechas
            </label>
          </div>
        </div>
        {opcionSeleccionada === 'fechas' && (
          <>
            <div>
              <label className="block mb-2">
                Fecha Inicio:
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </label>
            </div>
            <div>
              <label className="block mb-2">
                Fecha Fin:
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </label>
            </div>
          </>
        )}
        <div className="flex gap-5 justify-center items-center">
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded ${
              !padron || !opcionSeleccionada || loading
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={!padron || !opcionSeleccionada || loading}
          >
            {loading ? 'DESCARGANDO...' : 'DESCARGAR'}
          </button>
          <button
            className="w-full p-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded"
            onClick={handleReset}
          >
            NUEVA CONSULTA
          </button>
        </div>
      </form>
    </div>
  );
};

export default Padron;
