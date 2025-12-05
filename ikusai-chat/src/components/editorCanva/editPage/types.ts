export type ElementType = "text" | "image" | "icon";

export interface ElementBase {
  id: string;
  name: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  fill?: string;
  opacity?: number;
}

export interface TextElement extends ElementBase {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  fontStyle?: "normal" | "bold" | "italic" | "bold italic";
  align?: "left" | "center" | "right";
}

export interface ImageElement extends ElementBase {
  type: "image";
  src: string;
}

export interface IconElement extends ElementBase {
  type: "icon";
  text: string;
  fontSize: number;
}

export type CanvasElement = TextElement | ImageElement | IconElement;

export interface DesignPage {
  id: string;
  name: string;
  background: string;
  elements: CanvasElement[];
}

export interface SavedDesign {
  id: string;
  name: string;
  pages: DesignPage[];
  createdAt: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  description: string;
  background: string;
  thumbnail: string;
  elements: CanvasElement[];
}

export interface EditorState {
  pages: DesignPage[];
  currentPageId: string;
  selectedElementId: string | null;
  zoom: number;
  savedDesigns: SavedDesign[];
}
