import type { DBFigure, DBWidget } from "../api/chatService";
import type { Widget } from "../types/chat";
import React from "react";
import type {
  CanvasElement
} from  "../components/editorCanva/editPage/types";

export function mapDBFigureToCanvasElement(fig: DBFigure): CanvasElement {
  switch (fig.type) {
    case "text":
      return {
        id: crypto.randomUUID(),
        type: "text",
        name: "Texto",
        text: fig.text,
        x: fig.x,
        y: fig.y,
        width: fig.width,
        height: fig.height,
        fontSize: fig.fontSize ?? 26,
        fontFamily: "Inter",
        fontStyle: "normal",
        fill: fig.fill ?? "#0f172a",
        align: "left",
      };

    case "image":
      return {
        id: crypto.randomUUID(),
        type: "image",
        name: "Imagen",
        src: fig.src,
        x: fig.x,
        y: fig.y,
        width: fig.width,
        height: fig.height,
        opacity: 1,
      };

    case "icon":
      return {
        id: crypto.randomUUID(),
        type: "icon",
        name: "Icono",
        text: fig.text,
        x: fig.x,
        y: fig.y,
        width: fig.width,
        height: fig.height,
        fontSize: 56,
        fill: "#0d9488",
      };
    default:
      return{
        id: crypto.randomUUID(),
        type: "text",
        name: "Texto",
        text: fig.text,
        x: fig.x,
        y: fig.y,
        width: fig.width,
        height: fig.height,
        fontSize: fig.fontSize ?? 26,
        fontFamily: "Inter",
        fontStyle: "normal",
        fill: fig.fill ?? "#0f172a",
        align: "left",
      }  
  }
}
export function mapDBWidgetToWidget(w: DBWidget): Widget {
  return {
    id: crypto.randomUUID(),
    label: w.title,
    x: w.x,
    y: w.y,
    width: w.width,
    height: w.height,
    diagramData: w.data,
    chartRef: React.createRef(),
  };
}

