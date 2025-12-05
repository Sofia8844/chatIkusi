import React, { useState } from "react";
import { useDesign } from "../DesignProvider";

const MyDesigns: React.FC = () => {
  const {
    state: { savedDesigns },
    saveDesign,
    loadDesign,
  } = useDesign();
  const [name, setName] = useState("Borrador creativo");

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">My Designs</h3>
        <span className="text-[11px] text-slate-500">Guarda y recupera</span>
      </div>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-emerald-100 px-2 py-1 text-sm"
          placeholder="Nombre del diseño"
        />
        <button
          onClick={() => name.trim() && saveDesign(name.trim())}
          className="rounded-xl bg-emerald-500 px-3 py-1 text-white shadow hover:bg-emerald-600"
        >
          Guardar
        </button>
      </div>
      <div className="space-y-1">
        {savedDesigns.length === 0 && (
          <p className="text-xs text-slate-500">Guarda un diseño para verlo aquí.</p>
        )}
        {savedDesigns.map((design) => (
          <button
            key={design.id}
            onClick={() => loadDesign(design.id)}
            className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-left text-sm text-emerald-700 hover:bg-emerald-50"
          >
            <span>{design.name}</span>
            <span className="text-[11px] text-slate-400">
              {new Date(design.createdAt).toLocaleTimeString()}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MyDesigns;
