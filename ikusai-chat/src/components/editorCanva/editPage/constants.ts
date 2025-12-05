import type { TemplatePreset } from "./types";

export const starterTemplates: TemplatePreset[] = [
  {
    id: "template-green-welcome",
    name: "Bienvenida fresca",
    description: "Portada con tipografía amigable y acentos en verde agua.",
    background: "#e6f7ef",
    thumbnail:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=60",
    elements: [
      {
        id: "t1-title",
        type: "text",
        name: "Título grande",
        text: "Lanza tu idea",
        x: 120,
        y: 120,
        width: 380,
        height: 80,
        fontSize: 42,
        fontFamily: "Inter",
        fill: "#0f766e",
        align: "left",
      },
      {
        id: "t1-subtitle",
        type: "text",
        name: "Subtítulo",
        text: "Presentación en 3 pasos",
        x: 120,
        y: 190,
        width: 360,
        height: 60,
        fontSize: 22,
        fontFamily: "Inter",
        fill: "#0ea5e9",
        align: "left",
      },
      {
        id: "t1-image",
        type: "image",
        name: "Foto hero",
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=60",
        x: 520,
        y: 120,
        width: 320,
        height: 220,
        rotation: 0,
      },
    ],
  },
  {
    id: "template-data",
    name: "Datos limpios",
    description: "Sección con tarjetas y texto explicativo.",
    background: "#e0f2fe",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=60",
    elements: [
      {
        id: "t2-title",
        type: "text",
        name: "Encabezado",
        text: "Resumen semanal",
        x: 80,
        y: 90,
        width: 420,
        height: 60,
        fontSize: 36,
        fontFamily: "Inter",
        fill: "#0f172a",
        align: "left",
      },
      {
        id: "t2-chip",
        type: "text",
        name: "Etiqueta",
        text: "Productividad ↑ 18%",
        x: 80,
        y: 150,
        width: 260,
        height: 40,
        fontSize: 20,
        fontFamily: "Inter",
        fill: "#0d9488",
        align: "left",
      },
      {
        id: "t2-photo",
        type: "image",
        name: "Ilustración",
        src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=60",
        x: 520,
        y: 90,
        width: 300,
        height: 260,
      },
      {
        id: "t2-icon",
        type: "icon",
        name: "Ícono",
        text: "★",
        x: 120,
        y: 240,
        width: 60,
        height: 60,
        fontSize: 42,
        fill: "#2563eb",
      },
    ],
  },
];

export const samplePhotos = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
];

export const iconPalette = ["★", "✦", "✺", "✚", "☀", "✦", "✽", "❤"];

export const backgroundPalette = [
  "#e6f7ef",
  "#e0f2fe",
  "#ecfeff",
  "#dbeafe",
  "#e0f5f0",
  "#d9f99d",
  "linear-gradient(135deg, #d9f99d 0%, #bbf7d0 50%, #bae6fd 100%)",
  "linear-gradient(120deg, #e0f2fe 0%, #a5f3fc 50%, #d1fae5 100%)",
];

export const quickTextBlocks = [
  { label: "Título", value: "Título destacado", fontSize: 36 },
  { label: "Subtítulo", value: "Agrega contexto y detalles aquí", fontSize: 22 },
  { label: "Párrafo", value: "Texto descriptivo para tu diseño. Edita el contenido al seleccionar el elemento.", fontSize: 16 },
];
