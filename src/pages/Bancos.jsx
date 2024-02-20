import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBanco } from '../services/obtenerData';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { getNombrePeriodo } from '../utils/fechas';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import './TablaPagos.css';

const Bancos = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const banco = searchParams.get('banco');
  const [datosBanco, setDatosBanco] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await getBanco(banco);
        setDatosBanco(datos);
      } catch (error) {
        setError(error.message || 'Hubo un error al cargar los Datos.');
      }
    };

    fetchData();
  }, [banco]);

  const calcularDiferencia = (indice, actual, anterior) => {
    if (indice > 0) {
      const diferencia = actual - anterior;

      if (diferencia > 0) {
        return (
          <span className="text-green-600 text-[0.7rem] italic">(+{diferencia})</span>
        );
      } else if (diferencia < 0) {
        return <span className="text-red-600 text-[0.7rem] italic">({diferencia})</span>;
      } else {
        return <span className="text-gray-500 text-[0.7rem] italic">({diferencia})</span>;
      }
    }
    return '';
  };

  const calcularDiferenciaSocios = (indice) =>
    calcularDiferencia(
      indice,
      datosBanco[indice]?.Socios,
      datosBanco[indice - 1]?.Socios,
    );
  const calcularDiferenciaAdherentes = (indice) =>
    calcularDiferencia(
      indice,
      datosBanco[indice]?.Adherentes,
      datosBanco[indice - 1]?.Adherentes,
    );
  const calcularDiferenciaServicios = (indice) =>
    calcularDiferencia(
      indice,
      datosBanco[indice]?.Servicios,
      datosBanco[indice - 1]?.Servicios,
    );

  const calcularDiferenciaPorcentajeCobrado = (indice) => {
    if (indice > 0 && indice < datosBanco.length - 1) {
      const cobradoActual = parseFloat(
        datosBanco[indice].Cobrado.replace(/[^\d.-]/g, ''),
      );
      const cobradoAnterior = parseFloat(
        datosBanco[indice - 1].Cobrado.replace(/[^\d.-]/g, ''),
      );

      // Manejar el caso cuando el cobrado anterior es 0
      if (cobradoAnterior === 0) {
        if (cobradoActual > 0) {
          return (
            <span className="text-green-600 text-[0.7rem] italic">(+Infinity%)</span>
          );
        } else {
          return <span className="text-gray-600 text-[0.7rem] italic">(0%)</span>;
        }
      }

      const diferencia = cobradoActual - cobradoAnterior;

      const porcentaje = ((diferencia / cobradoAnterior) * 100).toFixed(2);

      if (porcentaje > 0) {
        return (
          <span className="text-green-600 text-[0.7rem] italic">(+{porcentaje}%)</span>
        );
      } else if (porcentaje < 0) {
        return <span className="text-red-600 text-[0.7rem] italic">({porcentaje}%)</span>;
      } else if (isNaN(porcentaje)) {
        return <span className="text-gray-600 text-[0.7rem] italic">(-%)</span>;
      } else {
        return (
          <span className="text-gray-600 text-[0.7rem] italic">({porcentaje}%)</span>
        );
      }
    }
    return '';
  };

  const exportarExcel = async () => {
    if (datosBanco) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(
        `Datos Banco ${determinarBancoPorCBU(banco)}`,
      );

      // Definir estilos para las celdas
      const headerStyle = {
        font: { bold: true },
        alignment: { vertical: 'middle', horizontal: 'center' },
      };

      const highlightedStyle = {
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } },
      };

      // Agregar encabezados de columna
      const columnHeaders = [
        'Periodo',
        'Socios',
        'Adherentes',
        'Servicios',
        'Cobrado',
        'Ratio',
      ];
      worksheet.addRow(columnHeaders).eachCell((cell) => (cell.style = headerStyle));

      // Agregar datos de la tabla
      datosBanco.forEach((dato) => {
        const row = worksheet.addRow([
          getNombrePeriodo(dato.Periodo),
          `${dato.Socios}`,
          `${dato.Adherentes}`,
          `${dato.Servicios}`,
          `${dato.Cobrado}`,
          `${dato.Ratio}%`,
        ]);

        if (dato === datosBanco[datosBanco.length - 1]) {
          row.eachCell((cell) => (cell.style = highlightedStyle)); // Estilo para el último período en curso
        }
      });

      // Crear el archivo Excel
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Descargar el archivo
      saveAs(blob, `Datos Banco ${determinarBancoPorCBU(banco)}.xlsx`);
    }
  };

  return (
    <section className="mx-auto my-2">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gray-200 p-1">
        Banco seleccionado: {determinarBancoPorCBU(banco)}
      </h2>

      {error ? (
        <p className="text-xl font-semibold text-red-600 text-center">Error: {error}</p>
      ) : (
        <>
          {datosBanco ? (
            datosBanco.length > 0 ? (
              <div className="flex flex-col items-center">
                <table className="w-full border border-collapse shadow-lg">
                  <thead className="bg-gray-100 border">
                    <tr>
                      <th className="px-10 py-1 text-left text-sm font-semibold text-gray-600 uppercase border-r">
                        Periodo
                      </th>
                      <th className="px-10 py-1 text-center text-sm font-semibold text-gray-600 uppercase border-r">
                        Socios
                      </th>
                      <th className="px-10 py-1 text-center text-sm font-semibold text-gray-600 uppercase border-r">
                        Adherentes
                      </th>
                      <th className="px-10 py-1 text-center text-sm font-semibold text-gray-600 uppercase border-r">
                        Servicios
                      </th>
                      <th className="px-10 py-1 text-center text-sm font-semibold text-gray-600 uppercase">
                        Cobrado
                      </th>
                      <th className="px-10 py-1 text-center text-sm font-semibold text-gray-600 uppercase">
                        Ratio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {datosBanco.map((dato, index) => (
                      <tr
                        key={dato.Periodo}
                        className={`border-t border-b ${
                          index === datosBanco.length - 1
                            ? 'bg-yellow-100 text-yellow-700'
                            : ''
                        }`}
                      >
                        <td className="px-10 whitespace-nowrap text-left uppercase text-sm border-r">
                          {getNombrePeriodo(dato.Periodo)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle border-r">
                          {dato.Socios} {calcularDiferenciaSocios(index)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle border-r">
                          {dato.Adherentes} {calcularDiferenciaAdherentes(index)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle border-r">
                          {dato.Servicios} {calcularDiferenciaServicios(index)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle border-r">
                          {dato.Cobrado} {calcularDiferenciaPorcentajeCobrado(index)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle">
                          {dato.Ratio}%
                        </td>
                      </tr>
                    ))}
                    {/* Fila adicional para mostrar la suma de lo cobrado en cada periodo */}
                    <tr className="border-t border-b bg-green-100">
                      <td className="px-10 py-1 text-left text-sm uppercase text-green-700 font-semibold">
                        Total Cobrado (Julio 23 - Hoy)
                      </td>
                      <td className="px-10 py-1 text-center font-semibold"></td>
                      <td className="px-10 py-1 text-center font-semibold"></td>
                      <td className="px-10 py-1 text-center font-semibold border-r"></td>
                      <td className="px-10 whitespace-nowrap align-middle italic font-semibold text-green-700">
                        {datosBanco
                          .reduce(
                            (total, dato) =>
                              total + parseFloat(dato.Cobrado.replace(/[^\d,-]/g, '')),
                            0,
                          )
                          .toLocaleString('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                          })}
                      </td>
                      <td className="px-10 whitespace-nowrap align-middle italic font-semibold text-green-700"></td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-center text-xs text-gray-500 mt-2 italic bg-yellow-100 p-1">
                  En Amarillo Período en Curso
                </p>
                <button
                  onClick={exportarExcel}
                  className="text-center border border-black hover:bg-green-600 bg-green-500 text-white p-1 rounded-md my-1"
                >
                  Exportar a Excel
                </button>
              </div>
            ) : (
              <p className="text-xl font-semibold text-gray-700 text-center">
                No hay datos disponibles.
              </p>
            )
          ) : (
            <p className="text-xl font-semibold text-gray-700 text-center boton_parpadeo">
              Cargando...
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default Bancos;
