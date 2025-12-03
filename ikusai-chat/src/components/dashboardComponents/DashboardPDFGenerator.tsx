import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Widget {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  diagramData?: any;
  chartRef?: React.RefObject<any>;
}

interface Props {
  dashboardRef: React.RefObject<HTMLDivElement>;
}

const DashboardPDFGenerator: React.FC<Props> = ({ widgets, dashboardRef }) => {
const generatePDF1 = async () => {
    if (!dashboardRef.current) return;

    const dashboard = dashboardRef.current;
    const rect = dashboard.getBoundingClientRect();

    // Convertimos el dashboard a canvas
    const canvas = await html2canvas(dashboard, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculamos factor de escala
    const scaleX = pageWidth / rect.width;
    const scaleY = pageHeight / rect.height;
    const scale = Math.min(scaleX, scaleY);

    const imgWidth = rect.width * scale;
    const imgHeight = rect.height * scale;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("dashboard_scaled.pdf");
  };
const generatePDF2 = async () => {
  if (widgets.length === 0 || !dashboardRef.current) return;

  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const widgetsPerPage = 4; // 2x2
  const cols = 2;
  const padding = 10;

  // Clonamos dashboard para ignorar zoom
  const dashboard = dashboardRef.current;
  const clone = dashboard.cloneNode(true) as HTMLElement;
  clone.style.transform = "scale(1)";
  clone.style.position = "fixed";
  clone.style.top = "-9999px";
  document.body.appendChild(clone);

  let rowHeights: number[] = []; // alturas de cada fila

  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    const widgetDiv = clone.querySelector(`#widget-${widget.id}`) as HTMLElement;
    if (!widgetDiv) continue;

    const { width, height } = widgetDiv.getBoundingClientRect();
    const canvas = await html2canvas(widgetDiv, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const indexInPage = i % widgetsPerPage;
    const col = indexInPage % cols;
    const row = Math.floor(indexInPage / cols);

    if (!rowHeights[row]) rowHeights[row] = 0;

    // Celda disponible
    const cellWidth = pageWidth / cols - 2 * padding;
    const cellHeight = pageHeight / 2 - 2 * padding; // máximo 2 filas por página

    // Escalamos para que no se salga de la celda
    const scale = Math.min(cellWidth / width, cellHeight / height, 1); 
    const imgW = width * scale;
    const imgH = height * scale;

    // Posición X e Y
    const posX = col * (pageWidth / cols) + padding + (cellWidth - imgW) / 2;
    const posY = rowHeights.slice(0, row).reduce((a, b) => a + b + padding, 0) + padding;

    rowHeights[row] = Math.max(rowHeights[row], imgH);

    pdf.addImage(imgData, "PNG", posX, posY, imgW, imgH);

    // Nueva página cada 4 widgets
    if ((i + 1) % widgetsPerPage === 0 && i + 1 < widgets.length) {
      pdf.addPage();
      rowHeights = [];
    }
  }

  document.body.removeChild(clone);
  pdf.save("dashboard.pdf");
};


  return (
    <button
      onClick={generatePDF1}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow"
    >
      Exportar PDF
    </button>
  );
};

export default DashboardPDFGenerator;
