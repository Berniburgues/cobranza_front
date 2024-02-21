import { React, useState, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useReactToPrint } from 'react-to-print';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import esLocale from 'date-fns/locale/es';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

const locales = {
  es: esLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

//Función para excluir feriados
const isFeriado = (date) => {
  // Excluye las fechas feriadas
  return (
    (date.getDate() === 24 && date.getMonth() === 2) || //24 de marzo
    (date.getDate() === 28 && date.getMonth() === 2) || // 28 de marzo
    (date.getDate() === 29 && date.getMonth() === 2) || // 29 de marzo
    (date.getDate() === 1 && date.getMonth() === 3) || // 1 de abril
    (date.getDate() === 2 && date.getMonth() === 3) // 2 de abril
  );
};

// Estilos para resaltar los feriados
const dayStyleGetter = (date) => {
  if (isFeriado(date)) {
    return {
      className: 'bg-red-400',
    };
  }
  return {};
};

const generateEvents = () => {
  const envios = [
    {
      title: 'Envío 014 (0-3) MES',
      start: new Date(2024, 1, 26, 10, 0),
      end: new Date(2024, 1, 26, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 014 (4-9) MES',
      start: new Date(2024, 1, 27, 10, 0),
      end: new Date(2024, 1, 27, 10, 0),
      type: 'envio',
    },
    {
      title: 'OBMES.E',
      start: new Date(2024, 1, 26, 10, 0),
      end: new Date(2024, 1, 26, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MES',
    },
    {
      title: 'OBMES.E',
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MES',
    },
    {
      title: 'OBMES.E',
      start: new Date(2024, 2, 8, 10, 0),
      end: new Date(2024, 2, 8, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MES',
    },
    {
      title: 'OBMESE.E',
      start: new Date(2024, 2, 14, 10, 0),
      end: new Date(2024, 2, 14, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MES',
    },
    {
      title: 'OBMORA.E',
      start: new Date(2024, 1, 27, 10, 0),
      end: new Date(2024, 1, 27, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MORA',
    },
    {
      title: 'OBMORA.E',
      start: new Date(2024, 2, 5, 10, 0),
      end: new Date(2024, 2, 5, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MORA',
    },
    {
      title: 'OBMORA.E',
      start: new Date(2024, 2, 11, 10, 0),
      end: new Date(2024, 2, 11, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MORA',
    },
    {
      title: 'OBMORA.E',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 10, 0),
      type: 'envio',
      customToolTip: 'Enviado 027 MORA',
    },
  ];

  const impactos = [
    {
      title: 'OBMES.I',
      start: new Date(2024, 1, 29, 10, 0),
      end: new Date(2024, 1, 29, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MES',
    },
    {
      title: 'OBMES.I',
      start: new Date(2024, 2, 6, 10, 0),
      end: new Date(2024, 2, 6, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MES',
    },
    {
      title: 'OBMES.I',
      start: new Date(2024, 2, 12, 10, 0),
      end: new Date(2024, 2, 12, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MES',
    },
    {
      title: 'OBMES.I',
      start: new Date(2024, 2, 18, 10, 0),
      end: new Date(2024, 2, 18, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MES',
    },
    {
      title: 'OBMORA.I',
      start: new Date(2024, 2, 1, 10, 0),
      end: new Date(2024, 2, 1, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MORA',
    },
    {
      title: 'OBMORA.I',
      start: new Date(2024, 2, 7, 10, 0),
      end: new Date(2024, 2, 7, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MORA',
    },
    {
      title: 'OBMORA.I',
      start: new Date(2024, 2, 13, 10, 0),
      end: new Date(2024, 2, 13, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MORA',
    },
    {
      title: 'OBMORA.I',
      start: new Date(2024, 2, 19, 10, 0),
      end: new Date(2024, 2, 19, 10, 0),
      type: 'impacto',
      customToolTip: 'Impacto 027 MORA',
    },
  ];

  const acreditaciones = [
    {
      title: 'OBMES.A',
      start: new Date(2024, 2, 1, 10, 0),
      end: new Date(2024, 2, 1, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MES',
    },
    {
      title: 'OBMES.A',
      start: new Date(2024, 2, 7, 10, 0),
      end: new Date(2024, 2, 7, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MES',
    },
    {
      title: 'OBMES.A',
      start: new Date(2024, 2, 13, 10, 0),
      end: new Date(2024, 2, 13, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MES',
    },
    {
      title: 'OBMES.A',
      start: new Date(2024, 2, 19, 10, 0),
      end: new Date(2024, 2, 19, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MES',
    },
    {
      title: 'OBMORA.A',
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MORA',
    },
    {
      title: 'OBMORA.A',
      start: new Date(2024, 2, 8, 10, 0),
      end: new Date(2024, 2, 8, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MORA',
    },
    {
      title: 'OBMORA.A',
      start: new Date(2024, 2, 14, 10, 0),
      end: new Date(2024, 2, 14, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MORA',
    },
    {
      title: 'OBMORA.A',
      start: new Date(2024, 2, 20, 10, 0),
      end: new Date(2024, 2, 20, 10, 0),
      type: 'acreditacion',
      customToolTip: 'Acreditación 027 MORA',
    },
  ];

  const novedades = [
    {
      title: 'OBMES.N',
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MES',
    },
    {
      title: 'OBMES.N',
      start: new Date(2024, 2, 8, 10, 0),
      end: new Date(2024, 2, 8, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MES',
    },
    {
      title: 'OBMES.N',
      start: new Date(2024, 2, 14, 10, 0),
      end: new Date(2024, 2, 14, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MES',
    },
    {
      title: 'OBMES.N',
      start: new Date(2024, 2, 20, 10, 0),
      end: new Date(2024, 2, 20, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MES',
    },
    {
      title: 'OBMORA.N',
      start: new Date(2024, 2, 5, 10, 0),
      end: new Date(2024, 2, 5, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MORA',
    },
    {
      title: 'OBMORA.N',
      start: new Date(2024, 2, 11, 10, 0),
      end: new Date(2024, 2, 11, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MORA',
    },
    {
      title: 'OBMORA.N',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MORA',
    },
    {
      title: 'OBMORA.N',
      start: new Date(2024, 2, 21, 10, 0),
      end: new Date(2024, 2, 21, 10, 0),
      type: 'novedad',
      customToolTip: 'Novedad 027 MORA',
    },
  ];

  const events = [...envios, ...impactos, ...acreditaciones, ...novedades];

  return events;
};

//Filtros para los dias de fines de semana y meses
const Calendario = () => {
  const [filterByMonth, setFilterByMonth] = useState(true);
  const [filterByMora, setFilterByMora] = useState(true);

  const [selectedEventTypes, setSelectedEventTypes] = useState([
    'envio',
    'acreditacion',
    'impacto',
    'novedad',
  ]);

  const [filtersVisible, setFiltersVisible] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const toggleFiltersVisibility = () => {
    setFiltersVisible((prevVisibility) => !prevVisibility);
  };

  const events = generateEvents().filter((event) => {
    const dayOfWeek = event.start.getDay();
    const eventMonth = event.start.getMonth();
    const eventNameIncludesFilter =
      (filterByMora && event.title.toLowerCase().includes('mora')) ||
      (filterByMonth && event.title.toLowerCase().includes('mes'));

    return (
      dayOfWeek >= 1 &&
      dayOfWeek <= 5 &&
      (eventMonth === 1 || eventMonth === 2) &&
      (selectedEventTypes.length === 0 || selectedEventTypes.includes(event.type)) &&
      (eventNameIncludesFilter || !filtersVisible)
    );
  });

  const handleEventTypeChange = (event) => {
    const { value } = event.target;

    setSelectedEventTypes((prevSelectedEventTypes) => {
      if (prevSelectedEventTypes.includes(value)) {
        // Si ya está seleccionado, quitarlo de la lista
        return prevSelectedEventTypes.filter((type) => type !== value);
      } else {
        // Si no está seleccionado, agregarlo a la lista
        return [...prevSelectedEventTypes, value];
      }
    });
  };
  // Estilos para cada tipo de evento
  const eventStyleGetter = (event) => {
    const commonStyles = 'rounded-full text-xs w-3/4 text-center mx-auto text-center';

    const baseStyles = (color) => ({
      className: `${color} ${commonStyles}`,
    });

    if (event.title.toLowerCase().includes('mes')) {
      //Estilos para eventos "mes"
      if (event.type === 'envio') {
        return baseStyles('bg-blue-500');
      } else if (event.type === 'impacto') {
        return baseStyles('bg-yellow-500');
      } else if (event.type === 'acreditacion') {
        return baseStyles('bg-green-500');
      } else if (event.type === 'novedad') {
        return baseStyles('bg-orange-500');
      }
    } else if (event.title.toLowerCase().includes('mora')) {
      // Estilos para eventos "mora"
      if (event.type === 'envio') {
        return baseStyles('bg-blue-700');
      } else if (event.type === 'impacto') {
        return baseStyles('bg-yellow-700');
      } else if (event.type === 'acreditacion') {
        return baseStyles('bg-green-700');
      } else if (event.type === 'novedad') {
        return baseStyles('bg-orange-700');
      }
    }

    // Default styles para tipos de eventos desconocidos
    return {};
  };

  return (
    <section className="flex flex-col items-center capitalize">
      <h2 className="text-center font-bold underline uppercase text-xl mt-4">
        Calendario de Envíos
      </h2>
      <div className="mt-1 bg-gray-100 rounded-lg p-1 w-auto shadow-md border">
        <div className="flex justify-center items-center text-center">
          <button
            className="text-blue-500 font-semibold italic hover:text-blue-600 underline"
            onClick={toggleFiltersVisibility}
          >
            {filtersVisible ? 'Ocultar Filtros' : 'Filtros'}
          </button>
        </div>
        <div className="flex flex-col items-center text-sm mt-1 w-full">
          {filtersVisible && (
            <>
              <div className="flex mb-1 w-full justify-center font-semibold">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="filterByMonth"
                    checked={filterByMonth}
                    onChange={() => setFilterByMonth(!filterByMonth)}
                    className="form-checkbox"
                  />
                  <span className="ml-1">Mes</span>
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="filterByMora"
                    checked={filterByMora}
                    onChange={() => setFilterByMora(!filterByMora)}
                    className="form-checkbox"
                  />
                  <span className="ml-1">Mora</span>
                </label>
              </div>

              <div className="flex justify-center w-full font-semibold">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="envio"
                    checked={selectedEventTypes.includes('envio')}
                    onChange={handleEventTypeChange}
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-1 text-blue-500">Envíos</span>
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="acreditacion"
                    checked={selectedEventTypes.includes('acreditacion')}
                    onChange={handleEventTypeChange}
                    className="form-checkbox text-green-500"
                  />
                  <span className="ml-1 text-green-500">Acreditaciones</span>
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="impacto"
                    checked={selectedEventTypes.includes('impacto')}
                    onChange={handleEventTypeChange}
                    className="form-checkbox text-yellow-500"
                  />
                  <span className="ml-1 text-yellow-500">Impactos</span>
                </label>
                <label className="flex items-center ml-4">
                  <input
                    type="checkbox"
                    value="novedad"
                    checked={selectedEventTypes.includes('novedad')}
                    onChange={handleEventTypeChange}
                    className="form-checkbox text-orange-500"
                  />
                  <span className="ml-1 text-orange-500">Novedades</span>
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      <Calendar
        ref={componentRef}
        className="rounded-lg shadow-lg py-2 mt-4"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayStyleGetter}
        tooltipAccessor="customToolTip"
        views={{ month: true, day: true, agenda: true }}
        culture="es"
        messages={{
          month: 'Mes',
          day: 'Día',
          today: 'Actual',
          previous: 'Anterior',
          next: 'Siguiente',
        }}
        style={{ height: 650, width: '100%' }}
        components={{
          month: {
            header: ({ label }) => (
              <div className="text-center">
                <h3 className="text-base uppercase font-semibold">{label}</h3>
              </div>
            ),
          },
        }}
      />
      <p className="bg-red-400 rounded-lg italic p-1 my-2 text-xs shadow-lg border">
        En rojo días Feriados
      </p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-semibold italic border border-black shadow-md p-1 rounded mb-2"
        onClick={handlePrint}
      >
        Exportar
      </button>
    </section>
  );
};

export default Calendario;
