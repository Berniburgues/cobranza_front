import React from 'react';

const Reportes = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <iframe
        title="Cobranza"
        width="100%"
        height="525"
        src="https://app.powerbi.com/view?r=eyJrIjoiNzJkZGQwZGMtYjgzMS00YjQ5LTkxNjQtMWNmZDYwNzRiMjBiIiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9&pageName=ReportSection"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Reportes;
