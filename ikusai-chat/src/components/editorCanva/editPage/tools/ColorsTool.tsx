import React from "react";
import { useDesign } from "../DesignProvider";

const palette = ["#0f766e", "#0ea5e9", "#0ea5e9", "#34d399", "#22c55e", "#0f172a", "#f97316"];

const ColorsTool: React.FC = () => {
  const { selectedElement, updateElement, changeBackground } = useDesign();

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Colors</h3>
        <span className="text-[11px] text-slate-500">Texto/Fondo</span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {palette.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            className="h-9 rounded-full border border-white shadow-sm hover:scale-105 transition"
            onClick={() => {
              if (selectedElement) {
                updateElement(selectedElement.id, { fill: color });
              } else {
                changeBackground(color);
              }
            }}
            aria-label={`Aplicar color ${color}`}
          />
        ))}
      </div>
      <p className="text-[11px] text-slate-500">
        Si hay un elemento seleccionado, aplicamos el color al texto/icono. Si no, se usa como
        fondo.
      </p>
    </section>
  );
};

export default ColorsTool;
