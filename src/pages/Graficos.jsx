import React from 'react';

const Graficos = () => {
  return (
    <div className="flex items-center justify-center mt-5">
      <iframe
        title="Cobranza"
        width="1024"
        height="612"
        src="https://app.powerbi.com/view?r=eyJrIjoiZjFlMDk3YWYtYmY4Yy00ZWEyLWIwMzQtNTRiYTA2M2E4MTVjIiwidCI6IjUxZDRjMzBhLTIzZjMtNDk5Mi04M2VkLWU4N2NhNzk0NzNmYiIsImMiOjR9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Graficos;
