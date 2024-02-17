import { React, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
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
      title: 'Envío 027 MES',
      start: new Date(2024, 1, 26, 10, 0),
      end: new Date(2024, 1, 26, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 027 MES',
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 027 MES',
      start: new Date(2024, 2, 8, 10, 0),
      end: new Date(2024, 2, 8, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 027 MES',
      start: new Date(2024, 2, 14, 10, 0),
      end: new Date(2024, 2, 14, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 027 MORA',
      start: new Date(2024, 1, 27, 10, 0),
      end: new Date(2024, 1, 27, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 027 MORA',
      start: new Date(2024, 2, 5, 10, 0),
      end: new Date(2024, 2, 5, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 027 MORA',
      start: new Date(2024, 2, 11, 10, 0),
      end: new Date(2024, 2, 11, 10, 0),
      type: 'envio',
    },
    {
      title: 'Envío 027 MORA',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 10, 0),
      type: 'envio',
    },
  ];

  const impactos = [
    {
      title: 'Impacto 027 MES',
      start: new Date(2024, 1, 29, 10, 0),
      end: new Date(2024, 1, 29, 10, 0),
      type: 'impacto',
    },
    {
      title: 'Impacto 027 MES',
      start: new Date(2024, 2, 6, 10, 0),
      end: new Date(2024, 2, 6, 10, 0),
      type: 'impacto',
    },
    {
      title: 'Impacto 027 MES',
      start: new Date(2024, 2, 12, 10, 0),
      end: new Date(2024, 2, 12, 10, 0),
      type: 'impacto',
    },
    {
      title: 'Impacto 027 MES',
      start: new Date(2024, 2, 18, 10, 0),
      end: new Date(2024, 2, 18, 10, 0),
      type: 'impacto',
    },
    {
      title: 'Impacto 027 MORA',
      start: new Date(2024, 2, 1, 10, 0),
      end: new Date(2024, 2, 1, 10, 0),
      type: 'impacto',
    },
    {
      title: 'Impacto 027 MORA',
      start: new Date(2024, 2, 7, 10, 0),
      end: new Date(2024, 2, 7, 10, 0),
      type: 'impacto',
    },
    {
      title: 'Impacto 027 MORA',
      start: new Date(2024, 2, 13, 10, 0),
      end: new Date(2024, 2, 13, 10, 0),
      type: 'impacto',
    },
    {
      title: 'Impacto 027 MORA',
      start: new Date(2024, 2, 19, 10, 0),
      end: new Date(2024, 2, 19, 10, 0),
      type: 'impacto',
    },
  ];

  const acreditaciones = [
    {
      title: 'Acred. 027 MES',
      start: new Date(2024, 2, 1, 10, 0),
      end: new Date(2024, 2, 1, 10, 0),
      type: 'acreditacion',
    },
    {
      title: 'Acred. 027 MES',
      start: new Date(2024, 2, 7, 10, 0),
      end: new Date(2024, 2, 7, 10, 0),
      type: 'acreditacion',
    },
    {
      title: 'Acred. 027 MES',
      start: new Date(2024, 2, 13, 10, 0),
      end: new Date(2024, 2, 13, 10, 0),
      type: 'acreditacion',
    },
    {
      title: 'Acred. 027 MES',
      start: new Date(2024, 2, 19, 10, 0),
      end: new Date(2024, 2, 19, 10, 0),
      type: 'acreditacion',
    },
    {
      title: 'Acred. 027 MORA',
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 10, 0),
      type: 'acreditacion',
    },
    {
      title: 'Acred. 027 MORA',
      start: new Date(2024, 2, 8, 10, 0),
      end: new Date(2024, 2, 8, 10, 0),
      type: 'acreditacion',
    },
    {
      title: 'Acred. 027 MORA',
      start: new Date(2024, 2, 14, 10, 0),
      end: new Date(2024, 2, 14, 10, 0),
      type: 'acreditacion',
    },
    {
      title: 'Acred. 027 MORA',
      start: new Date(2024, 2, 20, 10, 0),
      end: new Date(2024, 2, 20, 10, 0),
      type: 'acreditacion',
    },
  ];

  const novedades = [
    {
      title: 'Novedad 027 MES',
      start: new Date(2024, 2, 4, 10, 0),
      end: new Date(2024, 2, 4, 10, 0),
      type: 'novedad',
    },
    {
      title: 'Novedad 027 MES',
      start: new Date(2024, 2, 8, 10, 0),
      end: new Date(2024, 2, 8, 10, 0),
      type: 'novedad',
    },
    {
      title: 'Novedad 027 MES',
      start: new Date(2024, 2, 14, 10, 0),
      end: new Date(2024, 2, 14, 10, 0),
      type: 'novedad',
    },
    {
      title: 'Novedad 027 MES',
      start: new Date(2024, 2, 20, 10, 0),
      end: new Date(2024, 2, 20, 10, 0),
      type: 'novedad',
    },
    {
      title: 'Noved. 027 MORA',
      start: new Date(2024, 2, 5, 10, 0),
      end: new Date(2024, 2, 5, 10, 0),
      type: 'novedad',
    },
    {
      title: 'Noved. 027 MORA',
      start: new Date(2024, 2, 11, 10, 0),
      end: new Date(2024, 2, 11, 10, 0),
      type: 'novedad',
    },
    {
      title: 'Noved. 027 MORA',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 10, 0),
      type: 'novedad',
    },
    {
      title: 'Noved. 027 MORA',
      start: new Date(2024, 2, 21, 10, 0),
      end: new Date(2024, 2, 21, 10, 0),
      type: 'novedad',
    },
  ];

  const events = [...envios, ...impactos, ...acreditaciones, ...novedades];

  return events;
};

//Filtros para los dias de fines de semana y meses
const Calendario = (props) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState([
    'envio',
    'acreditacion',
    'impacto',
    'novedad',
  ]);

  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFiltersVisibility = () => {
    setFiltersVisible((prevVisibility) => !prevVisibility);
  };

  const events = generateEvents()
    .filter((event) => {
      const dayOfWeek = event.start.getDay();
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    })
    .filter((event) => {
      const eventMonth = event.start.getMonth();
      return eventMonth === 1 || eventMonth === 2;
    })
    .filter((event) => {
      // Aplicar filtro según los tipos seleccionados por el usuario
      return selectedEventTypes.length === 0 || selectedEventTypes.includes(event.type);
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
  //Estilos para cada tipo de evento
  const eventStyleGetter = (event) => {
    if (event.type === 'envio') {
      return {
        className:
          'bg-blue-500 rounded-full text-xs w-3/4 text-center mx-auto text-center',
      };
    } else if (event.type === 'impacto') {
      return {
        className:
          'bg-yellow-500 rounded-full text-xs w-3/4 text-center mx-auto text-center',
      };
    } else if (event.type === 'acreditacion') {
      return {
        className:
          'bg-green-500 rounded-full text-xs w-3/4 text-center mx-auto text-center',
      };
    } else if (event.type === 'novedad') {
      return {
        className:
          'bg-orange-500 rounded-full text-xs w-3/4 text-center mx-auto text-center',
      };
    }
    return {};
  };

  return (
    <section className="flex flex-col justify-center items-center capitalize">
      <h2 className="text-center font-bold underline uppercase text-xl">
        Calendario de Envíos
      </h2>
      <div className="my-1 bg-gray-100 rounded-lg p-1">
        <div className="flex justify-between items-center">
          <button
            className="text-blue-500 font-semibold italic"
            onClick={toggleFiltersVisibility}
          >
            {filtersVisible ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>
        {filtersVisible && (
          <div className="flex flex-col text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="envio"
                checked={selectedEventTypes.includes('envio')}
                onChange={handleEventTypeChange}
                className="form-checkbox text-blue-500"
              />
              <span className="ml-2 text-blue-500">Envíos</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="acreditacion"
                checked={selectedEventTypes.includes('acreditacion')}
                onChange={handleEventTypeChange}
                className="form-checkbox text-green-500"
              />
              <span className="ml-2 text-green-500">Acreditaciones</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="impacto"
                checked={selectedEventTypes.includes('impacto')}
                onChange={handleEventTypeChange}
                className="form-checkbox text-yellow-500"
              />
              <span className="ml-2 text-yellow-500">Impactos</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="novedad"
                checked={selectedEventTypes.includes('novedad')}
                onChange={handleEventTypeChange}
                className="form-checkbox text-orange-500"
              />
              <span className="ml-2 text-orange-500">Novedades</span>
            </label>
          </div>
        )}
      </div>

      <Calendar
        className="rounded-lg shadow-lg py-2"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        dayPropGetter={dayStyleGetter}
        views={{ month: true, day: true, agenda: true }}
        culture="es"
        messages={{
          month: 'Mes',
          day: 'Día',
          today: 'Actual',
          previous: 'Anterior',
          next: 'Siguiente',
        }}
        style={{ height: 650, width: 1100 }}
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
      <p className="bg-red-400 rounded-lg italic p-2 my-2 text-xs">
        En rojo días Feriados
      </p>
    </section>
  );
};

export default Calendario;
