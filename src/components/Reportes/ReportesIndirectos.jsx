import React from 'react';

const ReportesIndirectos = () => {
  const informes = [
    {
      title: 'Stock/Ventas',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiM2U4MzMxMDYtMTIyZi00NjI1LWEzNmItOGZjOTY3MzU0MmQ1IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Cobranza Mes',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiOTg1YTFhYzEtZWYwOS00YjBmLWFjZDEtNTRkYWE5NmFjOTM4IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Período ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYjQ4ZTY0ZWItYmU3ZC00M2YyLWEzMjMtOWJjNmQ2MDhhNjlhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'Ratios ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiNWZmNjA2ZjQtYWE0NC00YTA4LWJlODAtN2U2YmJjODcwOWM2IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
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
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {informes.map((informe, index) => (
        <div key={index} className="mb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white border-2 border-black font-bold font-libre p-2  rounded-md w-96"
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
