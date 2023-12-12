import React from 'react';

const ReportesIndirectos = () => {
  const informesVarios = [
    {
      title: 'VENTAS',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYTZiODA4ZDQtNGVmNy00MGNjLTlmZTctOTA5MzE5NzI2YmFkIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Stock/Ventas',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZjAxNzZiZDYtZDA2ZC00MGE2LWFiMjQtY2JlOWQ5NGFlZTA0IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Reclamos',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZWYxOTk0ZmUtNDg4OC00ZmE3LWI3NjYtZmRiMThhNDhjZGYwIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Llamadas Isla de Retención',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYjI5OGI1YWMtYTFhNS00OGM4LWJmM2ItMGE5NDkwZWJmMGY0IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Dr. En Vivo',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZGI4NDEwNjktYjNiYi00OGJlLTgwNmYtZGMwMjc3ODIyZjJmIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
  ];
  const informesPeriodos = [
    {
      title: 'Período ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYjQ4ZTY0ZWItYmU3ZC00M2YyLWEzMjMtOWJjNmQ2MDhhNjlhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9&pageName=ReportSectionf06324290e1bb7bd427b',
    },
    {
      title: 'Período ASISTIR',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZmJlYjRkODQtNWNjYS00YTAyLWJmNWMtMTIzN2YzMDkyNWY1IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Período LA UNIÓN',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiOGRhMjljOTctYWYwMC00YWVlLTkxMjItYzIyZTliMjkzYWVhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Período GARRAHAN',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiNzIxNDZiMDQtZjhkNi00MjQzLTk3ZWMtODkxYzUxMDk1MjdhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
  ];
  const informesEvolucion = [
    {
      title: 'Evolución Cobranza por Mes',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiNzUwMTAwYWItOTZkOS00M2E1LWFiMTQtNzk0NWUxMmRjMzExIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Cobranza Mes',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYzA2NzMyMWYtNGE5NC00MDA2LWFhYjEtYzRiNDYyNjhjYmQ4IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Importes Enviados',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMDI2OTc4M2YtYmQzZC00NDE0LTkzNmUtYWY0NzMyNGM3MDEzIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Cobranza MES ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMjM1OTIyZDMtNDllZC00Y2M0LWFlOTEtN2I3OWI1OTlkYjg4IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Evolución Cobranza ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYTM2M2MyZGUtMzIwYi00MTJjLTkwMGUtZWM0Y2E3M2RmNzEyIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-5">
      <ul className="flex flex-col">
        {informesPeriodos.map((informe, index) => (
          <li key={index} className="mb-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
              onClick={() => window.open(informe.url, '_blank')}
            >
              {informe.title}
            </button>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col">
        {informesVarios.map((informe, index) => (
          <li key={index} className="mb-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
              onClick={() => window.open(informe.url, '_blank')}
            >
              {informe.title}
            </button>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col">
        {informesEvolucion.map((informe, index) => (
          <li key={index} className="mb-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
              onClick={() => window.open(informe.url, '_blank')}
            >
              {informe.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportesIndirectos;
