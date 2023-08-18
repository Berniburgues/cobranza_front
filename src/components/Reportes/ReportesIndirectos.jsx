import React from 'react';

const ReportesIndirectos = () => {
  const informes = [
    {
      title: 'Período ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYjQ4ZTY0ZWItYmU3ZC00M2YyLWEzMjMtOWJjNmQ2MDhhNjlhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
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
      title: 'Cobranza Mes',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMTM3ZmExNGMtYzA2ZS00OGQxLTljZGUtYmM2NWI2NWUyM2RlIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {informes.map((informe, index) => (
        <div key={index} className="mb-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold font-mono p-2 italic rounded-md w-96"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReportesIndirectos;
