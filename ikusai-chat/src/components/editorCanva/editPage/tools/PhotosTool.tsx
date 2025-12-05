import React from "react";
import { samplePhotos } from "../constants";
import { useDesign } from "../DesignProvider";

const PhotosTool: React.FC = () => {
  const { addImageElement } = useDesign();

  return (
    <section className="space-y-2 rounded-2xl border border-white/50 bg-white/70 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-emerald-800">Photos</h3>
        <span className="text-[11px] text-slate-500">Unsplash</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {samplePhotos.map((photo) => (
          <button
            key={photo}
            onClick={() => addImageElement(photo, "Foto")}
            className="group relative h-20 overflow-hidden rounded-xl border border-emerald-100"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${photo})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <span className="absolute bottom-1 left-2 text-[11px] font-semibold text-white">
              Añadir
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default PhotosTool;
