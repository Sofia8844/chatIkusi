import React, { useState } from "react";
import { quickTextBlocks } from "../constants";
import { useDesign } from "../DesignProvider";
import type { TextElement } from "../types";

const TextTool: React.FC = () => {
  const { addTextElement, selectedElement, updateElement } = useDesign();
  const [customText, setCustomText] = useState("Texto editable");

  const selectedText = selectedElement?.type === "text" ? (selectedElement as TextElement) : null;

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Text</h3>
        <span className="text-[11px] text-slate-500">Añade y edita</span>
      </div>
      <div className="flex gap-2">
        <input
          className="w-full rounded-xl border border-emerald-100 px-2 py-1 text-sm"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Escribe un texto"
        />
        <button
          onClick={() => addTextElement(customText)}
          className="rounded-xl bg-emerald-500 px-3 py-1 text-white shadow hover:bg-emerald-600"
        >
          Añadir
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {quickTextBlocks.map((block) => (
          <button
            key={block.label}
            onClick={() => addTextElement(block.value, block.fontSize)}
            className="rounded-xl border border-emerald-100 bg-emerald-50 px-2 py-3 text-left text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            {block.label}
          </button>
        ))}
      </div>

      {selectedText && (
        <div className="rounded-xl border border-white/60 bg-white/80 p-2 text-xs text-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-emerald-700">Editar texto</span>
            <span className="text-[11px] text-slate-400">Elemento activo</span>
          </div>
          <textarea
            value={selectedText.text}
            onChange={(e) => updateElement(selectedText.id, { text: e.target.value })}
            className="w-full rounded-lg border border-emerald-100 p-2 text-sm"
            rows={2}
          />
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-500">Tamaño</label>
            <input
              type="range"
              min={12}
              max={64}
              value={selectedText.fontSize}
              onChange={(e) =>
                updateElement(selectedText.id, { fontSize: Number(e.target.value) })
              }
              className="flex-1 accent-emerald-500"
            />
            <span className="text-xs font-semibold text-emerald-700">{selectedText.fontSize}px</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default TextTool;
