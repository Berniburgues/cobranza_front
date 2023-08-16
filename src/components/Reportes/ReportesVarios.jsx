import React from 'react';

const ReportesVarios = () => {
  const informes = [
    {
      title: 'Totales',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYjQ4ZTY0ZWItYmU3ZC00M2YyLWEzMjMtOWJjNmQ2MDhhNjlhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {informes.map((informe, index) => (
        <div key={index} className="mb-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 italic rounded-md w-96"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReportesVarios;
