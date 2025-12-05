import React from "react";
import { iconPalette } from "../constants";
import { useDesign } from "../DesignProvider";

const IconsTool: React.FC = () => {
  const { addIconElement } = useDesign();

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Icons</h3>
        <span className="text-[11px] text-slate-500">Vector</span>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {iconPalette.map((icon, idx) => (
          <button
            key={`${icon}-${idx}`}
            onClick={() => addIconElement(icon)}
            className="flex h-10 items-center justify-center rounded-xl bg-emerald-50 text-lg hover:bg-emerald-100"
          >
            {icon}
          </button>
        ))}
      </div>
    </section>
  );
};

export default IconsTool;
