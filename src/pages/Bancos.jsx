import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getBanco } from '../services/obtenerData';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { getNombrePeriodo } from '../utils/fechas';
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
      const diferencia = cobradoActual - cobradoAnterior;

      const porcentaje = ((diferencia / cobradoAnterior) * 100).toFixed(2);

      if (porcentaje > 0) {
        return (
          <span className="text-green-600 text-[0.7rem] italic">(+{porcentaje}%)</span>
        );
      } else if (porcentaje < 0) {
        return <span className="text-red-600 text-[0.7rem] italic">({porcentaje}%)</span>;
      } else if (isNaN(porcentaje)) {
        return <span className="text-gray-600 text-[0.7rem] italic">({'-'}%)</span>;
      } else {
        return (
          <span className="text-gray-600 text-[0.7rem] italic">({porcentaje}%)</span>
        );
      }
    }
    return '';
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
                <table className="w-full border-collapse border-b shadow-lg">
                  <thead className="bg-gray-100 border-t border-b">
                    <tr>
                      <th className="px-10 py-1 text-left text-sm font-semibold text-gray-600 uppercase">
                        Periodo
                      </th>
                      <th className="px-10 py-1 text-center text-sm font-semibold text-gray-600 uppercase">
                        Socios
                      </th>
                      <th className="px-10 py-1 text-center text-sm font-semibold text-gray-600 uppercase">
                        Adherentes
                      </th>
                      <th className="px-10 py-1  text-center text-sm font-semibold text-gray-600 uppercase">
                        Servicios
                      </th>
                      <th className="px-10 py-1  text-center text-sm font-semibold text-gray-600 uppercase">
                        Cobrado
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
                        <td className="px-10 whitespace-nowrap text-left uppercase text-sm">
                          {getNombrePeriodo(dato.Periodo)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle">
                          {dato.Socios} {calcularDiferenciaSocios(index)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle">
                          {dato.Adherentes} {calcularDiferenciaAdherentes(index)}
                        </td>

                        <td className="px-10 whitespace-nowrap align-middle">
                          {dato.Servicios} {calcularDiferenciaServicios(index)}
                        </td>
                        <td className="px-10 whitespace-nowrap align-middle">
                          {dato.Cobrado} {calcularDiferenciaPorcentajeCobrado(index)}
                        </td>
                      </tr>
                    ))}
                    {/* Fila adicional para mostrar la suma de lo cobrado en cada periodo */}
                    <tr className="border-t border-b bg-green-100">
                      <td className="px-10 py-1 text-left text-sm uppercase text-gray-600 font-semibold">
                        Total Cobrado (Julio 23 - Hoy)
                      </td>
                      <td className="px-10 py-1 text-center font-semibold"></td>
                      <td className="px-10 py-1 text-center font-semibold"></td>
                      <td className="px-10 py-1 text-center font-semibold"></td>
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
                    </tr>
                  </tbody>
                </table>

                <p className="text-center text-xs text-gray-500 mt-2 italic bg-yellow-100 p-1">
                  En Amarillo Período en Curso
                </p>
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
