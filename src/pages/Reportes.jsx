import React from 'react';

const Reportes = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <iframe
        title="Cobranza"
        width="100%"
        height="525"
        src="https://app.powerbi.com/view?r=eyJrIjoiZjFlMDk3YWYtYmY4Yy00ZWEyLWIwMzQtNTRiYTA2M2E4MTVjIiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Reportes;
