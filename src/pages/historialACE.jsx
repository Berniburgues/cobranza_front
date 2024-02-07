import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { fetchHistorialDNI, fetchFiltrosDNI } from '../services/obtenerData';
import HistorialDNITable from '../components/Historial DNI/HistorialDNITable';
import { determinarBancoPorCBU } from '../utils/determinarBancoPorCbu';
import { getNombrePeriodo } from '../utils/fechas';
import FiltroLoader from '../components/Historial DNI/FiltroLoader';
import { Link } from 'react-router-dom';

const HistorialDNI = () => {
  const terminacionDniRef = useRef(null);
  const [banco, setBanco] = useState(null);
  const [periodo, setPeriodo] = useState('');
  const [dniComienzaCon, setDniComienzaCon] = useState('');
  const [terminacionDni, setTerminacionDni] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);
  const [filtrosData, setFiltrosData] = useState([]);
  const [isLoadingFiltros, setIsLoadingFiltros] = useState(true);
  const [diasConMasAce, setDiasConMasAce] = useState([]);
  const [totalSocios, setTotalSocios] = useState('');
  const [busqueda, setBusqueda] = useState(false);
  const [mostrarCheckboxes, setMostrarCheckboxes] = useState(false);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const filtrosData = await fetchFiltrosDNI();
        setFiltrosData(filtrosData);
        setIsLoadingFiltros(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        terminacionDniRef.current &&
        !terminacionDniRef.current.contains(event.target)
      ) {
        // Verificar que el clic no ocurra dentro de los checkboxes antes de cerrar
        const checkboxesContainer = document.getElementById('checkboxesContainer');
        if (checkboxesContainer && checkboxesContainer.contains(event.target)) {
          return;
        }

        setMostrarCheckboxes(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const findMostFrequentDaysForACE = (historialData) => {
    const daysByPeriod = {};

    historialData.forEach((socio) => {
      const payments = socio.Pagos || {};

      for (const date in payments) {
        const day = payments[date].reduce((acc, payment) => {
          if (
            payment.Codigo === 'ACE' ||
            payment.Codigo === 'ACE-R10' ||
            payment.Codigo === 'R10-ACE'
          ) {
            acc.push({ day: payment.dia, period: date }); // Guardar el día y el periodo
          }
          return acc;
        }, []);

        day.forEach(({ day, period }) => {
          if (!daysByPeriod[period]) {
            daysByPeriod[period] = {};
          }

          daysByPeriod[period][day] = (daysByPeriod[period][day] || 0) + 1;
        });
      }
    });

    const daysWithMaxACEByPeriod = {};

    for (const period in daysByPeriod) {
      const dayCount = daysByPeriod[period];
      const sortedDays = Object.keys(dayCount).sort((a, b) => dayCount[b] - dayCount[a]);
      const mostFrequentDays = sortedDays.slice(0, 3);

      daysWithMaxACEByPeriod[period] = mostFrequentDays.map((day) => ({
        day,
        aceCount: dayCount[day],
      }));
    }

    return daysWithMaxACEByPeriod;
  };

  const handleBuscarClick = async () => {
    if (!banco) {
      setErrorMessage('Seleccione un banco');
      return;
    }

    if (!periodo || (Array.isArray(periodo) && periodo.length === 0)) {
      setErrorMessage('Seleccione al menos un Período');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const selectedPeriodos = periodo.includes('todos')
        ? filtrosData.data.periodos.map((p) => p.value)
        : periodo.map((p) => p.value);

      const historialData = await fetchHistorialDNI(
        banco.value,
        selectedPeriodos,
        dniComienzaCon,
        terminacionDni,
      );

      if (historialData) {
        // Actualizar la cantidad total de socios sin filtros
        setTotalSocios(historialData.totalSocios);

        setData(historialData);
        // Encontrar el día promedio con más códigos 'ACE'
        const mostFrequentDaysForACEByPeriod = findMostFrequentDaysForACE(
          historialData.data,
        );
        setDiasConMasAce(mostFrequentDaysForACEByPeriod);
        setBusqueda(true);
        setMostrarCheckboxes(false);
      } else {
        setData([]);
        setMostrarCheckboxes(false);
        setErrorMessage(
          'No se encontraron datos para el Banco, período y DNI proporcionados',
        );
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      setErrorMessage('Error al cargar los datos en el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetClick = () => {
    // Función para reiniciar la tabla
    setBanco(null);
    setPeriodo(''); // Restablecer a 'todos'
    setData([]);
    setErrorMessage(null);
    setDniComienzaCon('');
    setTerminacionDni([]);
    setDiasConMasAce([]);
    setTotalSocios('');
    setBusqueda(false);
    setMostrarCheckboxes(false);
  };

  const handleCheckboxChange = (value) => {
    const updatedTerminacionDni = terminacionDni.includes(value)
      ? terminacionDni.filter((v) => v !== value)
      : [...terminacionDni, value];

    setTerminacionDni(updatedTerminacionDni);
  };

  return (
    <section className="flex flex-col items-center justify-center mt-2">
      {isLoadingFiltros ? (
        <FiltroLoader loading={isLoadingFiltros} />
      ) : (
        <div className="mb-2 flex flex-wrap gap-2">
          <div className="w-40 text-xs">
            <Select
              value={banco}
              onChange={(selectedOption) => setBanco(selectedOption)}
              options={[
                // Primero, agregar las opciones con valor "011" y "014"
                {
                  value: '011',
                  label: determinarBancoPorCBU('011'), // Reemplaza 'determinarBancoPorCBU' con la función que obtiene el nombre del banco
                },
                {
                  value: '014',
                  label: determinarBancoPorCBU('014'),
                },
                // Luego, agregar las demás opciones
                ...filtrosData.data.bancos
                  .filter(
                    (banco) =>
                      banco !== '011' &&
                      banco !== '014' &&
                      banco !== '000' &&
                      determinarBancoPorCBU(banco) !== 'Desconocido',
                  )
                  .map((banco) => ({
                    value: banco,
                    label: determinarBancoPorCBU(banco),
                  })),
              ]}
              isSearchable={false}
              placeholder="Banco"
            />
          </div>
          <div className="relative w-auto text-xs">
            <Select
              value={periodo}
              onChange={(selectedOptions) => setPeriodo(selectedOptions)}
              options={[
                { value: 'todos', label: 'Todos' },
                ...filtrosData.data.periodos.map((periodo) => ({
                  value: periodo,
                  label: getNombrePeriodo(periodo),
                })),
              ]}
              isMulti
              placeholder="Período(s)"
              className="max-h-40 min-w-[64px] "
            />
          </div>
          <div className="w-auto text-xs">
            <input
              type="number"
              placeholder="Comienzo DNI"
              value={dniComienzaCon}
              onChange={(e) => setDniComienzaCon(e.target.value)}
              className="border border-gray-300 rounded-[4px] p-1 h-[38px] w-20 hover:border-gray-400"
              title="Primeros dos dígitos del DNI"
              min="00"
              max="99"
            />
          </div>
          <div className="relative w-auto text-xs">
            <div
              ref={terminacionDniRef}
              onClick={() => setMostrarCheckboxes(!mostrarCheckboxes)}
              className="border cursor-default border-gray-300 rounded-[4px] px-1 flex items-center justify-between h-[38px] hover:border-gray-400"
            >
              <span className="text-gray-400">
                Terminación DNI
                <span className="cursor-pointer hover:text-gray-500 ml-1">&#9660;</span>
              </span>
            </div>

            {mostrarCheckboxes && (
              <div
                className="absolute mt-2 border border-black w-full px-2 rounded-md text-base z-10 bg-white"
                id="checkboxesContainer"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
                  <div key={value} className="flex items-center bg-white">
                    <input
                      type="checkbox"
                      id={`terminacionDni_${value}`}
                      value={value}
                      checked={terminacionDni.includes(value)}
                      onChange={() => handleCheckboxChange(value)}
                    />
                    <label htmlFor={`terminacionDni_${value}`}>{value}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleBuscarClick}
            className={`w-24 rounded-md justify-center bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
              isLoading || !banco ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isLoading || !banco}
          >
            {isLoading ? 'Cargando...' : 'Buscar'}
          </button>
          <button
            onClick={handleResetClick}
            className={`w-auto rounded-md justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-center text-sm border-2 border-black flex items-center ${
              isLoading || !banco ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isLoading || !banco}
          >
            Nueva Consulta
          </button>
        </div>
      )}
      <div>
        {errorMessage ? (
          <p className="italic font-semibold text-red-500">{errorMessage}</p>
        ) : (
          <>
            {busqueda && (
              <div className="text-center flex flex-col">
                <h3 className="font-bold text-2xl underline">
                  Banco:{' '}
                  <Link
                    to={`/tablas/bancos?banco=${banco.value}`}
                    target="_blank"
                    title="Buscar Datos del Banco"
                  >
                    <span className="hover:text-blue-400">
                      {banco && determinarBancoPorCBU(banco.value)}
                    </span>
                  </Link>
                </h3>
                <p className="underline">
                  Cantidad de Socios encontrados con los filtros establecidos:{' '}
                  <span className="font-semibold no-underline">
                    {data.count} de {totalSocios} (
                    {((data.count / totalSocios) * 100).toFixed(2)}%)
                  </span>
                </p>
                {Object.keys(diasConMasAce)
                  .sort((a, b) => new Date(a) - new Date(b)) // Ordenar los periodos
                  .map((periodo) => (
                    <p key={periodo} className="text-sm">
                      Días con más cobros en{' '}
                      <span className="italic font-semibold underline">
                        {getNombrePeriodo(periodo)}
                      </span>
                      :{' '}
                      <span className="font-semibold text-green-500 no-underline">
                        {diasConMasAce[periodo].map((dia) => (
                          <span key={dia.day}>
                            <span className="text-blue-500 font-bold">{`${dia.day}`}</span>{' '}
                            {`(${dia.aceCount} ACE)`}
                            {diasConMasAce[periodo].indexOf(dia) !==
                              diasConMasAce[periodo].length - 1 && ', '}
                          </span>
                        ))}
                      </span>
                    </p>
                  ))}
              </div>
            )}
            <HistorialDNITable data={data.data} banco={banco} />
          </>
        )}
      </div>
    </section>
  );
};

export default HistorialDNI;
