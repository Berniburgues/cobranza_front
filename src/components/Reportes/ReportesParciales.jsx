import React from 'react';

const ReportesIndirectos = () => {
  const informesParciales = [
    {
      title: 'RATIOS BANCOS',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiNDVjNWQ4MWUtOWY3NS00OThhLTg0NmYtYTJmYjIxYjAzMzJhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'PERÍODO ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYjQ4ZTY0ZWItYmU3ZC00M2YyLWEzMjMtOWJjNmQ2MDhhNjlhIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9&pageName=ReportSectionf06324290e1bb7bd427b',
    },
    {
      title: 'COBRANZA MES ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMjM1OTIyZDMtNDllZC00Y2M0LWFlOTEtN2I3OWI1OTlkYjg4IiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'EVOLUCIÓN COBRANZA ATSAPRA',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiYTM2M2MyZGUtMzIwYi00MTJjLTkwMGUtZWM0Y2E3M2RmNzEyIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
    {
      title: 'IMPORTES ENVIADOS',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMDI2OTc4M2YtYmQzZC00NDE0LTkzNmUtYWY0NzMyNGM3MDEzIiwidCI6IjJiMmUxNjVjLTY3NDItNDY3NC05ZWJmLTkxY2QwYTcwMWE4ZiIsImMiOjR9',
    },
  ];

  return (
    <div className="flex flex-col">
      <ul className="flex flex-col">
        {informesParciales.map((informe, index) => (
          <li key={index} className="mb-2">
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
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
