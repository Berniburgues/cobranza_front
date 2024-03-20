import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { useReactToPrint } from 'react-to-print';
import {
  fetchDatosTarjeta,
  eliminarFilaTarjeta,
  eliminarTodasLasFilasTarjeta,
} from '../services/obtenerData';
import { XIcon, TrashIcon } from '@heroicons/react/solid';

const TablaSocios = () => {
  const [infoHome, setInfoHome] = useState([]);
  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);
  const tablaRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => tablaRef.current,
    documentTitle: `Recuento Socios y Servicios`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDatosTarjeta();
        setInfoHome(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  if (!infoHome.length) {
    return <h3 className="text-center italic text-xl mt-4">No existen Datos</h3>;
  }

  const handleToggleRow = (id) => {
    if (filasSeleccionadas.includes(id)) {
      setFilasSeleccionadas(filasSeleccionadas.filter((rowId) => rowId !== id));
    } else {
      setFilasSeleccionadas([...filasSeleccionadas, id]);
    }
  };

  console.log(filasSeleccionadas);

  const handleEliminarTodasLasFilas = async () => {
    const confirmarEliminacion = window.confirm(
      '¿Estás seguro de eliminar todas las filas?',
    );

    if (confirmarEliminacion) {
      try {
        await eliminarTodasLasFilasTarjeta();
        setInfoHome([]);
      } catch (error) {
        console.error('Error al eliminar todas las filas:', error);
      }
    }
  };
  const handleEliminarFila = async () => {
    const confirmarEliminacion = window.confirm('¿Estás seguro de eliminar estas filas?');

    if (confirmarEliminacion) {
      try {
        await Promise.all(
          filasSeleccionadas.map(async (id) => {
            await eliminarFilaTarjeta(id);
          }),
        );

        // Filtrar las filas eliminadas
        setInfoHome(infoHome.filter((fila) => !filasSeleccionadas.includes(fila.Id)));
      } catch (error) {
        console.error('Error al eliminar filas:', error);
      }
    }
  };

  const exportarAExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Socios y Servicios');

    // Definir las columnas
    const columns = [
      { header: 'FECHA', key: 'fecha' },
      { header: 'HORA', key: 'hora' },
      { header: 'ACTIVOS', key: 'sociosActivos' },
      { header: 'SUPERVIELLE', key: 'sociosSupervielle' },
      { header: 'OTROS BANCOS', key: 'sociosOtrosBancos' },
      { header: 'TARJETA', key: 'sociosTarjeta' },
      { header: 'ADHERENTES', key: 'Adherentes' },
      { header: 'SERVICIOS', key: 'Servicios' },
    ];

    // Agregar las columnas al archivo Excel
    sheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.key,
      width: col.header.length + 10, // Agregar un pequeño margen
    }));

    // Establecer el estilo de negrita para los encabezados
    sheet.getRow(1).font = { bold: true };

    // Agregar las filas al archivo Excel
    infoHome.forEach((fila, index) => {
      const prevFila = index > 0 ? infoHome[index - 1] : null; // Obtener la fila anterior
      const sociosActivosDiff = prevFila
        ? fila.sociosActivos - prevFila.sociosActivos
        : null;
      const sociosSupervielleDiff = prevFila
        ? fila.sociosSupervielle - prevFila.sociosSupervielle
        : null;
      const sociosOtrosBancosDiff = prevFila
        ? fila.sociosOtrosBancos - prevFila.sociosOtrosBancos
        : null;
      const sociosTarjetaDiff = prevFila
        ? fila.sociosTarjeta - prevFila.sociosTarjeta
        : null;
      const AdherentesDiff = prevFila ? fila.Adherentes - prevFila.Adherentes : null;
      const ServiciosDiff = prevFila ? fila.Servicios - prevFila.Servicios : null;

      // Dividir la fecha y hora
      const [fecha, hora] = fila.fechaActualizacion.split(/\s-\s/);

      sheet.addRow({
        fecha,
        hora,
        sociosActivos: `${fila.sociosActivos}${
          sociosActivosDiff
            ? ` (${sociosActivosDiff > 0 ? '+' : ''}${sociosActivosDiff})`
            : ''
        }`,
        sociosSupervielle: `${fila.sociosSupervielle}${
          sociosSupervielleDiff
            ? ` (${sociosSupervielleDiff > 0 ? '+' : ''}${sociosSupervielleDiff})`
            : ''
        }`,
        sociosOtrosBancos: `${fila.sociosOtrosBancos}${
          sociosOtrosBancosDiff
            ? ` (${sociosOtrosBancosDiff > 0 ? '+' : ''}${sociosOtrosBancosDiff})`
            : ''
        }`,
        sociosTarjeta: `${fila.sociosTarjeta}${
          sociosTarjetaDiff
            ? ` (${sociosTarjetaDiff > 0 ? '+' : ''}${sociosTarjetaDiff})`
            : ''
        }`,
        Adherentes: `${fila.Adherentes}${
          AdherentesDiff ? ` (${AdherentesDiff > 0 ? '+' : ''}${AdherentesDiff})` : ''
        }`,
        Servicios: `${fila.Servicios}${
          ServiciosDiff ? ` (${ServiciosDiff > 0 ? '+' : ''}${ServiciosDiff})` : ''
        }`,
      });
    });

    // Crear el archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'Recuento Socios y Servicios.xlsx');
  };

  return (
    <section className="mx-auto px-5">
      <h2 className="text-2xl font-bold text-center my-5">
        Cantidad de Socios y Servicios
      </h2>
      <div className="overflow-x-auto">
        <table
          className="table-auto w-full border-collapse border mx-auto border-gray-800"
          ref={tablaRef}
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-800 px-4 py-2">FECHA</th>
              <th className="border border-gray-800 px-4 py-2">HORA</th>
              <th className="border border-gray-800 px-4 py-2">ACTIVOS</th>
              <th className="border border-gray-800 px-4 py-2">SUPERVIELLE</th>
              <th className="border border-gray-800 px-4 py-2">OTROS BANCOS</th>
              <th className="border border-gray-800 px-4 py-2">TARJETA</th>
              <th className="border border-gray-800 px-4 py-2">ADHERENTES</th>
              <th className="border border-gray-800 px-4 py-2">SERVICIOS</th>
              <th className="border border-gray-800 px-4 py-2">SELECCIONAR</th>
            </tr>
          </thead>
          <tbody>
            {infoHome.map((fila, index) => {
              const prevFila = index > 0 ? infoHome[index - 1] : null;
              const isChecked = filasSeleccionadas.includes(fila.Id);
              const [fecha, hora] = fila.fechaActualizacion.split(' - ');
              return (
                <tr key={fila.Id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="border border-gray-800 px-4 py-2">{fecha}</td>
                  <td className="border border-gray-800 px-4 py-2">{hora}</td>
                  <td className={`border border-gray-800 px-4 py-2`}>
                    {fila.sociosActivos}
                    {prevFila && (
                      <span
                        className={`text-xs italic ${
                          fila.sociosActivos > prevFila.sociosActivos
                            ? 'text-green-600'
                            : fila.sociosActivos < prevFila.sociosActivos
                            ? 'text-red-500'
                            : 'text-blue-500'
                        }`}
                      >
                        {` (${
                          fila.sociosActivos - prevFila.sociosActivos > 0 ? '+' : ''
                        }${fila.sociosActivos - prevFila.sociosActivos})`}
                      </span>
                    )}
                  </td>
                  <td className={`border border-gray-800 px-4 py-2`}>
                    {fila.sociosSupervielle}
                    {prevFila && (
                      <span
                        className={`text-xs italic ml-1 ${
                          fila.sociosSupervielle > prevFila.sociosSupervielle
                            ? 'text-green-600'
                            : fila.sociosSupervielle < prevFila.sociosSupervielle
                            ? 'text-red-500'
                            : 'text-blue-500'
                        }`}
                      >
                        {` (${
                          fila.sociosSupervielle - prevFila.sociosSupervielle > 0
                            ? '+'
                            : ''
                        }${fila.sociosSupervielle - prevFila.sociosSupervielle})`}
                      </span>
                    )}
                  </td>
                  <td className={`border border-gray-800 px-4 py-2`}>
                    {fila.sociosOtrosBancos}
                    {prevFila && (
                      <span
                        className={`text-xs italic ml-1 ${
                          fila.sociosOtrosBancos > prevFila.sociosOtrosBancos
                            ? 'text-green-600'
                            : fila.sociosOtrosBancos < prevFila.sociosOtrosBancos
                            ? 'text-red-500'
                            : 'text-blue-500'
                        }`}
                      >
                        {` (${
                          fila.sociosOtrosBancos - prevFila.sociosOtrosBancos > 0
                            ? '+'
                            : ''
                        }${fila.sociosOtrosBancos - prevFila.sociosOtrosBancos})`}
                      </span>
                    )}
                  </td>
                  <td className={`border border-gray-800 px-4 py-2`}>
                    {fila.sociosTarjeta}
                    {prevFila && (
                      <span
                        className={`text-xs italic ml-1 ${
                          fila.sociosTarjeta > prevFila.sociosTarjeta
                            ? 'text-green-600'
                            : fila.sociosTarjeta < prevFila.sociosTarjeta
                            ? 'text-red-500'
                            : 'text-blue-500'
                        }`}
                      >
                        {`(${fila.sociosTarjeta - prevFila.sociosTarjeta > 0 ? '+' : ''}${
                          fila.sociosTarjeta - prevFila.sociosTarjeta
                        })`}
                      </span>
                    )}
                  </td>
                  <td className={`border border-gray-800 px-4 py-2`}>
                    {fila.Adherentes}
                    {prevFila && (
                      <span
                        className={`text-xs italic ml-1 ${
                          fila.Adherentes > prevFila.Adherentes
                            ? 'text-green-600'
                            : fila.Adherentes < prevFila.Adherentes
                            ? 'text-red-500'
                            : 'text-blue-500'
                        }`}
                      >
                        {`(${fila.Adherentes - prevFila.Adherentes > 0 ? '+' : ''}${
                          fila.Adherentes - prevFila.Adherentes
                        })`}
                      </span>
                    )}
                  </td>
                  <td className={`border border-gray-800 px-4 py-2`}>
                    {fila.Servicios}
                    {prevFila && (
                      <span
                        className={`text-xs italic ml-1 ${
                          fila.Servicios > prevFila.Servicios
                            ? 'text-green-600'
                            : fila.Servicios < prevFila.Servicios
                            ? 'text-red-500'
                            : 'text-blue-500'
                        }`}
                      >
                        {`(${fila.Servicios - prevFila.Servicios > 0 ? '+' : ''}${
                          fila.Servicios - prevFila.Servicios
                        })`}
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-800 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleRow(fila.Id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col items-center my-2">
          <div className="flex gap-5">
            <button
              className="flex items-center space-x-2 w-full bg-black p-1 rounded text-red-500 hover:text-red-700 cursor-pointer"
              onClick={handleEliminarTodasLasFilas}
            >
              <TrashIcon className="h-5 w-5" />
              <span>Eliminar Todo</span>
            </button>
            <button
              className="flex items-center space-x-2  w-full bg-black p-1 rounded text-red-500 hover:text-red-700 cursor-pointer"
              onClick={handleEliminarFila}
            >
              <XIcon className="h-5 w-5" />
              <span>Seleccionados</span>
            </button>
          </div>
          <div className="flex gap-5 mt-3">
            <button
              className="text-center border italic border-black font-semibold hover:bg-green-600 bg-green-500 text-white p-1 rounded shadow-md"
              onClick={exportarAExcel}
            >
              <span>Exportar a Excel</span>
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold italic border border-black shadow-md p-1 rounded"
              onClick={handlePrint}
            >
              Exportar a PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TablaSocios;
