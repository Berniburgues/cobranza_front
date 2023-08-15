import React, { useState } from 'react';
import { crearExcel } from '../../utils/crearExcel';

const ExcelBoton = ({ tableRef, fechasCobro, fechasDesde }) => {
  const [downloadStatus, setDownloadStatus] = useState(''); // Estado de descarga

  const handleDownload = () => {
    setDownloadStatus('Descargando...');

    crearExcel(tableRef, fechasCobro, fechasDesde);

    setTimeout(() => {
      setDownloadStatus('¡Descarga completada!');
      setTimeout(() => {
        setDownloadStatus(''); // Limpiar el estado después de un tiempo
      }, 3000); // Restablecer después de 3 segundos
    }, 1000); // Cambiar el mensaje después de 1 segundo
  };

  return (
    <tr>
      <td colSpan={fechasCobro.length + fechasDesde.length + 4}>
        <button
          onClick={handleDownload}
          className="border-2 border-gray-800 text-xs font-semibold bg-green-200 hover:bg-green-300 w-full"
        >
          {downloadStatus ? downloadStatus : 'Descargar Excel'}
        </button>
      </td>
    </tr>
  );
};

export default ExcelBoton;
