import * as XLSX from 'xlsx';
import { formatFecha } from './fechas';

export const crearExcel = (tableRef, fechasCobro, fechasDesde) => {
  if (!tableRef.current) {
    return;
  }

  try {
    // Obtener los datos de la tabla
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(tableRef.current);

    // Obtener la posición de las columnas de fecha de cobro y fecha desde
    const fechaCobroColumnStart = 4; // Columna de inicio para las fechas de cobro (por ejemplo, columna E)
    const fechaDesdeColumnStart = fechaCobroColumnStart + fechasCobro.length + 1; // Columna siguiente a las fechas de cobro

    // Establecer los encabezados de las columnas de fecha de cobro
    fechasCobro.forEach((fecha, index) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: fechaCobroColumnStart + index });
      const cellRef = worksheet[cell];
      if (!cellRef) {
        worksheet[cell] = {}; // Inicializar la celda si está vacía
      }
      worksheet[cell].v = formatFecha(fecha); // Establecer el valor de la celda como la fecha formateada
      worksheet[cell].t = 's'; // Establecer el tipo de datos de la celda como texto
    });

    // Establecer los encabezados de las columnas de fecha desde
    fechasDesde.forEach((fechaDesde, index) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: fechaDesdeColumnStart + index });
      const cellRef = worksheet[cell];
      if (!cellRef) {
        worksheet[cell] = {}; // Inicializar la celda si está vacía
      }
      worksheet[cell].v = formatFecha(fechaDesde); // Establecer el valor de la celda como la fecha formateada
      worksheet[cell].t = 's'; // Establecer el tipo de datos de la celda como texto
    });

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla');

    // Generar el archivo de Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = 'tabla.xlsx';
    link.click();

    // Liberar recursos
    URL.revokeObjectURL(excelUrl);
  } catch (error) {
    console.error('Error al exportar a Excel:', error);
  }
};
