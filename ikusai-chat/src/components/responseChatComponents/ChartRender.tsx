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
                            "#00936B", // verde intermedio
                            "#36A2EB", // azul vibrante (coherente con tu borderColor)
                            "#00AC78", // verde brillante claro
                            "#8FC6F0", // azul claro pastel, armonioso con verdes
                            "#00C588", // verde lima claro
                            "#5BB1E6", // azul medio claro
                            "#33D19B", // verde menta
                            "#66DCAE", // verde pastel medio

                        ],
                        borderColor: "#37BD72",
                        borderWidth: 2,
                        fill: data.type === "line" ? false : true,
                        tension: data.type === "line" ? 0.3 : 0, // suaviza líneas
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
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
       <div className="max-w-sm bg-white dark:bg-zinc-800 rounded-xl p-3 shadow-sm border border-gray-200 dark:border-zinc-700">
      {/* Card del gráfico */}
      <div className="w-full max-w-3xl flex flex-col items-center bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-md transition-all duration-300">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
          📊 Visualización generada por el asistente
        </h3>

        <div className="relative w-full h- flex justify-center items-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full" 
          />
        </div>
      </div>

      {/* Texto fuera del card */}
      {data.details && (
        <div className="mt-6 px-4 max-w-3xl text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            💬 <strong>Interpretación del gráfico:</strong> {data.details}
          </p>
        </div>
      )}
    </div>

    );
}
