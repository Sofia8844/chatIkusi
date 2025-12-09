import Draggable from "react-draggable";
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { ResizableBox } from "react-resizable";
import { Image as KonvaImage, Layer, Rect, Stage, Text as KonvaText, Transformer } from "react-konva";
import type Konva from "konva";
import "react-resizable/css/styles.css";
import "../css/DashboardCanva.css";
import ChartDashboard from "./dashboardComponents/ChartsDashboardHig";
import EditableTitle from "./dashboardComponents/EditableLabels";
import HeaderDashboard from "./dashboardComponents/Headers";
import type {
  CanvasElement,
  IconElement,
   ImageElement,
  TextElement,
} from "./editorCanva/editPage/types";
interface DashboardCanvasProps {
  isActive: boolean;
  onClose: () => void;
}

export interface Widget {
  id: string;
  type: string;
  label: string;
  diagramData: any;
  x: number;
  y: number;
  width: number;
  height: number;
  chartRef?: React.RefObject<any>;
}

const DASHBOARD_SIZE = 2000;

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const textToHtml = (value: string) => {
  if (!value) return "<p></p>";
  return value
    .split("\n")
    .map((line) => `<p>${line ? escapeHtml(line) : "<br>"}</p>`)
    .join("");
};

const useLoadedImage = (src: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => setImage(img);
    return () => {
      img.onload = null;
    };
  }, [src]);

  return image;
};

interface ElementNodeProps {
  element: CanvasElement;
  isSelected: boolean;
  isEditing: boolean;
  canDrag: boolean;
  onSelect: () => void;
  onChange: (attrs: Partial<CanvasElement>) => void;
  onEditRequest: (element: TextElement) => void;
}

const ElementNode: React.FC<ElementNodeProps> = ({
  element,
  isSelected,
  isEditing,
  canDrag,
  onSelect,
  onChange,
  onEditRequest,
}) => {
  const shapeRef = useRef<Konva.Text | Konva.Image>(null);
  const icon = element as IconElement;
  const text = element as TextElement;
  const imageEl = element as ImageElement;
  const image = useLoadedImage(element.type === "image" ? imageEl.src : "");

  useEffect(() => {
    if (isSelected && shapeRef.current) {
      shapeRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const width = Math.max(40, node.width() * scaleX);
    const height = Math.max(40, node.height() * scaleY);
    node.scaleX(1);
    node.scaleY(1);
    onChange({
      x: node.x(),
      y: node.y(),
      width,
      height,
      rotation: node.rotation(),
    });
  };

  const commonProps = {
    ref: shapeRef as React.Ref<Konva.Text | Konva.Image>,
    id: element.id,
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    rotation: element.rotation ?? 0,
    draggable: canDrag && !isEditing,
    opacity: element.opacity ?? 1,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
      onChange({ x: e.target.x(), y: e.target.y() });
    },
    onTransformEnd: handleTransformEnd,
  };

  if (element.type === "text") {
    return (
      <KonvaText
        {...commonProps}
        text={text.text}
        fontSize={text.fontSize}
        fontFamily={text.fontFamily}
        fontStyle={text.fontStyle ?? "normal"}
        fill={text.fill ?? "#0f172a"}
        align={text.align ?? "left"}
        padding={8}
        cornerRadius={6}
        shadowColor="rgba(12,131,136,0.25)"
        shadowBlur={6}
        shadowOpacity={0.7}
        onDblClick={(e) => {
          e.cancelBubble = true;
          onEditRequest(text);
        }}
        onDblTap={(e) => {
          e.cancelBubble = true;
          onEditRequest(text);
        }}
      />
    );
  }

  if (element.type === "icon") {
    return (
      <KonvaText
        {...commonProps}
        text={icon.text}
        fontSize={icon.fontSize}
        fontFamily="Inter"
        fill={icon.fill ?? "#0d9488"}
        align="center"
        verticalAlign="middle"
      />
    );
  }

  return (
    <KonvaImage
      {...commonProps}
      image={image ?? undefined}
      cornerRadius={12}
      fill="white"
      shadowColor="rgba(16,185,129,0.35)"
      shadowBlur={12}
      shadowOpacity={0.5}
    />
  );
};

const DashboardCanvas: React.FC<DashboardCanvasProps> = ({ isActive, onClose }) => {
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const canvasRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const editableRef = useRef<HTMLDivElement>(null);
  const editingSessionRef = useRef<string | null>(null);
  const [activeWidget, setActiveWidget] = useState(null);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<"select" | "move">("select");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [editingWidgetId, setEditingWidgetId] = useState('');
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [editingState, setEditingState] = useState<{
    id: string;
    value: string;
    original: string;
  } | null>(null);

  const selectedElement = useMemo(
    () => elements.find((el) => el.id === selectedElementId),
    [elements, selectedElementId]
  );

  const selectCanvasElement = useCallback((id: string | null) => {
    setSelectedElementId(id);
  }, []);

  const updateCanvasElement = useCallback(
    (id: string, attrs: Partial<CanvasElement>) => {
      setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...attrs } : el)));
    },
    []
  );

  const deleteSelectedElement = useCallback(() => {
    if (!selectedElementId) return;
    setElements((prev) => prev.filter((el) => el.id !== selectedElementId));
    setSelectedElementId(null);
    setEditingState(null);
  }, [selectedElementId]);

  const startEditing = useCallback(
    (element: TextElement) => {
      selectCanvasElement(element.id);
      setEditingState({ id: element.id, value: element.text, original: element.text });
    },
    [selectCanvasElement]
  );

  const stopEditing = useCallback(
    (commit: boolean) => {
      if (!editingState) return;
      if (commit && editingState.value !== editingState.original) {
        updateCanvasElement(editingState.id, { text: editingState.value });
      }
      setEditingState(null);
    },
    [editingState, updateCanvasElement]
  );

  const editingElement = useMemo(() => {
    if (!editingState) return null;
    const element = elements.find((el) => el.id === editingState.id);
    if (!element || element.type !== "text") return null;
    return element as TextElement;
  }, [editingState, elements]);

  const editingBox = useMemo(() => {
    if (!editingElement) return null;
    return {
      x: editingElement.x,
      y: editingElement.y,
      width: editingElement.width,
      height: Math.max(editingElement.height, editingElement.fontSize * 1.5),
    };
  }, [editingElement]);

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

  const handleBackgroundClick = () => {
    if (editingState) {
      stopEditing(true);
    }
    selectCanvasElement(null);
  };
  const handleStageClick = (event: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (event.target === event.target.getStage()) {
      handleBackgroundClick();
    }
  };

  const addElementToDashboard = useCallback((detail: Record<string, any>) => {
    if (!detail || !detail.type) return;
    let nextElement: CanvasElement | null = null;
    setElements((prev) => {
      const id = detail.id || crypto.randomUUID();
      const baseX = 120 + prev.length * 14;
      const baseY = 120 + prev.length * 14;
      const base = {
        id,
        name: detail.label ?? "Elemento",
        x: baseX,
        y: baseY,
        width: 360,
        height: 120,
        rotation: 0,
        opacity: detail.opacity ?? 1,
      };

      switch (detail.type) {
        case "text":
          nextElement = {
            ...base,
            type: "text",
            text: detail.text ?? detail.label ?? "Texto",
            fontSize: detail.fontSize ?? 26,
            fontFamily: detail.fontFamily ?? "Inter",
            fontStyle: detail.fontStyle ?? "normal",
            fill: detail.fill ?? "#0f172a",
            align: detail.align ?? "left",
          };
          break;
        case "icon":
          nextElement = {
            ...base,
            type: "icon",
            text: detail.text ?? "✺",
            fontSize: detail.fontSize ?? 56,
            fill: detail.fill ?? "#0d9488",
            width: detail.width ?? 90,
            height: detail.height ?? 90,
          };
          break;
        case "image":
          if (detail.src) {
            nextElement = {
              ...base,
              type: "image",
              src: detail.src,
              width: detail.width ?? 280,
              height: detail.height ?? 180,
              opacity: detail.opacity ?? 0.96,
            };
          }
          break;
        default:
          break;
      }

      if (!nextElement) return prev;
      return [...prev, nextElement];
    });

    if (nextElement) {
      setSelectedElementId(nextElement.id);
      setActiveWidget(null);
    }
  }, []);

  useEffect(() => {
    const handleAddElement = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      addElementToDashboard(detail);
    };
    window.addEventListener("addElementToDashboard", handleAddElement as EventListener);
    return () => window.removeEventListener("addElementToDashboard", handleAddElement as EventListener);
  }, [addElementToDashboard]);

  useEffect(() => {
    if (!transformerRef.current || !layerRef.current) return;
    if (selectedElement) {
      const node = layerRef.current.findOne(`#${selectedElement.id}`) as Konva.Node | undefined;
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer()?.batchDraw();
        return;
      }
    }
    transformerRef.current.nodes([]);
  }, [elements, selectedElement]);

  useEffect(() => {
    if (editingState && selectedElement?.id !== editingState.id) {
      setEditingState((prev) => {
        if (!prev) return prev;
        if (prev.value !== prev.original) {
          updateCanvasElement(prev.id, { text: prev.value });
        }
        return null;
      });
    }
  }, [editingState, selectedElement?.id, updateCanvasElement]);

  useEffect(() => {
    if (!editingState || !editingElement) {
      editingSessionRef.current = null;
      return;
    }
    if (editingSessionRef.current !== editingState.id) {
      editingSessionRef.current = editingState.id;
      if (editableRef.current) {
        editableRef.current.innerHTML = textToHtml(editingState.value);
        requestAnimationFrame(() => {
          const el = editableRef.current;
          if (!el) return;
          el.focus();
          const range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        });
      }
    }
  }, [editingElement, editingState]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".tippy-box")) return;
      if (target?.closest("[data-preserve-selection]")) return;
      if (!stageWrapperRef.current) return;
      if (!stageWrapperRef.current.contains(target)) {
        if (editingState) {
          stopEditing(true);
        }
        selectCanvasElement(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingState, selectCanvasElement, stopEditing]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (editingState) return;
      if (event.key === "Delete") {
        deleteSelectedElement();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [deleteSelectedElement, editingState]);

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
          id: crypto.randomUUID(),
          type: type || "diagram",
          label: label || `Nuevo Diagrama`,
          diagramData: diagramData || {},
          x: 50 + prev.length * 30,
          y: 50 + prev.length * 30,
          width: 450,
          height: 450,
          chartRef: React.createRef() // <-- asignamos ref
        },
      ]);
    } catch (error) {
      console.error(" Error al procesar el drop:", error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleRemoveWidget = (id: string) => setWidgets(prev => prev.filter(w => w.id !== id));
  const updateWidgetLabel = (id: string, newLabel: string) => {
    setWidgets(prev =>
      prev.map(w => w.id === id ?
        { ...w, label: newLabel } : w)
    );
  };
  useEffect(() => {
    const handleAddFromEvent = (event: any) => {
      const { id, type, label, diagramData } = event.detail;
      setActiveWidget(null);
      setWidgets((prev) => [
        ...prev,
        {
          id: id || crypto.randomUUID(),
          type: type || "diagram",
          label: label || "Nuevo elemento",
          diagramData: diagramData || {},
          x: 50 + prev.length * 30,
          y: 50 + prev.length * 30,
          width: 450,
          height: 450,
          chartRef: React.createRef() // <-- asignamos ref
        },
      ]);
    };
    window.addEventListener("addDiagramToDashboard", handleAddFromEvent);
    return () => window.removeEventListener("addDiagramToDashboard", handleAddFromEvent);
  }, []);
  useEffect(() => {
    const close = () => setActiveWidget(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  });
  return (
    <div
      className={`relative flex-1 min-h-screen transition-all duration-700 ${isActive ? "visible opacity-100" : "invisible opacity-0"}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Cabecera 
      <HeaderDashboard widgets={widgets} dashboardRef={dashboardRef}/> */}
      {/* Lienzo */}
      <div
        ref={canvasRef}
        className={`relative w-full h-[100vh] overflow-auto cursor-${mode === "move" ? (isPanning ? "grabbing" : "grab") : "default"}`}
        onMouseDown={onMousedown}
        onMouseMove={onMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div ref={dashboardRef}
          className="canvas-grid relative" style={{ transform: `scale(${zoom})` }}>
          <div ref={stageWrapperRef} className="absolute inset-0">
            <Stage
              ref={stageRef}
              width={DASHBOARD_SIZE}
              height={DASHBOARD_SIZE}
              onMouseDown={handleStageClick}
              onTouchStart={handleStageClick}
            >
              <Layer ref={layerRef}>
                <Rect width={DASHBOARD_SIZE} height={DASHBOARD_SIZE} fill="transparent" listening={false} />
                {elements.map((element) => (
                  <ElementNode
                    key={element.id}
                    element={element}
                    isSelected={selectedElementId === element.id}
                    isEditing={editingState?.id === element.id}
                    canDrag={mode === "select"}
                    onSelect={() => selectCanvasElement(element.id)}
                    onChange={(attrs) => updateCanvasElement(element.id, attrs)}
                    onEditRequest={startEditing}
                  />
                ))}
                <Transformer ref={transformerRef} rotateEnabled />
              </Layer>
            </Stage>

            {editingElement && editingBox && (
              <div
                className="absolute z-20 rounded-lg bg-white/90 p-2 shadow-lg ring-1 ring-emerald-400/80"
                style={{
                  top: editingBox.y,
                  left: editingBox.x,
                  width: editingBox.width,
                  minHeight: editingBox.height,
                  transformOrigin: "top left",
                  pointerEvents: "auto",
                }}
              >
                <div
                  ref={editableRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="w-full whitespace-pre-wrap outline-none"
                  data-preserve-selection
                  onInput={(e) => {
                    const value = e.currentTarget.innerText.replace(/\u00a0/g, " ");
                    setEditingState((prev) => (prev ? { ...prev, value } : prev));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.preventDefault();
                      stopEditing(false);
                    }
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                      e.preventDefault();
                      stopEditing(true);
                    }
                  }}
                  onBlur={() => stopEditing(true)}
                />
              </div>
            )}
          </div>
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
                  id={`widget-${widget.id}`}
                  ref={nodeRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveWidget(widget.id)
                  }}
                  className={`absolute border-2 rounded-lg p-2 shadow-md transition-all bg-white dark:bg-zinc-900
    ${activeWidget === widget.id ? "border-blue-500" : "border-2"}
  `}
                >
                  {activeWidget === widget.id && (
                    <div className="absolute -top-10 right-0 flex gap-2 
                bg-white dark:bg-zinc-800 
                px-3 py-2 rounded-xl border z-50
                shadow-[0_10px_12px_rgba(22,204,88,0.6)]">
                      <button
                        onClick={() => alert("Duplicar")}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg"
                      >
                        <img src='/src/icons/icons8-duplicate-90.png' className="w-7 h-7"></img>
                      </button>

                      <button
                        onClick={() => handleRemoveWidget(widget.id)}
                        className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded-l"
                      >
                        <img src='/src/icons/icons8-trash-512.png' className="w-7 h-7"></img>
                      </button>
                    </div>
                  )}
                  <div className="flex justify-center mb-2">
                    {editingWidgetId ? (
                      <EditableTitle
                        value={widget.label}
                        onChange={(newTitle) => updateWidgetLabel(widget.id, newTitle)}
                      />
                    ) :
                      <h3
                        onClick={() => setEditingWidgetId(widget.id)}

                        className="font-semibold justify-center text-light-text-primary dark:text-dark-text-primary">
                        {widget.label}
                      </h3>
                    }
                    {/*  <button
                      onClick={() => handleRemoveWidget(widget.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button> */}
                  </div>

                  <ResizableBox
                    width={widget.width}
                    height={widget.height}
                    minConstraints={[200, 150]}
                    resizeHandles={["s", "e", "n", "w", "ne", "nw", "se", "sw"]}
                    className="relative border border-transparent hover:border-green-500 rounded-md"
                    onResizeStop={(_, data) => {
                      setWidgets(prev =>
                        prev.map(w =>
                          w.id === widget.id
                            ? { ...w, width: data.size.width, height: data.size.height }
                            : w
                        )
                      );

                      if (widget.chartRef?.current?.chart) {
                        widget.chartRef.current.chart.reflow();
                      }

                    }}
                  >
                    {widget.diagramData ? (
                      <ChartDashboard data={widget.diagramData} ref={widget.chartRef} />
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
