import Draggable from "react-draggable";
import React, { useRef, useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import 'react-resizable/css/styles.css';
import '../css/DashboardCanva.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface DashboardCanvasProps {
  isActive: boolean;
  onClose: () => void;
}

interface Widget {
  id: string;
  title: string;
  x: number;
  y: number;
  type: "chart" | "card" | "diagram";
  diagramData?: any;
  width: number;
  height: number;
}

const DashboardCanvas: React.FC<DashboardCanvasProps> = ({ isActive, onClose }) => {
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const canvasRef = useRef<HTMLDivElement>(null);

  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<"select" | "move">("select");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const onMousedown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === "move") {
      setIsPanning(true);
      setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === "move" && isPanning && canvasRef.current) {
      const dx = panStart.x - e.clientX;
      const dy = panStart.y - e.clientY;

      canvasRef.current.scrollLeft += dx;
      canvasRef.current.scrollTop += dy;

      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => setIsPanning(false);
  // Calcula ancho y alto dinámico según widgets para permitir scroll
  const canvasWidth = Math.max(2000, ...widgets.map(w => w.x + w.width));
  const canvasHeight = Math.max(2000, ...widgets.map(w => w.y + w.height));

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.type === "diagram") {
        setWidgets(prev => [
          ...prev,
          {
            id: parsed.id,
            title: parsed.label,
            x: 100 + Math.random() * 300,
            y: 100 + Math.random() * 150,
            type: "diagram",
            diagramData: parsed.diagramData,
            width: 300,
            height: 200,
          },
        ]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleRemoveWidget = (id: string) => setWidgets(prev => prev.filter(w => w.id !== id));

  useEffect(() => {
    const listener = (event: any) => {
      const { id, label, diagramData } = event.detail;
      setWidgets(prev => [
        ...prev,
        { id, title: label, x: 200, y: 150, type: "diagram", diagramData, width: 300, height: 200 },
      ]);
    };
    window.addEventListener("addDiagramToDashboard", listener);
    return () => window.removeEventListener("addDiagramToDashboard", listener);
  }, []);

  return (
    <div
      className={`relative flex-1 min-h-screen transition-all duration-700 ${isActive ? "visible opacity-100" : "invisible opacity-0"}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Cabecera */}
      <div className="p-4 border-b border-light-border dark:border-dark-border flex justify-between items-center">
        <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Tablero Interactivo
        </h2>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Arrastra los elementos libremente
        </p>
        <button
          onClick={onClose}
          className="flex items-center gap-2 py-2 px-4 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors text-emerald-700 dark:text-emerald-300"
        >
          <span className="material-icons">arrow_back</span>
          Volver al chat
        </button>
      </div>

      {/* Lienzo */}
      <div
        ref={canvasRef}
        className={`relative w-full h-[100vh] overflow-auto cursor-${mode === "move" ? (isPanning ? "grabbing" : "grab") : "default"}`}
        onMouseDown={onMousedown}
        onMouseMove={onMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Contenedor interno que se mueve y escala */}
        <div className="canvas-grid relative"
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          {widgets.map(widget => {
            const nodeRef = (nodeRefs.current[widget.id] ??= React.createRef<HTMLDivElement>());
            return (
              <Draggable
                key={widget.id}
                nodeRef={nodeRef}
                defaultPosition={{ x: widget.x, y: widget.y }}
                disabled={mode === "move"}
                cancel=".react-resizable-handle"
              >
                <div
                  ref={nodeRef}
                  className="absolute bg-white dark:bg-zinc-900 border border-light-border dark:border-dark-border rounded-xl shadow-lg p-4 hover:shadow-xl transition-all"
                >
                  <h3 className="font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">
                    {widget.title}
                  </h3>
                  <button onClick={() => handleRemoveWidget(widget.id)} className="text-red-500 hover:text-red-700">✖</button>

                  <ResizableBox
                    width={widget.width}
                    height={widget.height}
                    minConstraints={[150, 100]}
                    maxConstraints={[600, 400]}
                    resizeHandles={["se"]}
                    className="p-4"
                    onResizeStop={(_, data) => {
                      setWidgets(prev =>
                        prev.map(w => (w.id === widget.id ? { ...w, width: data.size.width, height: data.size.height } : w))
                      );
                    }}
                  >
                    {widget.type === "diagram" ? (
                      <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={widget.diagramData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#10B981" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="w-64 h-32 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                        👥 Usuarios Activos
                      </div>
                    )}
                  </ResizableBox>
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>

      {/* Controles de zoom y modo */}
      <div className="fixed bottom-10 left-[45%] transform -translate-x-1/2 flex items-center gap-4 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg z-50 border border-light-border dark:border-dark-border">
        <div className="flex gap-3">
          <button onClick={handleZoomOut}
            className="bg-emerald-700 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110"
          >
            <span className="material-icons text-xl">zoom_out</span>
          </button>
          <button onClick={handleZoomIn}
            className=" bg-emerald-700 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110"
          >            <span className="material-icons text-xl">zoom_in</span>
          </button>
          <button
            title={mode === "move" ? "Modo mover" : "Modo seleccionar"}
            className={`${mode === "move" ? "bg-emerald-700 hover:bg-blue-700" : "bg-blue-700  hover:bg-emerald-700"
              } text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110`}
            onClick={() => setMode(mode === "move" ? "select" : "move")}
          >
            <span className="material-icons text-xl">
              {mode === "move" ? "pan_tool" : "mouse"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCanvas;
