// src/components/ChartRenderer.tsx
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

interface Props {
  data: {
    type: string;
    columns: string[];
    rows: any[][];
    mapping?: { x_key: string; y_key: string };
    details?: string;
  };
}

export default function ChartRenderer({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // 🔁 Destruye gráfico previo
    if (chartRef.current) chartRef.current.destroy();

    const xKey = data.mapping?.x_key || data.columns[0];
    const yKey = data.mapping?.y_key || data.columns[1];

    const xIndex = data.columns.indexOf(xKey);
    const yIndex = data.columns.indexOf(yKey);

    // Convierte fechas y números dinámicamente
    const labels = data.rows.map((r) => {
      const val = r[xIndex];
      // Si parece fecha ISO, formateamos
      if (typeof val === "string" && !isNaN(Date.parse(val))) {
        const date = new Date(val);
        return date.toLocaleDateString("es-ES", { year: "numeric", month: "short" });
      }
      return String(val);
    });

    const values = data.rows.map((r) => {
      const v = r[yIndex];
      const num = parseFloat(v);
      return isNaN(num) ? 0 : num;
    });

    // Render dinámico según tipo
    chartRef.current = new Chart(ctx, {
      type: data.type.toLowerCase() as any,
      data: {
        labels,
        datasets: [
          {
            label: data.details || "Datos",
            data: values,
            backgroundColor: [
              "#36A2EB",
              "#FF6384",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
            borderColor: "#36A2EB",
            borderWidth: 2,
            fill: data.type === "line" ? false : true,
            tension: data.type === "line" ? 0.3 : 0, // suaviza líneas
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: { mode: "index" },
        },
        scales: data.type === "line" || data.type === "bar" ? {
          x: { title: { display: true, text: xKey } },
          y: { title: { display: true, text: yKey }, beginAtZero: true },
        } : undefined,
      },
    });

    return () => chartRef.current?.destroy();
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
      <div className="relative w-full h-80">
        <canvas ref={canvasRef} />
      </div>
      {data.details && (
        <p className="text-sm text-gray-500 mt-2 text-center">{data.details}</p>
      )}
    </div>
  );
}
