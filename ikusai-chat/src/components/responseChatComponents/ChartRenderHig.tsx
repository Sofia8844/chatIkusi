import { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import '../../css/viewDataTable.css';
import "highcharts/modules/exporting";
import "highcharts/modules/export-data";
import "highcharts/modules/offline-exporting";
import "highcharts/highcharts-3d";

interface Props {
    data: {
        type: string;
        columns: string[];
        rows: any[][];
        mapping?: { x_key: string; y_key: string };
        details?: string;
        answer?: string;
    };
}


export default function ChartRenderer({ data }: Props) {
    const chartComponentRef = useRef<any>(null);

    /*     const xKey = data.mapping?.x_key || data.columns[0];
        const yKey = data.mapping?.y_key || data.columns[1];
    
        const xIndex = data.columns.indexOf(xKey);
        const yIndex = data.columns.indexOf(yKey); */
    const xKey = Array.isArray(data.mapping?.x_key)
        ? data.mapping.x_key[0] // primer valor
        : data.mapping?.x_key || data.columns[0];

    const yKey = Array.isArray(data.mapping?.y_key)
        ? data.mapping.y_key
        : [data.mapping?.y_key || data.columns[1]];

    // índices
    const xIndex = data.columns.indexOf(xKey);
    const yIndex = yKey.map(key => data.columns.indexOf(key));

    // Labels dinámicos (incluye formato fecha)
    const categories = data.rows.map((r) => {
        const val = r[xIndex];
        if (typeof val === "number") {
            if (val >= 1000 && val <= 9999) return String(val);
            return String(val);
        }
        const date = val ? val.trim() : val;
        // Regex para detectar formatos específicos
        const reYear = /^\d{4}$/;
        const reYearMonth = /^\d{4}[-/]\d{1,2}$/;
        const reFullIso = /^\d{4}[-/]\d{1,2}[-/]\d{1,2}/; // 2020-05-12, 2020/05/12
        const reDayFirst = /^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/;
        // Solo año: devolver tal cual
        if (reYear.test(date)) {
            return date;
        }
        if (reYearMonth.test(date)) {
            // normalizar separador y construir Date en primer día del mes
            const parts = date.split(/[-/]/);
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const d = new Date(year, month, 1);
            return d.toLocaleDateString("es-ES", { year: "numeric", month: "short" });
        }

        // Fecha completa en ISO o parecido -> formatear mes + año (puedes cambiar a day+month si prefieres)
        if (reFullIso.test(date) || reDayFirst.test(date)) {
            const dateIso = new Date(date);
            if (!isNaN(dateIso.getTime())) {
                // ejemplo: "may. 2020" (sin día). Si quieres incluir día, añade day: 'numeric'
                return dateIso.toLocaleDateString("es-ES", { year: "numeric", month: "short" });
            }
        }
        return date || '';

    });
    // Valores dinámicos
    /*   const values = data.rows.map((r) => {
          const num = parseFloat(r[yIndex]);
          return isNaN(num) ? 0 : num;
      }); */
    const values = data.rows.map((r) => {
        return yIndex.map((i) => {
            const num = parseFloat(r[i]);
            return isNaN(num) ? 0 : num;
        })
    })

    //Valores para diagramas circulares
    const seriesDataDoungh = data.rows.map((r) => ({
        name: r[xIndex] ? r[xIndex] : "",
        y: parseFloat(r[yIndex]) || 0
    }));

    // Convertimos tipo Chart.js → Highcharts
    const typeMap: any = {
        line: "line",
        bar: "column",
        pie: "pie",
        doughnut: "pie",   // Doughnut = Pie con innerSize
        radar: "area",     // Radar = Line con modo polar
        bubble: "bubble",
    };
    const hcType = typeMap[data.type.toLowerCase()] || "column";
        //Series
    const series = hcType === "pie" || hcType === "doughnut"
  ? [{
      type: hcType as any,
      name: data.details || "Datos",
      data: seriesDataDoungh,
      colorByPoint: true,
    }]
  : yIndex.map((i, idx) => ({
      type: hcType as any,
      name: data.mapping.y_key[idx],
      data: values[idx],
    }));

    // Activar 3D para todos los gráficos
    const options: Highcharts.Options = {
        chart: {
            // polar: hcType === "area" ? true : false,
            type: hcType,
            backgroundColor: "transparent",
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 20,
                depth: 50,
                viewDistance: hcType === "bar" ? 20 : 30
            },

        },
        title: { text: "" },
        xAxis: {
            categories,
            title: { text: xKey, margin: 20, position3d: 'flap' }, // Ajuste de posición en 3D },
            labels: {
                padding: 10
            },
            gridLineWidth: 2,    //Líneas del eje
            gridLineColor: '#DBD5D5' // Color y opacidad de la cuadrícula

        },
        yAxis: {
            title: { text: yKey, margin: 30, position3d: 'flap' }, // Ajuste de posición en 3D },
            labels: {
                padding: 10,
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0, '', ','); // Formato con separador de miles
                },
            },

            type: hcType === "area" ? "linear" : "logarithmic", // Establecer el eje Y como logarítmico,
            gridLineWidth: 2,    //Líneas del eje
            gridLineColor: '#DBD5D5' // Color y opacidad de la cuadrícula

        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                animation: {
                    duration: 2000, // Duración de la animación
                    easing: 'easeOutBounce' // Efecto de la animación
                }
            },
            column: {
                depth: 40,
            },
            bar: {
                depth: 40,
            },
            pie: {
                animation: {
                    duration: 900  // también para cuando el pie se dibuja
                },
                startAngle: 0,
                endAngle: 360,
                depth: 65,
                innerSize: hcType === "pie" ? 60 : "50%",
            },
            line: {
                marker: { enabled: true },
            },
        },
        series: series,

                //colorByPoint: hcType === "pie",
                /*colors:[ "#00936B", // verde profundo
    "#36A2EB", // azul claro
    "#FFA643", // naranja suave
    
    "#00AC78", // verde medio
    "#5BB1E6", // azul intermedio
    "#FFCD57", // amarillo cálido
    
    "#00C588", // verde vibrante
    "#8FC6F0", // azul pastel
    "#FF8A5C", // coral suave
    
    "#33D19B", // verde menta
    "#B7DFF6", // azul muy suave
    "#7A5AF5", // violeta moderno
    
    "#66DCAE", // verde claro
    "#036F8A", // azul petróleo
    "#B083FF"  // lavanda pastel]*/
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'separator', 'viewData']
                }
            },
            showTable: false,
            tableCaption: "Datos Graficos",

        },

        navigation: {
            buttonOptions: {
                symbolStroke: "#00C588",        // ícono verde
                symbolStrokeWidth: 3,
                theme: {
                    fill: "#E9FFF6",            // verde pastel suave
                    stroke: "#00C588",          // borde verde


                }
            }
        },

    };
    useEffect(() => {
        const chart = chartComponentRef.current?.chart;
        if (!chart) return;

        const timer = setTimeout(() => {
            chart.series.forEach((serie) => {
                serie.points.forEach((p) => {
                    if (p.graphic) {
                        p.graphic.animate(
                            { translateY: -12 },
                            {
                                duration: 2000,
                                easing: "easeOutExpo",
                                complete() {
                                    p.graphic.animate(
                                        { translateY: 0 },
                                        { duration: 2000, easing: "easeOutExpo" }
                                    );
                                }
                            }
                        );
                    }
                });
            });
        }, 1500); // <-- tu delay perfecto

        return () => clearTimeout(timer);
    }, [data]);


    return (
        <div className="w-full flex flex-col items-center space-y-6">
            {/* Texto superior fuera del card */}
            {data.answer && (
                <div className="w-full max-w-3xl text-start px-6">
                    <p
                        className="text-[17px] text-gray-800 dark:text-gray-100 leading-relaxed 
                   tracking-normal font-[400] antialiased" >
                        {data.answer}
                    </p>
                </div>
            )
            }

            {/* Card del gráfico */}
            <div className="w-full max-w-3xl bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md transition-all duration-300 flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    📊 Visualización generada por el asistente
                </h3>

                <div className="relative w-full flex justify-center items-center">
                    {/*<canvas ref={canvasRef} className="w-full h-full" />*/}
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        ref={chartComponentRef}
                        className="w-full h-full" containerProps={{ style: { height: data.type === "pie" || data.type === "doughnut" ? "320px" : "420px", width: "100%" } }}

                    />
                </div>
            </div>

            {/* Texto inferior fuera del card */}
            {/*
                data.details && (
                    <div className="w-full max-w-3xl text-center px-6">
                        <p className=" text-[17px]  text-gray-800  dark:text-gray-300 leading-relaxed tracking-normal font-[400] antialiased">
                            💬 <strong>Interpretación del gráfico:</strong> {data.details}
                        </p>
                    </div>
                )
            */}
        </div >

    );
}