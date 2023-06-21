import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const crearPDF = async (tableRef) => {
  if (!tableRef.current) {
    return;
  }

  try {
    const canvas = await html2canvas(tableRef.current);
    const imageData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('tabla.pdf');
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
  }
};
