import React, { useState, useEffect } from 'react';
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
  const [hastaHoy, setHastaHoy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Estado para el mensaje de error

  useEffect(() => {
    if (hastaHoy) {
      setFechaFin(format(new Date(), 'yyyy-MM-dd'));
    }
  }, [hastaHoy]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Limpiar cualquier error previo

    if (fechaInicio && fechaFin && new Date(fechaInicio) > new Date(fechaFin)) {
      setError('La fecha de inicio debe ser menor a la fecha de fin');
      setLoading(false);
      return;
    }

    try {
      let excelData = null;
      let txtData = null;

      if (opcionSeleccionada === 'total') {
        const params = {
          padron,
          excel: 'true',
        };
        [excelData, txtData] = await Promise.all([
          fetchPadronData(params),
          fetchPadronData({ padron, txt: 'true' }),
        ]);
      } else if (opcionSeleccionada === 'fechas') {
        const params = {
          padron,
          fechaInicio,
          fechaFin,
          txt: 'true',
        };
        txtData = await fetchPadronData(params);
      }

      if (excelData && excelData.length === 0) {
        setError('No existen altas entre las fechas seleccionadas.');
      } else if (excelData) {
        handleExcelDownload(excelData);
      }

      if (txtData && txtData.length === 0) {
        setError('No existen altas entre las fechas seleccionadas.');
      } else if (txtData) {
        handleTxtDownload(txtData);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      setError('Error al obtener los datos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setPadron('');
    setOpcionSeleccionada('');
    setFechaFin('');
    setFechaInicio('');
    setHastaHoy(false);
    setLoading(false);
    setError(''); // Limpiar el mensaje de error
  };

  const handleExcelDownload = (data) => {
    const workbook = new ExcelJS.Workbook();
    const nombreHoja = `Padrón ${padron}`;
    const nombreExcel = `Padrón ${padron}${
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
        theme: 'TableStyleMedium9',
        showRowStripes: true,
      },
      columns: Object.keys(data[0] || {}).map((key) => ({
        name: key,
        filterButton: true,
      })),
      rows: data.map((row) => Object.values(row)),
    });

    //Función para calcular el ancho de las columnas automaticamente
    //const AdjustColumnWidth = (worksheet) => {
    //worksheet.columns.forEach((column) => {
    //const lengths = column.values.map((v) => v.toString().length);
    //const maxLength = Math.max(...lengths.filter((v) => typeof v === 'number'));
    //column.width = maxLength + 1; // Adding some extra space for padding
    //});
    //};
    //AdjustColumnWidth(worksheet);

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        saveAs(new Blob([buffer]), `${nombreExcel}.xlsx`);
      })
      .catch((error) => {
        console.error('Error generating Excel file', error);
        setError('Error al generar el archivo Excel.'); // Mostrar error en pantalla
      });
  };

  const handleTxtDownload = (data) => {
    const nombreTxt = `Padrón ${padron}${
      opcionSeleccionada === 'fechas'
        ? ` Altas entre ${format(parseISO(fechaInicio), 'dd-MM-yy', {
            locale: arLocale,
          })} y ${format(parseISO(fechaFin), 'dd-MM-yy', { locale: arLocale })}`
        : ''
    }.txt`;

    const txtData = data.map((row) => Object.values(row).join('\t')).join('\n');
    const blob = new Blob([txtData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, nombreTxt);
  };

  return (
    <section className="max-w-md mx-auto mt-5 p-6 border rounded-lg shadow-lg bg-white">
      <h3 className="text-2xl font-bold mb-3 text-center underline text-gray-700">
        Padrones
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="block mb-2 bg-blue-200 p-2 rounded-md">
          <select
            value={padron}
            onChange={(e) => setPadron(e.target.value)}
            className="w-full p-2 border text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona un Padrón</option>
            <option value="ATSAPRA">ATSAPRA</option>
            <option value="CONSUMAS">Consumas</option>
            <option value="RAMA PLUS">RAMA PLUS</option>
            <option value="MPHG">MPHG</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 italic text-gray-600">Opción de Descarga:</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="total"
                checked={opcionSeleccionada === 'total'}
                onChange={() => setOpcionSeleccionada('total')}
                className="mr-1 focus:ring-blue-500"
              />
              Padrón Total
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="fechas"
                checked={opcionSeleccionada === 'fechas'}
                onChange={() => setOpcionSeleccionada('fechas')}
                className="mr-1 focus:ring-blue-500"
              />
              Altas entre Fechas
            </label>
          </div>
        </div>
        {opcionSeleccionada === 'fechas' && (
          <>
            <div>
              <label className="block italic text-gray-600">
                Desde:
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                />
              </label>
            </div>
            <div>
              <label className="block mb-2 italic text-gray-600">
                Hasta:
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  disabled={hastaHoy}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                />
              </label>
              <label className="inline-flex items-center text-gray-600">
                <input
                  type="checkbox"
                  checked={hastaHoy}
                  onChange={() => setHastaHoy(!hastaHoy)}
                  className="mr-2 focus:ring-blue-500"
                />
                Hasta hoy
              </label>
            </div>
          </>
        )}
        {error && (
          <div className="text-red-500 italic bg-red-100 p-1 rounded-md text-center">
            {error}
          </div>
        )}
        <div className="flex gap-5 justify-center items-center">
          <button
            type="submit"
            className={`w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-200 ${
              !padron ||
              !opcionSeleccionada ||
              loading ||
              (opcionSeleccionada === 'fechas' && (!fechaInicio || !fechaFin))
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            disabled={
              !padron ||
              !opcionSeleccionada ||
              loading ||
              (opcionSeleccionada === 'fechas' && (!fechaInicio || !fechaFin))
            }
          >
            {loading ? 'DESCARGANDO...' : 'DESCARGAR'}
          </button>
          <button
            type="button"
            className="w-full p-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded-md transition duration-200"
            onClick={handleReset}
          >
            NUEVA CONSULTA
          </button>
        </div>
      </form>
    </section>
  );
};

export default Padron;
