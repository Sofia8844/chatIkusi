import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import InfoSources from "./InfoSource";
interface Props {
  data: {
    answer?: string;
    images?: {
      image_path: string;
      description?: string;
    }[];
    info_source?: string[];
  };
  setHasImages?: (flag: boolean) => void;


}

export default function ImageRenderer({ data, setHasImages }: Props) {
  if (!data.images || data.images.length === 0) return null;

  const mainImage = data.images[0];
  const extraImages = data.images.slice(1);
  const [preview, setPreview] = useState<string | null>(null);
  const openPreview = (src: string) => setPreview?.(src);
  const closePreview = () => setPreview?.(null);
  const handleDragStartPreview = (e: React.DragEvent<HTMLImageElement>, src:string) => {
      console.log("Drag iniciado con:", src);
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "image", src: src })
    );
  }
  useEffect(() => {
    setHasImages?.(true);
  }, [setHasImages]);
  return (
    <>
      <div className="w-full max-w-4xl px-6 flex flex-col gap-6">
        {/* TEXTO */}
        {data.answer && (
          <p className="text-[16.5px] leading-[1.75] tracking-[0.01em] text-gray-800 dark:text-gray-100">
            {data.answer}
          </p>
        )}

        {/* IMAGEN PRINCIPAL */}
        <div className="bg-white dark:bg-zinc-900 border rounded-2xl overflow-hidden shadow-sm">
          <div className="relative aspect-[16/9] bg-gray-50 dark:bg-zinc-800">
            <img
              src={mainImage.image_path}
              alt={mainImage.description}
              className="w-full h-full object-contain p-6 cursor-pointer"
              loading="lazy"
              onClick={() => openPreview(mainImage.image_path)}
            />
          </div>
          {mainImage.description && (
            <div className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
              {mainImage.description}
            </div>
          )}
        </div>

        {/* PREVIEWS */}
        {extraImages.length > 0 && (
          <div className="flex gap-3"
          >
            {extraImages.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className="relative group w-32 h-20 rounded-lg overflow-hidden border cursor-pointer"
                onClick={() => openPreview(img.image_path)}
                 onDragStart={(e) => handleDragStartPreview(e, img.image_path)}
                  draggable ={true}
              >
                <img
                  src={img.image_path}
                  alt={img.description}
                  data-src={img.image_path}
                  className="w-full h-full object-cover"
                  loading="lazy"

                />
                {img.description && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 flex items-end transition">
                    <p className="text-xs text-white p-2 opacity-0 group-hover:opacity-100 line-clamp-3">
                      {img.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {extraImages.length > 4 && (
              <div className="w-32 h-20 flex items-center justify-center rounded-lg border border-dashed text-sm text-gray-500 dark:text-gray-400">
                +{extraImages.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
      {/* MODAL */}
      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closePreview} // solo cierra si haces clic en el fondo
        >
          <div
            className="relative"
          // evita que el clic en la imagen cierre el modal
          >
            <img
              src={preview}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl bg-white p-6"
            />
          </div>
        </div>

      )}
      {/* Resources */}
      <InfoSources data={data} />
    </>
  );
}
