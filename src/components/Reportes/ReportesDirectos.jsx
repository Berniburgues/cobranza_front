import React from 'react';

const ReportesDirectos = () => {
  const informes = [
    {
      title: 'Info Bancos',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZjRkMGZlYjYtMWY1OS00ODMyLWJjZjEtZTEyOTgyNWE0NjgzIiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
    {
      title: 'Ratios',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiODVkM2E5NjAtODI2My00ZDlhLThjYjEtY2FlYmFiZjk5OTk2IiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
    {
      title: 'Cobranza por Período',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZTZhM2JkZDAtMDFmYy00OGI1LWEwMTYtZjI2Y2UzZWRiZGE1IiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9',
    },
    {
      title: 'Códigos por Día Hábil',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiNDQyYjhmN2UtYWI0ZC00Y2UzLWE3ZWMtNzc3OWE0M2MxMmYzIiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9&pageName=ReportSectione828bf90b0b55e7ed03b',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {informes.map((informe, index) => (
        <div key={index} className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-96"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReportesDirectos;
