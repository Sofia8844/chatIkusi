import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { backgroundPalette, starterTemplates } from "./constants";
import type {
  CanvasElement,
  DesignPage,
  EditorState,
  TemplatePreset,
} from "./types";

interface DesignContextValue {
  state: EditorState;
  templates: TemplatePreset[];
  currentPage: DesignPage | undefined;
  selectedElement: CanvasElement | undefined;
  addPage: () => void;
  duplicatePage: (pageId: string) => void;
  deletePage: (pageId: string) => void;
  setCurrentPage: (pageId: string) => void;
  addTextElement: (value: string, fontSize?: number) => void;
  addImageElement: (src: string, name?: string) => void;
  addIconElement: (text: string) => void;
  applyTemplate: (templateId: string) => void;
  changeBackground: (value: string) => void;
  selectElement: (id: string | null) => void;
  updateElement: (id: string, attrs: Partial<CanvasElement>) => void;
  deleteSelected: () => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  deleteElement: (id: string) => void;
  saveDesign: (name: string) => void;
  loadDesign: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  setZoom: (value: number) => void;
}

const DesignContext = createContext<DesignContextValue | null>(null);

const cloneState = (value: EditorState): EditorState =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));

const defaultPage: DesignPage = {
  id: "page-1",
  name: "Página 1",
  background: backgroundPalette[0],
  elements: [
    {
      id: "welcome-title",
      type: "text",
      name: "Título de portada",
      text: "Lienzo Ikusai",
      x: 120,
      y: 110,
      width: 400,
      height: 80,
      fontSize: 40,
      fontFamily: "Inter",
      fontStyle: "bold",
      fill: "#065f46",
      align: "left",
    },
    {
      id: "welcome-sub",
      type: "text",
      name: "Subtítulo",
      text: "Arrastra elementos, usa plantillas y exporta en segundos.",
      x: 120,
      y: 170,
      width: 460,
      height: 60,
      fontSize: 20,
      fontFamily: "Inter",
      fontStyle: "normal",
      fill: "#0ea5e9",
      align: "left",
    },
    {
      id: "welcome-icon",
      type: "icon",
      name: "Icono",
      text: "✺",
      x: 620,
      y: 140,
      width: 90,
      height: 90,
      fontSize: 72,
      fill: "#0d9488",
    },
  ],
};

export const DesignProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<EditorState>({
    pages: [defaultPage],
    currentPageId: defaultPage.id,
    selectedElementId: null,
    zoom: 1,
    savedDesigns: [],
  });
  const [past, setPast] = useState<EditorState[]>([]);
  const [future, setFuture] = useState<EditorState[]>([]);

  const pushHistory = useCallback((snapshot: EditorState) => {
    setPast((history) => [...history.slice(-14), cloneState(snapshot)]);
    setFuture([]);
  }, []);

  const commit = useCallback(
    (updater: (draft: EditorState) => void) => {
      setState((prev) => {
        const snapshot = cloneState(prev);
        const draft = cloneState(prev);
        updater(draft);
        pushHistory(snapshot);
        return draft;
      });
    },
    [pushHistory]
  );

  const currentPage = useMemo(
    () => state.pages.find((page) => page.id === state.currentPageId),
    [state.currentPageId, state.pages]
  );

  const selectedElement = useMemo(() => {
    if (!state.selectedElementId || !currentPage) return undefined;
    return currentPage.elements.find((el) => el.id === state.selectedElementId);
  }, [state.selectedElementId, currentPage]);

  const setCurrentPage = (pageId: string) => {
    setState((prev) => ({ ...prev, currentPageId: pageId, selectedElementId: null }));
  };

  const addPage = () => {
    commit((draft) => {
      const id = `page-${draft.pages.length + 1}`;
      draft.pages.push({
        id,
        name: `Página ${draft.pages.length + 1}`,
        background: backgroundPalette[(draft.pages.length + 1) % backgroundPalette.length],
        elements: [],
      });
      draft.currentPageId = id;
      draft.selectedElementId = null;
    });
  };

  const duplicatePage = (pageId: string) => {
    commit((draft) => {
      const index = draft.pages.findIndex((p) => p.id === pageId);
      const source = draft.pages[index];
      if (!source) return;

      const id = `page-${draft.pages.length + 1}`;
      const copy: DesignPage = {
        ...source,
        id,
        name: `${source.name} (copia)`,
        elements: source.elements.map((element) => ({
          ...element,
          id: `${element.id}-${crypto.randomUUID().slice(0, 4)}`,
        })),
      };

      draft.pages.splice(index + 1, 0, copy);
      draft.currentPageId = id;
      draft.selectedElementId = null;
    });
  };

  const deletePage = (pageId: string) => {
    commit((draft) => {
      if (draft.pages.length <= 1) return;
      const index = draft.pages.findIndex((p) => p.id === pageId);
      if (index === -1) return;

      draft.pages.splice(index, 1);
      if (draft.currentPageId === pageId) {
        const fallback = draft.pages[index] ?? draft.pages[index - 1] ?? draft.pages[0];
        if (fallback) draft.currentPageId = fallback.id;
      }
      draft.selectedElementId = null;
    });
  };

  const addTextElement = (value: string, fontSize = 26) => {
    if (!currentPage) return;
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      const id = crypto.randomUUID();
      page.elements.push({
        id,
        type: "text",
        name: "Texto",
        text: value,
        x: 120 + page.elements.length * 12,
        y: 140 + page.elements.length * 12,
        width: 360,
        height: 80,
      fontSize,
      fontFamily: "Inter",
      fontStyle: "normal",
      fill: "#0f172a",
      align: "left",
      });
      draft.selectedElementId = id;
    });
  };

  const addImageElement = (src: string, name = "Imagen") => {
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      const id = crypto.randomUUID();
      page.elements.push({
        id,
        type: "image",
        name,
        src,
        x: 160,
        y: 180,
        width: 280,
        height: 180,
        opacity: 0.96,
      });
      draft.selectedElementId = id;
    });
  };

  const addIconElement = (text: string) => {
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      const id = crypto.randomUUID();
      page.elements.push({
        id,
        type: "icon",
        name: "Ícono",
        text,
        x: 120 + page.elements.length * 10,
        y: 120 + page.elements.length * 10,
        width: 80,
        height: 80,
        fontSize: 56,
        fill: "#0d9488",
      });
      draft.selectedElementId = id;
    });
  };

  const applyTemplate = (templateId: string) => {
    const template = starterTemplates.find((t) => t.id === templateId);
    if (!template) return;

    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      page.background = template.background;
      page.elements = template.elements.map((element) => ({
        ...element,
        id: `${element.id}-${crypto.randomUUID().slice(0, 6)}`,
      }));
      draft.selectedElementId = null;
    });
  };

  const changeBackground = (value: string) => {
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (page) page.background = value;
    });
  };

  const selectElement = (id: string | null) => {
    setState((prev) => ({ ...prev, selectedElementId: id }));
  };

  const updateElement = (id: string, attrs: Partial<CanvasElement>) => {
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      const target = page.elements.find((el) => el.id === id);
      if (!target) return;
      Object.assign(target, attrs);
    });
  };

  const deleteSelected = () => {
    if (!state.selectedElementId) return;
    deleteElement(state.selectedElementId);
  };

  const deleteElement = (id: string) => {
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      page.elements = page.elements.filter((el) => el.id !== id);
      if (draft.selectedElementId === id) {
        draft.selectedElementId = null;
      }
    });
  };

  const bringToFront = (id: string) => {
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      const index = page.elements.findIndex((el) => el.id === id);
      if (index === -1) return;
      const [item] = page.elements.splice(index, 1);
      page.elements.push(item);
    });
  };

  const sendToBack = (id: string) => {
    commit((draft) => {
      const page = draft.pages.find((p) => p.id === draft.currentPageId);
      if (!page) return;
      const index = page.elements.findIndex((el) => el.id === id);
      if (index === -1) return;
      const [item] = page.elements.splice(index, 1);
      page.elements.unshift(item);
    });
  };

  const saveDesign = (name: string) => {
    const snapshot: EditorState = cloneState(state);
    const saved = {
      id: crypto.randomUUID(),
      name,
      pages: snapshot.pages,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({ ...prev, savedDesigns: [saved, ...prev.savedDesigns] }));
  };

  const loadDesign = (id: string) => {
    const design = state.savedDesigns.find((item) => item.id === id);
    if (!design) return;
    commit((draft) => {
      draft.pages = cloneState(design.pages);
      draft.currentPageId = design.pages[0]?.id ?? draft.currentPageId;
      draft.selectedElementId = null;
    });
  };

  const undo = () => {
    setPast((history) => {
      if (!history.length) return history;
      const previous = history[history.length - 1];
      setState((current) => {
        setFuture((futureHistory) => [cloneState(current), ...futureHistory]);
        return cloneState(previous);
      });
      return history.slice(0, -1);
    });
  };

  const redo = () => {
    setFuture((history) => {
      if (!history.length) return history;
      const next = history[0];
      setState((current) => {
        setPast((pastHistory) => [...pastHistory, cloneState(current)]);
        return cloneState(next);
      });
      return history.slice(1);
    });
  };

  const setZoom = (value: number) => {
    setState((prev) => ({ ...prev, zoom: Math.min(2, Math.max(0.4, value)) }));
  };

  const value = useMemo<DesignContextValue>(
    () => ({
      state,
      templates: starterTemplates,
      currentPage,
      selectedElement,
      addPage,
      duplicatePage,
      deletePage,
      setCurrentPage,
      addTextElement,
      addImageElement,
      addIconElement,
      applyTemplate,
      changeBackground,
      selectElement,
      updateElement,
      deleteSelected,
      bringToFront,
      sendToBack,
      deleteElement,
      saveDesign,
      loadDesign,
      undo,
      redo,
      canUndo: past.length > 0,
      canRedo: future.length > 0,
      zoom: state.zoom,
      setZoom,
    }),
    [
      state,
      currentPage,
      selectedElement,
      addPage,
      duplicatePage,
      deletePage,
      setCurrentPage,
      addTextElement,
      addImageElement,
      addIconElement,
      applyTemplate,
      changeBackground,
      selectElement,
      updateElement,
      deleteSelected,
      bringToFront,
      sendToBack,
      deleteElement,
      saveDesign,
      loadDesign,
      undo,
      redo,
      past.length,
      future.length,
      setZoom,
    ]
  );

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>;
};

export const useDesign = (): DesignContextValue => {
  const ctx = useContext(DesignContext);
  if (!ctx) {
    throw new Error("useDesign debe usarse dentro de DesignProvider");
  }
  return ctx;
};
