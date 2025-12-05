import React from "react";
import { useDesign } from "../DesignProvider";

const TemplatesTool: React.FC = () => {
  const { templates, applyTemplate } = useDesign();

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Templates</h3>
        <span className="text-[11px] text-slate-500">1 click</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => applyTemplate(template.id)}
            className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white text-left shadow hover:shadow-md transition"
          >
            <div
              className="h-20 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${template.thumbnail})` }}
            />
            <div className="p-2">
              <p className="text-xs font-semibold text-emerald-800">{template.name}</p>
              <p className="text-[11px] text-slate-500">{template.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TemplatesTool;
