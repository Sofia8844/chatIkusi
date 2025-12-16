import React, { useRef } from "react";
import { useDesign } from "../../../../providers/DesignProvider";

const UploadTool: React.FC = () => {
  const { addImageElement } = useDesign();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") {
        addImageElement(ev.target.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Upload</h3>
        <span className="text-[11px] text-slate-500">Imágenes propias</span>
      </div>
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
      >
        Seleccionar archivo
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <p className="text-[11px] text-slate-500">
        Usa PNG/JPG para añadir logos, fotos o capturas. Se agregan al lienzo automáticamente.
      </p>
    </section>
  );
};

export default UploadTool;
