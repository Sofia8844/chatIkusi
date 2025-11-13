import Draggable from "react-draggable";
import React, { useRef, useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import 'react-resizable/css/styles.css';
import '../css/DashboardCanva.css';
import ChartDashboard from "./dashboardComponents/ChartsDashboard";

interface DashboardCanvasProps {
  isActive: boolean;
  onClose: () => void;
}

interface Widget {
  id: string;
  type: string;
  label: string;
  diagramData: any;
  x: number;
  y: number;
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
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("application/json");
      if (!data) return;

      const parsed = JSON.parse(data);
      const { id, type, label, diagramData } = parsed;

      setWidgets((prev) => [
        ...prev,
        {
          id: id || crypto.randomUUID(),
          type: type || "diagram",
          label: label || "Nuevo elemento",
          diagramData: diagramData || {},
          x: 50 + prev.length * 30,
          y: 50 + prev.length * 30,
          width: 400,
          height: 300,
        },
      ]);
    } catch (error) {
      console.error(" Error al procesar el drop:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleRemoveWidget = (id: string) => setWidgets(prev => prev.filter(w => w.id !== id));

  useEffect(() => {
    const handleAddFromEvent = (event: any) => {
      const { id, type, label, diagramData } = event.detail;
      setWidgets((prev) => [
        ...prev,
        {
          id: id || crypto.randomUUID(),
          type: type || "diagram",
          label: label || "Nuevo elemento",
          diagramData: diagramData || {},
          x: 50 + prev.length * 30,
          y: 50 + prev.length * 30,
          width: 400,
          height: 300,
        },
      ]);
    };
    window.addEventListener("addDiagramToDashboard", handleAddFromEvent);
    return () => window.removeEventListener("addDiagramToDashboard", handleAddFromEvent);
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
        <div className="canvas-grid relative" style={{ transform: `scale(${zoom})` }}>
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
                  className="absolute border-2 border-blue-400 rounded-lg p-2 shadow-md hover:shadow-lg transition-all bg-white dark:bg-zinc-900"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                      {widget.label}
                    </h3>
                    <button
                      onClick={() => handleRemoveWidget(widget.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button>
                  </div>

                  <ResizableBox
                    width={widget.width}
                    height={widget.height}
                    minConstraints={[150, 100]}
                    resizeHandles={["s", "e", "n", "w", "ne", "nw", "se", "sw"]}
                    className="relative border border-blue-300 rounded-md"
                    onResizeStop={(_, data) => {
                      setWidgets(prev =>
                        prev.map(w =>
                          w.id === widget.id
                            ? { ...w, width: data.size.width, height: data.size.height }
                            : w
                        )
                      );
                    }}
                  >
                    {widget.diagramData ? (
                      <ChartDashboard data={widget.diagramData} />
                    ) : (
                      <p className="text-gray-500 text-center py-10">Sin datos</p>
                    )}
                  </ResizableBox>
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>

      {/* Controles */}
      <div className="fixed bottom-10 left-[45%] transform -translate-x-1/2 flex items-center gap-4 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg z-50 border border-light-border dark:border-dark-border">
        <div className="flex gap-3">
          <button onClick={handleZoomOut} className="bg-emerald-700 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110">
            <span className="material-icons text-xl">zoom_out</span>
          </button>
          <button onClick={handleZoomIn} className="bg-emerald-700 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110">
            <span className="material-icons text-xl">zoom_in</span>
          </button>
          <button
            title={mode === "move" ? "Modo mover" : "Modo seleccionar"}
            className={`${mode === "move" ? "bg-emerald-700 hover:bg-blue-700" : "bg-blue-700 hover:bg-emerald-700"
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
