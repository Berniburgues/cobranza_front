import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

export const crearPDF = (tableRef) => {
  if (!tableRef.current) {
    return;
  }

  domtoimage
    .toPng(tableRef.current)
    .then((dataUrl) => {
      const doc = new jsPDF();
      const width = doc.internal.pageSize.getWidth();
      const height =
        (tableRef.current.offsetHeight * width) / tableRef.current.offsetWidth;
      doc.addImage(dataUrl, 'PNG', 0, 0, width, height);
      doc.save('tabla.pdf');
    })
    .catch((error) => {
      console.error('Error al exportar a PDF:', error);
    });
};
