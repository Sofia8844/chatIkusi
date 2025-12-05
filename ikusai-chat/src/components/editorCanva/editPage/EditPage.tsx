import React, { useRef } from "react";
import type Konva from "konva";
import DesignCanvas from "./DesignCanvas";
import { DesignProvider, useDesign } from "./DesignProvider";
import EditorSidebar from "./EditorSidebar";
import EditorToolbar from "./EditorToolbar";
import PageNavigation from "./PageNavigation";

const ExampleActions: React.FC = () => {
  const { addTextElement, addIconElement, addImageElement, changeBackground, applyTemplate,
    } =
    useDesign();

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/50 bg-white/60 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-sm font-semibold text-emerald-800">Ejemplos de interacción:</p>
      <button
        onClick={() => addTextElement("Texto hero destacado", 40)}
        className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800"
      >
        Agregar texto
      </button>
      <button
        onClick={() =>
          addImageElement(
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=60",
            "Foto tech"
          )
        }
        className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800"
      >
        Añadir imagen
      </button>
      <button
        onClick={() => addIconElement("★")}
        className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800"
      >
        Insertar icono
      </button>
      <button
        onClick={() => changeBackground("linear-gradient(120deg, #e0f2fe 0%, #a5f3fc 50%, #d1fae5 100%)")}
        className="rounded-full bg-gradient-to-r from-emerald-200 to-sky-200 px-3 py-1 text-xs font-semibold text-emerald-900"
      >
        Cambiar fondo
      </button>
      <button
        onClick={() => applyTemplate("template-green-welcome")}
        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-100"
      >
        Usar plantilla
      </button>
    </div>
  );
};

const EditorContent: React.FC = () => {
    const {  showDashboard } =
    useDesign();

  const stageRef = useRef<Konva.Stage>(null);

  const handleDownload = (format: "png" | "jpg") => {
    const stage = stageRef.current;
    if (!stage) return;
    const uri = stage.toDataURL({
      pixelRatio: 2,
      mimeType: format === "jpg" ? "image/jpeg" : "image/png",
      quality: 0.95,
    });
    const link = document.createElement("a");
    link.download = `ikusai-design-${Date.now()}.${format}`;
    link.href = uri;
    link.click();
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] w-full max-w-[1440px] gap-4 overflow-y-auto p-5 text-slate-800">
      <EditorSidebar />
      <div className="flex flex-1 flex-col gap-4">
        <EditorToolbar onDownload={handleDownload} />
        <ExampleActions />
        <div className="relative flex-1 min-h-[640px] pb-16">
          <DesignCanvas stageRef={stageRef} />
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <div className="pointer-events-auto">
              <PageNavigation />
            </div>
          </div>


      
        </div>
      </div>
    </div>
  );
};

const EditPage: React.FC = () => {
  return (
    <DesignProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-cyan-100 p-4">
        <div className="flex items-center justify-between px-2 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-500">Ikusito Diseño</p>
            <h1 className="text-2xl font-bold text-emerald-900">Editor IKUSI</h1>
            <p className="text-sm text-slate-600">
              Múltiples páginas, capas, descargas PNG/JPG, plantillas y zoom.
            </p>
          </div>
          <div className="rounded-full bg-white/70 px-4 py-2 text-sm text-emerald-700 shadow">
            Bienvenido Usuario, Sofia
          </div>
        </div>
        <EditorContent />
      </div>
    </DesignProvider>
  );
};

export default EditPage;
