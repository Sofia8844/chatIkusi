import React, { useState } from "react";
import { useDesign } from "../../../providers/DesignProvider";
import { createPortal } from "react-dom"
interface EditorExportsProps {
      onDownload: (format: "png" | "jpg") => void;
    previewImage?: string; // base64 o URL
}

const EditorExports: React.FC<EditorExportsProps> = ({ onDownload,  previewImage }) => {
    const { addPage, undo, redo, canUndo, canRedo, zoom, setZoom, openDashboard } = useDesign();
    const [showExportPanel, setShowExportPanel] = useState(false)

    return (
        <>
            {/* TOOLBAR PRINCIPAL */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/50 bg-white/30 px-4 py-3 shadow-lg backdrop-blur-xl">
                <div className="flex gap-2">
                    {/* Botón que abre el panel */}
                    <button
                        onClick={() => setShowExportPanel(true)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow hover:scale-[1.01] transition"
                    >
                        Exportar
                    </button>

                </div>

            </div>

            {/* PANEL LATERAL IZQUIERDO */}
            {showExportPanel && createPortal(
                <div
                    className={`
    fixed right-0 top-0 h-full w-[680px] z-[9999]
    transform transition-transform duration-300 animate-slideLeft
    bg-gradient-to-b from-cyan-100/50 via-green-100/50 to-blue-200/50
    backdrop-blur-2xl border-l border-white/40 shadow-2xl 
  `}
                >

                    {/* HEADER */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/40">
                        <h2 className="text-2xl font-semibold text-emerald-900 drop-shadow">
                            Exportar diseño
                        </h2>

                        <button onClick={() => setShowExportPanel(false)}>
                            <span className="text-gray-700 hover:text-black text-xl font-bold">
                                ✕
                            </span>
                        </button>
                    </div>

                    {/* CONTENIDO SCROLLEABLE */}
                    <div className="flex h-full overflow-y-auto p-6 gap-6">

                        {/* PREVIEW */}
                        <div className="flex-1 flex items-center justify-center">
                            <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/30">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        className="max-w-[380px] max-h-[380px] rounded-xl shadow-lg"
                                    />
                                ) : (
                                    <p className="text-gray-600">Sin vista previa</p>
                                )}
                            </div>
                        </div>

                        {/* FORMATS */}
                        <div className="w-[220px] flex flex-col items-center gap-8">

                            {/* TÍTULO */}
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-emerald-900 drop-shadow">
                                    Formatos disponibles
                                </h3>
                                <p className="text-sm text-gray-700 opacity-80">
                                    Selecciona un formato
                                </p>
                            </div>

                            {/* PNG */}
                            <button
                                onClick={() => onDownload("png")}
                                className="flex flex-col items-center gap-2 hover:scale-105 transition"
                            >
                                <div className="bg-white/60 backdrop-blur-xl p-3 rounded-2xl shadow border border-white/30">
                                    <img src="/src/icons/icons8-png-96.png" className="w-14 h-14" />
                                </div>
                                <span className="text-sm font-semibold text-emerald-900">PNG</span>
                            </button>

                            {/* JPG */}
                            <button
                                onClick={() => onDownload("jpg")}
                                className="flex flex-col items-center gap-2 hover:scale-105 transition"
                            >
                                <div className="bg-white/60 backdrop-blur-xl p-3 rounded-2xl shadow border border-white/30">
                                    <img src="/src/icons/icons8-jpg-96.png" className="w-14 h-14" />
                                </div>
                                <span className="text-sm font-semibold text-emerald-900">JPG</span>
                            </button>

                            {/* PDF */}
                            <button className="flex flex-col items-center gap-2 hover:scale-105 transition">
                                <div className="bg-white/60 backdrop-blur-xl p-3 rounded-2xl shadow border border-white/30">
                                    <img src="/src/icons/icons8-pdf-96.png" className="w-14 h-14" />
                                </div>
                                <span className="text-sm font-semibold text-emerald-900">PDF</span>
                            </button>

                        </div>
                    </div>
                </div>,
                 document.body

            )}
        </>
    );
};
export default EditorExports
    ;
