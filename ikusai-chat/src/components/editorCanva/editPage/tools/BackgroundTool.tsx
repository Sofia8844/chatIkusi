import React from "react";
import { backgroundPalette } from "../constants";
import { useDesign } from "../../../../providers/DesignProvider";

const BackgroundTool: React.FC = () => {
  const { changeBackground } = useDesign();

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Background</h3>
        <span className="text-[11px] text-slate-500">Fondo</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {backgroundPalette.map((bg, idx) => (
          <button
            key={`${bg}-${idx}`}
            onClick={() => changeBackground(bg)}
            className="h-12 rounded-xl border border-white shadow-sm hover:scale-105 transition"
            style={{ background: bg }}
            aria-label={`Fondo ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BackgroundTool;
