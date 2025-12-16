import React from "react";
import { useDesign } from "../../../providers/DesignProvider";

const PageNavigation: React.FC = () => {
  const { state, currentPage, setCurrentPage, addPage, duplicatePage, deletePage } = useDesign();
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div
      className="pointer-events-none sticky bottom-4 z-30 w-full"
    >
      <div className="pointer-events-auto flex w-full items-end gap-4 overflow-x-auto rounded-3xl border border-white/70 bg-white/90 px-5 py-4 shadow-lg backdrop-blur">
        {state.pages.map((page, index) => {
          const isActive = currentPage?.id === page.id;
          const isMenuOpen = openMenuId === page.id;
          return (
            <div key={page.id} className="relative flex-shrink-0">
              <button
                onClick={() => setCurrentPage(page.id)}
                className={`group relative flex h-32 w-24 flex-shrink-0 items-end overflow-hidden rounded-2xl border text-left transition duration-200 ${
                  isActive
                    ? "border-emerald-300 ring-2 ring-emerald-300 shadow-emerald-200/70 shadow-xl"
                    : "border-slate-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                }`}
                style={{ background: page.background }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-slate-900/5" />
                <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-[2px] text-[10px] font-semibold text-emerald-700 shadow-sm">
                  #{index + 1}
                </div>
                <div className="pointer-events-none absolute inset-1 flex flex-col gap-1 rounded-xl bg-white/55 p-2 backdrop-blur-[2px]">
                  {page.elements.slice(0, 3).map((element) => {
                    const color =
                      element.type === "text"
                        ? "#0f172a"
                        : element.type === "image"
                        ? "#0ea5e9"
                        : "#10b981";
                    const widthPercent = Math.max(
                      30,
                      Math.min(92, ((element.width ?? 280) / 620) * 100)
                    );
                    return (
                      <span
                        key={element.id}
                        className="h-1.5 rounded-full opacity-80"
                        style={{
                          width: `${widthPercent}%`,
                          background: color,
                          boxShadow: "0 6px 15px rgba(15,23,42,0.12)",
                        }}
                      />
                    );
                  })}
                </div>
                <div className="relative w-full px-2 pb-2 pt-16 text-left">
                  <p className="truncate text-[11px] font-semibold text-slate-800">{page.name}</p>
                  <p className="text-[10px] text-slate-500">Miniatura</p>
                </div>
              </button>

              <div className="absolute right-1.5 top-1.5">
                <button
                  className="rounded-full bg-white/90 px-2 py-[2px] text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(isMenuOpen ? null : page.id);
                  }}
                  aria-haspopup="menu"
                  aria-expanded={isMenuOpen}
                >
                  ⋮
                </button>
                {isMenuOpen && (
                  <div
                    className="absolute right-0 z-20 mt-1 w-36 rounded-xl border border-slate-200 bg-white/95 text-left shadow-xl backdrop-blur"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => {
                        duplicatePage(page.id);
                        setOpenMenuId(null);
                      }}
                    >
                      📄 Duplicar
                    </button>
                    <button
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                      onClick={() => {
                        deletePage(page.id);
                        setOpenMenuId(null);
                      }}
                      disabled={state.pages.length <= 1}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <button
          onClick={addPage}
          className="flex h-32 w-24 flex-shrink-0 items-center justify-center rounded-2xl border border-dashed border-emerald-300 bg-gradient-to-br from-emerald-400 to-sky-400 text-2xl font-bold text-white shadow-lg shadow-emerald-200/60 transition hover:-translate-y-1 hover:from-emerald-500 hover:to-sky-500"
          aria-label="Agregar página"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;
