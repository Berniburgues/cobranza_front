import React from 'react';

const Pdfs = () => {
  const pdfs = [
    {
      title: 'CAMPAÑAS/REDES',
      url: 'https://drive.google.com/file/d/1Nnnr4tuvlCUg0boL9htt6ZJhxwrkVIvj/view?usp=sharing',
    },
    {
      title: 'SEGUIMIENTO WEB/APPS/MARCAS',
      url: 'https://drive.google.com/file/d/1A92RjTb128O5ySyr6TywBGdIxOdx7rdh/view?usp=sharing',
    },
  ];

  return (
    <ul className="flex flex-col">
      {pdfs.map((informe, index) => (
        <li key={index} className="mb-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white border-2 border-black font-bold font-libre p-2 rounded-md w-full"
            onClick={() => window.open(informe.url, '_blank')}
          >
            {informe.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pdfs;
