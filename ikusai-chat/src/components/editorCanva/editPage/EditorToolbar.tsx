import React from "react";
import { useDesign } from "../../../providers/DesignProvider";
import EditorExports from "./EditorExports";

interface EditorToolbarProps {
  onDownload: (format: "png" | "jpg") => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onDownload }) => {
  const { addPage, undo, redo, canUndo, canRedo, zoom, setZoom, openDashboard,removeWidgets } = useDesign();
  return (

  <div className="relative flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/50 bg-white/30 px-4 py-3 shadow-lg backdrop-blur-xl">
      <div className="flex gap-6 items-center flex-grow">
        <button
          onClick={addPage}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700"
        >
          Añadir página
        </button>
            <button
          onClick={() => {openDashboard(); removeWidgets()}}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow hover:scale-[1.01] transition"
        >
         Pizarra
        </button>
        <div className="relative">
       <EditorExports   onDownload={onDownload} previewImage="https://template.canva.com/EAF61wu7Pgk/2/0/600w-sOiE5b9j4f4.jpg"/>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="px-3 py-2 rounded-lg bg-white border border-emerald-100 text-emerald-700 disabled:opacity-40"
        >
          ⟲ Undo
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="px-3 py-2 rounded-lg bg-white border border-emerald-100 text-emerald-700 disabled:opacity-40"
        >
          ⟳ Redo
        </button>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 border border-white/40">
          <span className="text-sm text-slate-600">Zoom</span>
          <input
            type="range"
            min={0.5}
            max={1}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="accent-emerald-500"
          />
          <span className="text-sm text-emerald-700 font-semibold">{Math.round(zoom * 100)}%</span>
        </div>

      </div>
    </div>
  );
};

export default EditorToolbar;
