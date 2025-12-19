import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Rect, Stage, Text, Transformer } from "react-konva";
import type Konva from "konva";
import { useDesign } from "../../../providers/DesignProvider";
import type { CanvasElement, IconElement, ImageElement, TextElement } from "./types";
import DashboardCanvas from "../../DashboardPanel";
import type{ Widget } from "../../../types/chat";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import ChartDashboard from "../../dashboardComponents/ChartsDashboardHig";


const PAGE_RATIO = 11 / 8.5; // Proporción similar a una hoja carta

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
  onSelect: () => void;
  onChange: (attrs: Partial<CanvasElement>) => void;
  onEditRequest: (element: TextElement) => void;
}

const ElementNode: React.FC<ElementNodeProps> = ({
  element,
  isSelected,
  isEditing,
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
    draggable: !isEditing,
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
      <Text
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
      <Text
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

interface DesignCanvasProps {
  stageRef: React.RefObject<Konva.Stage>;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({ stageRef }) => {
  const {
    currentPage,
    selectedElement,
    selectElement,
    updateElement,
    deleteSelected,
    addImageElement,
    zoom,
    showDashboard,       // <- nuevo
    closeDashboard,      // <- nuevo
  } = useDesign();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const editingSessionRef = useRef<string | null>(null);
  const [size, setSize] = useState({ width: 880, height: 880 * PAGE_RATIO });
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [mode, setMode] = useState<"select" | "move">("select");
  const [activeWidget, setActiveWidget] = useState(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
const [editingWidgetId, setEditingWidgetId] = useState('');
  const [editingState, setEditingState] = useState<{
    id: string;
    value: string;
    original: string;
  } | null>(null);
  const startEditing = useCallback(
    (element: TextElement) => {
      selectElement(element.id);
      setEditingState({ id: element.id, value: element.text, original: element.text });
    },
    [selectElement]
  );

  const stopEditing = useCallback(
    (commit: boolean) => {
      if (!editingState) return;
      if (commit && editingState.value !== editingState.original) {
        updateElement(editingState.id, { text: editingState.value });
      }
      setEditingState(null);
    },
    [editingState, updateElement]
  );


  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (!width || !height) return;
        const workspaceWidth = Math.max(520, width - 96);
        const workspaceHeight = Math.max(560, height - 180);
        const candidateWidth = Math.min(workspaceWidth, workspaceHeight / PAGE_RATIO);
        const finalWidth = Math.max(520, candidateWidth);
        const finalHeight = finalWidth * PAGE_RATIO;
        setSize({ width: finalWidth, height: finalHeight });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (editingState) return;
      if (event.key === "Delete") deleteSelected();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [deleteSelected, editingState]);

  useEffect(() => {
    if (!transformerRef.current || !layerRef.current) return;
    if (selectedElement) {
      const node = layerRef.current.findOne(`#${selectedElement.id}`) as Konva.Node | undefined;
      if (node) {
        transformerRef.current.nodes([node]);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else {
      transformerRef.current.nodes([]);
    }
  }, [selectedElement]);

  useEffect(() => {
    if (editingState && selectedElement?.id !== editingState.id) {
      setEditingState((prev) => {
        if (!prev) return prev;
        if (prev.value !== prev.original) {
          updateElement(prev.id, { text: prev.value });
        }
        return null;
      });
    }
  }, [editingState, selectedElement?.id, updateElement]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".tippy-box")) return;
      if (target?.closest("[data-preserve-selection]")) return;
      if (!canvasWrapperRef.current) return;
      if (!canvasWrapperRef.current.contains(target)) {
        if (editingState) {
          stopEditing(true);
        }
        selectElement(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingState, selectElement, stopEditing]);

  const handleBackgroundClick = () => {
    if (editingState) {
      stopEditing(true);
    }
    selectElement(null);
  };

  const editableRef = useRef<HTMLDivElement>(null);
  const editingElement = useMemo(() => {
    if (!editingState || !currentPage) return null;
    const element = currentPage.elements.find((el) => el.id === editingState.id);
    if (!element || element.type !== "text") return null;
    return element as TextElement;
  }, [currentPage, editingState]);
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



  const editingBox = useMemo(() => {
    if (!editingElement) return null;
    const scale = zoom || 1;
    return {
      x: editingElement.x * scale,
      y: editingElement.y * scale,
      width: editingElement.width * scale,
      height: Math.max(editingElement.height * scale, editingElement.fontSize * 1.5 * scale),
    };
  }, [editingElement, zoom]);

  const backgroundProps = useMemo(() => {
    const bg = currentPage?.background ?? "#f8fafc";
    const colors = bg.match(/#(?:[0-9a-fA-F]{3,6})/g);
    if (bg.includes("linear-gradient") && colors?.length) {
      return {
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: size.width, y: size.height },
        fillLinearGradientColorStops: [
          0,
          colors[0],
          0.5,
          colors[1] ?? colors[0],
          1,
          colors[2] ?? colors[1] ?? colors[0],
        ],
      };
    }
    return { fill: bg };
  }, [currentPage?.background, size.height, size.width]);

  if (!currentPage) {
    return (
      <div className="flex flex-1 items-center justify-center text-slate-600">
        Selecciona o crea una página.
      </div>
    );
  }
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = e.dataTransfer.getData("application/json");
      if (!data) return;

      const parsed = JSON.parse(data);
      const { id, type, label, diagramData } = parsed;
      
    if (parsed.type === "image" && parsed.src) {
      if (!stageRef.current) return;
      const stage = stageRef.current;
      const pointer = stage.getPointerPosition() || { x: 50, y: 50 };
      addImageElement(parsed.src, "Imagen arrastrada", 310, 200);
    }
      if( parsed.type !== "image"){
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
      }
      
   
      
    } catch (error) {
      console.error(" Error al procesar el drop:", error);
    }
  };
    const handleRemoveWidget = (id: string) => setWidgets(prev => prev.filter(w => w.id !== id));


  const scaledWidth = size.width * zoom;
  const scaledHeight = size.height * zoom;
  const canvasWrapperStyle = { width: scaledWidth, height: scaledHeight };
  const stageCanvas = (
    <div
      className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
      ref={canvasWrapperRef}
      style={canvasWrapperStyle}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Stage
        width={scaledWidth}
        height={scaledHeight}
        ref={stageRef}
        scaleX={zoom}
        scaleY={zoom}
        style={{ zIndex: 0, position: "absolute" }}
        className={editingState ? "cursor-text" : "cursor-crosshair"}
        onMouseDown={(e) => {
          const target = e.target;
          const clickedOnStage = target === e.target.getStage();
          const clickedOnBackground = target?.getAttr("name") === "canvas-background";
          if (clickedOnStage || clickedOnBackground) {
            handleBackgroundClick();
          }
        }}
        onTouchStart={(e) => {
          const target = e.target;
          const clickedOnStage = target === e.target.getStage();
          const clickedOnBackground = target?.getAttr("name") === "canvas-background";
          if (clickedOnStage || clickedOnBackground) {
            handleBackgroundClick();
          }
        }}
      >
        <Layer ref={layerRef}>
          <Rect
            name="canvas-background"
            width={size.width}
            height={size.height}
            {...backgroundProps}
          />
          {currentPage.elements.map((element) => (
            <ElementNode
              key={element.id}
              element={element}
              isSelected={selectedElement?.id === element.id}
              isEditing={editingState?.id === element.id}
              onSelect={() => selectElement(element.id)}
              onChange={(attrs) => updateElement(element.id, attrs)}
              onEditRequest={startEditing}
            />
          ))}
          <Transformer
            ref={transformerRef}
            rotateEnabled
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
              "top-center",
              "bottom-center",
              "middle-left",
              "middle-right",
            ]}
            anchorSize={8}
            borderStroke="#22c55e"
            borderStrokeWidth={1.5}
            anchorStroke="#0ea5e9"
            anchorFill="#0ea5e9"
          />
       
        </Layer>
      </Stage>
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
                         className={`absolute z-20 transition-all 
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
        
                              if (widget.chartRef?.current &&  widget.chartRef.current.chart) {
                                widget.chartRef.current.chart.reflow();
                              }
        
                            }}
                          >
                            {widget.diagramData && widget.diagramData.type !== "text_with_image" ? (
                              <ChartDashboard data={widget.diagramData} ref={widget.chartRef} />
                            ) : (
                              <p className="text-gray-500 text-center py-10">Sin datos</p>
                            )}
                          </ResizableBox>
                        </div>
                      </Draggable>
                    );
                  })}

      {editingElement && editingBox && (
        <div
          className="absolute rounded-lg border border-emerald-200/70 bg-white/60 px-2 py-1 shadow-sm"
          style={{
            top: editingBox.y,
            left: editingBox.x,
            width: editingBox.width,
            minHeight: editingBox.height,
            fontSize: editingElement.fontSize * zoom,
            fontFamily: editingElement.fontFamily,
            color: editingElement.fill ?? "#0f172a",
            fontStyle: editingElement.fontStyle?.includes("italic") ? "italic" : "normal",
            fontWeight: editingElement.fontStyle?.includes("bold") ? "700" : "400",
            textAlign: editingElement.align ?? "left",
            lineHeight: 1.4,
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
  );

  const dashboardCanvas = (
    <div
      className="relative overflow-hidden min-h-[640px] h-[500px] rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.18)]"

    >
        <DashboardCanvas isActive onClose={closeDashboard} />
      <button
        type="button"
        onClick={closeDashboard}
        className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
      >
        Volver al lienzo
      </button>
    </div>
  );

  return (
     <div
      ref={containerRef}
      className=
      
       {showDashboard ? "relative h-full w-full overflow-hidden" : "relative flex h-full w-full items-center justify-center overflow-auto rounded-[32px] border border-white/50 bg-gradient-to-br from-white/75 via-white to-emerald-50/70 p-8 shadow-2xl backdrop-blur-xl"}
      
    >
      {showDashboard ? dashboardCanvas : stageCanvas}
    </div>
 
  );
};

export default DesignCanvas;
