import React from "react";
import { useDesign } from "../DesignProvider";

const LayerTool: React.FC = () => {
  const {
    currentPage,
    selectedElement,
    selectElement,
    bringToFront,
    sendToBack,
    deleteElement,
  } = useDesign();

  if (!currentPage) return null;

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Layer</h3>
        <span className="text-[11px] text-slate-500">Orden</span>
      </div>
      <div className="space-y-1">
        {currentPage.elements.length === 0 && (
          <p className="text-xs text-slate-500">Añade elementos para organizarlos.</p>
        )}
        {currentPage.elements.map((el) => (
          <div
            key={el.id}
            className={`flex items-center justify-between rounded-xl px-2 py-1 text-sm ${
              selectedElement?.id === el.id ? "bg-emerald-50 border border-emerald-200" : "bg-white"
            }`}
          >
            <button
              className="flex-1 text-left text-emerald-800"
              onClick={() => selectElement(el.id)}
            >
              {el.name} · {el.type}
            </button>
            <div className="flex items-center gap-1">
              <button
                className="rounded-lg bg-white px-2 py-1 text-xs text-emerald-700 border border-emerald-100"
                onClick={() => bringToFront(el.id)}
              >
                ↑
              </button>
              <button
                className="rounded-lg bg-white px-2 py-1 text-xs text-emerald-700 border border-emerald-100"
                onClick={() => sendToBack(el.id)}
              >
                ↓
              </button>
              <button
                className="rounded-lg bg-rose-100 px-2 py-1 text-xs text-rose-700 border border-rose-200"
                onClick={() => deleteElement(el.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LayerTool;
