import React from 'react';

const ReportesDirectos = () => {
  const informes = [
    {
      title: 'Ratios',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiODVkM2E5NjAtODI2My00ZDlhLThjYjEtY2FlYmFiZjk5OTk2IiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
    {
      title: 'Cobranza por Período',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZTZhM2JkZDAtMDFmYy00OGI1LWEwMTYtZjI2Y2UzZWRiZGE1IiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
    {
      title: 'Info Bancos',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZjRkMGZlYjYtMWY1OS00ODMyLWJjZjEtZTEyOTgyNWE0NjgzIiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
    {
      title: 'Importes Enviados',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiNWEyNDg1Y2ItMTg3Yi00YWM5LWI2NDMtNDVkZGJlOWNlNTVkIiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
    {
      title: 'Cuiles por Banco',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiN2UxMTA1MGMtYzI0Zi00ZTViLWJlMGYtNWQ5ZDZhODkzNjI2IiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
  ];

  return (
    <ul className="flex flex-col">
      {informes.map((informe, index) => (
        <li key={index} className="mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ReportesDirectos;
