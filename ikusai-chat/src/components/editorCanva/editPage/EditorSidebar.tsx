import React, { useMemo, useState } from "react";
import BackgroundTool from "./tools/BackgroundTool";
import ColorsTool from "./tools/ColorsTool";
import IconsTool from "./tools/IconsTool";
import LayerTool from "./tools/LayerTool";
import MyDesigns from "./tools/MyDesigns";
import PhotosTool from "./tools/PhotosTool";
import TemplatesTool from "./tools/TemplatesTool";
import TextTool from "./tools/TextTool";
import UploadTool from "./tools/UploadTool";

type ToolId =
  | "myDesigns"
  | "templates"
  | "text"
  | "photos"
  | "icons"
  | "uploads"
  | "background"
  | "layers"
  | "colors";

const EditorSidebar: React.FC = () => {
  const [openTool, setOpenTool] = useState<ToolId | null>(null);
  const isToolOpen = !!openTool;

  const toolIcons: Record<ToolId, string> = useMemo(
    () => ({
      myDesigns: "🗂️",
      templates: "📑",
      text: "🔤",
      photos: "📸",
      icons: "✨",
      uploads: "⤴️",
      background: "🎨",
      layers: "🧩",
      colors: "🌈",
    }),
    []
  );

  const tools: { id: ToolId; label: string; component: React.ReactNode }[] = [
    { id: "myDesigns", label: "Mis diseños", component: <MyDesigns /> },
    { id: "templates", label: "Plantillas", component: <TemplatesTool /> },
    { id: "text", label: "Texto", component: <TextTool /> },
    { id: "photos", label: "Fotos", component: <PhotosTool /> },
    { id: "icons", label: "Íconos", component: <IconsTool /> },
    { id: "uploads", label: "Subidas", component: <UploadTool /> },
    { id: "background", label: "Fondo", component: <BackgroundTool /> },
    { id: "layers", label: "Capas", component: <LayerTool /> },
    { id: "colors", label: "Colores", component: <ColorsTool /> },
  ];

  const activeTool = tools.find((tool) => tool.id === openTool);

  return (
    <aside
      data-preserve-selection
      className={`flex flex-shrink-0 rounded-3xl bg-white/40 p-3 shadow-xl backdrop-blur-xl border border-white/50 transition-[width] duration-200 ${
        isToolOpen ? "w-[430px]" : "w-[220px]"
      }`}
    >
      <div className="flex gap-3 w-full">
        <div className="flex w-32 flex-col gap-2 rounded-2xl border border-white/60 bg-white/60 p-2 shadow-sm">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setOpenTool((current) => (current === tool.id ? null : tool.id))}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold transition ${
                openTool === tool.id
                  ? "bg-white text-emerald-800 border border-emerald-200 shadow"
                  : "text-slate-700 hover:bg-white/90"
              }`}
            >
              <span className="text-xl" aria-hidden>
                {toolIcons[tool.id]}
              </span>
              <span className="text-[11px] leading-tight text-center">{tool.label}</span>
            </button>
          ))}
        </div>

        {activeTool && (
          <div className="flex-1 rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-3 shadow-inner">
            <div className="h-full overflow-y-auto">{activeTool.component}</div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default EditorSidebar;
