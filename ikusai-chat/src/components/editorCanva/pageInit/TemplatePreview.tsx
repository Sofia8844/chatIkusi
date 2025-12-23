import { React, useState } from "react";
import type { TemplatePreview } from "../editPage/types";
import { DesignProvider,useDesign } from "../../../providers/DesignProvider";
import type { TemplateFromDB } from "../../../api/chatService";
import { useNavigate } from "react-router-dom";
interface Props {
  template: TemplatePreview;
  onClose: () => void;
  onUseTemplate: () => void;
}

export function TemplatePreviewModal({
  template,
  onClose,
}: Props) {
  const [zoom, setZoom] = useState(1);
  const { applyTemplateFromDB } = useDesign();
  const navigate = useNavigate();
  const getTemplateId = () => { 
    const templatesFromDB : TemplateFromDB[] = [
      {
  "id": "1", //id Plantilla
  "id_user": 10, // Id Usuario
  "width": 1200, // Tamaño del layout
  "height": 800, //Tamaño del layout 
  "title": "Diagrama de Flujo del Proceso de Ventas",  //titulo
  "description": "Diagramación completa del flujo interno del proceso de ventas de la empresa.", //descripcion
  "isPublic": true, //Si es publico para todos o no
  "isTemplate": false, //Si puede reutilizarse como plantilla
  "background": "#CBE8F7",
  "thumbnailUrl": "https://cdn.miapp.com/thumbnails/design-1.png", // imagen minuatura
   "figures": [
       {
        "id": "fig-text-1",
        "type": "text",
        "text": "Dashboard de Compras",
        "x": 120,
        "y": 60,
        "width": 360,
        "height": 80,
        "fontSize": 32,
        "fill": "#0f172a",
      },
        {
        "id": "fig-text-2",
        "type": "text",
        "text": "Se muestra los montos distriuibidos en el año 2024 de acuerdo a la informacion en la base de datos, el monto mayor es de 100 millones",
        "x": 120,
        "y": 570,
        "width": 360,
        "height": 80,
        "fontSize": 16,
        "fill": "#0f172a",
      },
       {
        "id": "fig-text-3",
        "type": "icon",
         "text":"✔",
        "x": -90,
        "y": 60,
        "width": 360,
        "height": 80,
        "fontSize": 56,
        "fill": "#0d9488",
      },
      {
        "id": "fig-text-4",
        "type": "icon",
         "text":"✔",
        "x": -90,
        "y": 60,
        "width": 360,
        "height": 80,
        "fontSize": 56,
        "fill": "#0d9488",
      },
    ],
     "widgets": [{
        "id": "widget-1",
        "title": "Ventas",
        "x": 120,
        "y": 210,
        "width": 360,
        "height": 330,
        "data": {
             "type": "bar",
            "rows": [
                [
                  "2024-01-01",
                  "10711171439.0"
                ],
                [
                  "2024-02-01",
                  "9972293738.0"
                ],
                [
                  "2024-03-01",
                  "16821940666.0"
                ],
                [
                  "2024-04-01",
                  "4087302044.0"
                ],
                [
                  "2024-05-01",
                  "12867831068.0"
                ],
                [
                  "2024-06-01",
                  "11633810954.0"
                ],
                [
                  "2024-07-01",
                  "13737037329.0"
                ],
                [
                  "2024-08-01",
                  "12793202492.0"
                ],
                [
                  "2024-09-01",
                  "12294994829.0"
                ],
                [
                  "2024-10-01",
                  "5727522463.0"
                ],
                [
                  "2024-11-01",
                  "22874747914.0"
                ],
                [
                  "2024-12-01",
                  "55141599565.0"
                ]
              ],
              "columns": [
                "fecha",
                "monto_total"
              ],
              "mapping": {
                "x_key": [
                  "fecha"
                ],
                "y_key": [
                  "monto_total"
                ]
              }
        },
      }],
    },
  {
  "id": "2", //id Plantilla
  "id_user": 10, // Id Usuario
  "width": 1200, // Tamaño del layout
  "height": 800, //Tamaño del layout 
  "title": "Diagrama de Flujo del Proceso de Ventas",  //titulo
  "description": "Diagramación completa del flujo interno del proceso de ventas de la empresa.", //descripcion
  "isPublic": true, //Si es publico para todos o no
  "isTemplate": false, //Si puede reutilizarse como plantilla
  "background": "linear-gradient(135deg, #d9f99d 0%, #bbf7d0 50%, #bae6fd 100%)",
  "thumbnailUrl": "https://cdn.miapp.com/thumbnails/design-1.png", // imagen minuatura
     "figures": [
       {
        "id": "fig-text-1",
        "type": "text",
        "text": "Dashboard de Ventas",
        "x": 120,
        "y": 60,
        "width": 360,
        "height": 80,
        "fontSize": 32,
        "fill": "#0f172a",
      },
       {
        "id": "fig-text-1",
        "type": "text",
        "text": "Indicadores de cuentas",
        "x": 120,
        "y": 570,
        "width": 220,
        "height": 80,
        "fontSize": 20,
        "fill": "#0f172a",
      },
      {
        "id": "fig-text-2",
        "type": "icon",
         "text":"✔",
        "x": 420,
        "y": 320,
        "width": 360,
        "height": 80,
        "fontSize": 56,
        "fill": "#0d9488",
      },
       {
        "id": "fig-text-2",
        "type": "icon",
         "text":"⏰",
        "x": -90,
        "y": 60,
        "width": 360,
        "height": 80,
        "fontSize": 56,
        "fill": "#F54927",
      },
      
      {
        "id": "fig-text-2",
        "type": "icon",
         "text":"📊",
        "x": -90,
        "y": 570,
        "width": 360,
        "height": 80,
        "fontSize": 56,
        "fill": "#0d9488",
      },
    ],
    "widgets": [{
        "id": "widget-2",
        "title": "Compras",
        "x": 120,
        "y": 180,
        "width": 360,
        "height": 360,
         "data": {
              "type": 'doughnut',
              "columns": [
                "proyecto_id",
                "nombre_proyecto",
                "monto_total",
                "porcentaje_participacion"
              ],
              "rows": [
                [
                  "57.1002.22.PR.075-1",
                  "SOLUCIÓN LAN",
                  "34655202821.0",
                  "3.2094398723586863"
                ],

                [
                  "57.1001.23.SE.240-1",
                  "Solución SSE - DIAN",
                  "10382076740.0",
                  "0.96149057962091578824"
                ],
                [
                  "5C.1002.24SE.011-1",
                  "CE Red Multicloud - Sdwan SER.",
                  "9980726626.0",
                  "0.92432129611388782647"
                ],
                [
                  "57.1002.20.PR.183-1",
                  "DC + Seguridad + Balanceadores",
                  "9975906055.0",
                  "0.92387486003746813150"
                ],
                [
                  "57.1002.20.PR.117-1",
                  "IMPL - Integración G_Suite Davivienda",
                  "9254794478.0",
                  "0.85709226870198136970"
                ],
                [
                  "5C.1002.24PR.093-1",
                  "CE DC APIC LEAF COLMEDICA",
                  "9070051059.0",
                  "0.83998306584557292183"
                ],
                [
                  "5C.1002.24PR.164-1",
                  "CE Renovación de Switches",
                  "9069878329.0",
                  "0.83996706921291675435"
                ],
                [
                  "57.1002.23.PR.146-1",
                  "CE Consolidación DC bco VILLAS, OCCIDENT",
                  "8905444705.0",
                  "0.82473876909452177808"
                ],
                [
                  "57.1001.23.PR.087-1",
                  "CE DNP SW CORE Y ACCESO DNA",
                  "8322242765.0",
                  "0.77072807495601528961"
                ],
                [
                  "5C.1002.24PR.097-1",
                  "CE Reno Equ DNA-ISE-SW LAN-SW DC-AS",
                  "7972088692.0",
                  "0.73830008862566242234"
                ],
                [
                  "57.1002.22.PR.004-1",
                  "IMPL - DATAACENTER CTIC AVAL",
                  "7853067636.0",
                  "0.72727747465483432030"
                ],
                [
                  "57.1002.21.PR.168-1",
                  "SDACCESS Contrato marco + DATACENTER ACI",
                  "7837353984.0",
                  "0.72582222357667273057"
                ],
                [
                  "57.1002.23.PR.090-1",
                  "CE AIRPLAN RENOVACIÓN NETWORKING",
                  "7403566310.0",
                  "0.68564887747726132692"
                ],
                [
                  "5C.1002.24SE.018-1",
                  "CE RFP DDI + NTP SERVICIO",
                  "7347163886.0",
                  "0.68042541393505438967"
                ],
                [
                  "5C.1001.25PR.015-1",
                  "CE Solución de Red LAN Core, Acceso y WL",
                  "6564060010.0",
                  "0.60790167725935864014"
                ],
                [
                  "57.1002.19.PR.153-1",
                  "SdWan",
                  "6456426890.0",
                  "0.59793370711938762857"
                ],
                [
                  "5C.1001.24PR.128-1",
                  "CE Renovación DC, seguridad perimetral y",
                  "6440793235.0",
                  "0.59648586461311624570"
                ],

                [
                  "57.1002.23.PR.068-1",
                  "CE COLPATRIA APS",
                  "5980628055.0",
                  "0.55386968128874187342"
                ],
                [
                  "57.1002.22.PR.163-1",
                  "BCO BOGOTÁ LEAFS COBRE",
                  "5924778949.0",
                  "0.54869746087041640016"
                ],
                [
                  "5C.1001.25PR.107-1",
                  "CE RENOVACION SOPORTES CISCO",
                  "5831330864.0",
                  "0.54004317563816193251"
                ],
                [
                  "57.1001.22.PR.190-1",
                  "ITAU  SMARTNET ITAU 2022 (RR-CRITICA-Q2D",
                  "5764589526.0",
                  "0.53386221884451223999"
                ],
                [
                  "5C.1001.24PR.173-1",
                  "CE Adición licencias TrendMicro DIAN",
                  "5759843417.0",
                  "0.53342267874019260605"
                ],
                [
                  "5C.1002.25PR.050-1",
                  "CE DC PPAL ACI & MultiPod",
                  "5756424900.0",
                  "0.53310608775612577530"
                ],

              ],
              "mapping": { x_key: ["nombre_proyecto"], y_key: ["porcentaje_participacion"] },

            }
      }], 
    }, 
     {
  "id": "3", //id Plantilla
  "id_user": 10, // Id Usuario
  "width": 1200, // Tamaño del layout
  "height": 800, //Tamaño del layout 
  "title": "ORGANIZADOR",  //titulo
  "description": "Diagramación completa del flujo interno del proceso de ventas de la empresa.", //descripcion
  "isPublic": true, //Si es publico para todos o no
  "isTemplate": false, //Si puede reutilizarse como plantilla
  "background": "#FFFF",
  "thumbnailUrl": "https://cdn.miapp.com/thumbnails/design-1.png", // imagen minuatura
   "figures": [
       {
        "id": "fig-text-1",
        "type": "text",
        "text": "ORGANIZADOR",
        "x": 120,
        "y": 60,
        "width": 360,
        "height": 80,
        "fontSize": 32,
        "fill": "#0f172a",
      },
        {
        "id": "fig-text-2",
        "type": "text",
        "text": "Proyectos Organizados con la mayor rentabilidad",
        "x": 120,
        "y": 570,
        "width": 360,
        "height": 80,
        "fontSize": 16,
        "fill": "#0f172a",
      },
       {
        "id": "fig-text-3",
        "type": "icon",
         "text":"📅", 
        "x": -90,
        "y": 60,
        "width": 360,
        "height": 80,
        "fontSize": 56,
        "fill": "#0d9488",
      },
      {
        "id": "fig-text-4",
        "type": "icon",
         "text":"📋",
        "x": -90,
        "y": 570,
        "width": 360,
        "height": 80,
        "fontSize": 56,
        "fill": "#0d9488",
      },
    ],
     "widgets": [{
        "id": "widget-1",
        "title": "Ventas",
        "x": 120,
        "y": 210,
        "width": 360,
        "height": 330,
        "data": {
  "columns": [
    "pep",
    "nombre_proyecto",
    "nombre_cliente",
    "venta_real",
    "costo_real",
    "margen_real"
  ],
  "rows": [
    [
      "57.1002.21.PR.206-1",
      "Switche 9300L",
      "BANCO DE BOGOTA SA",
      "33343888.0",
      "342500.0",
      "0.98972825244614545250"
    ],
    [
      "57.1002.23.PR.106-1",
      "Plataforma de Contac Center YACO",
      "COMUNICACION CELULAR SA C",
      "45876300.0",
      "736000.0",
      "0.98395685789830478918"
    ],
    [
      "57.1001.22.PR.186-1",
      "ATH PROYECTO QUALYS ATH",
      "A TODA HORA SA",
      "5118120.0",
      "96000.0",
      "0.98124311270544653115"
    ],
    [
      "57.1002.20.PR.012-2",
      "SOP - Datacenter Calle 76",
      "EXPERIAN COLOMBIA S.A",
      "43836582.0",
      "1320000.0",
      "0.96988816326966367953"
    ],
    [
      "57.1002.23.PR.125-1",
      "CE OC 3 LANDING ZONE SEG ALFA ATH",
      "A TODA HORA SA",
      "8631736.0",
      "406234.0",
      "0.95293716119214026008"
    ],
    [
      "57.1002.21.PR.178-1",
      "SOPORTE CLOUD NETWORKING ATH",
      "A TODA HORA SA",
      "1710000.0",
      "99999.0",
      "0.94152105263157894737"
    ],
    [
      "57.1002.23.PR.178-1",
      "BOLSA DE SERVICIOS PROFESIONALES",
      "SOCIEDAD ADMINISTRATIVA F",
      "10420880.0",
      "950000.0",
      "0.90883687366134146061"
    ],
    [
      "57.1002.23.PR.135-1",
      "Levantamiento de información",
      "BAVARIA S.A",
      "2584000.0",
      "412500.0",
      "0.84036377708978328173"
    ],
    [
      "57.1002.21.PR.238-1",
      "SOPORTE CLOUD NETWORKING GOYA ATH",
      "A TODA HORA SA",
      "2023405.0",
      "344000.0",
      "0.82998954732245892444"
    ],
    [
      "57.1002.23.PR.010-1",
      "ATH HYPERION SOPORTE  NET Y CLOUD",
      "A TODA HORA SA",
      "2023438.0",
      "356250.0",
      "0.82393826744382580539"
    ]
  ],
  "type": "table"
      }
    
    }]
  }];
    const templateId =  templatesFromDB.find(t => t.id === template.id);
    if (!templateId) {
    console.error("Template no encontrado");
    return;
  }

  applyTemplateFromDB(templateId);
  navigate("/editPage")
  onClose();
 
   // const templateId = await fetch(`/templates/${template.id}`) cuando haya base de datos
  };
  return (

    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="
    transform transition-transform duration-300 animate-slideLeft
    bg-gradient-to-b from-cyan-100/50 via-green-100/50 to-blue-200/50
    backdrop-blur-2xl border-l border-white/40 
        relative w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LADO IZQUIERDO: PREVIEW */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl  dark:border-gray-700 overflow-hidden">
          <div className="w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl dark:border-gray-700 overflow-hidden">
            <img
              src={template.thumbnailUrl}
              alt={template.title}
              style={{
                transform: `scale(${zoom})`,
                transition: "transform 0.3s ease",
              }}
              className="max-h-[65vh] object-contain rounded-lg"
            />
          </div>
          <div className="flex justify-center mt-3">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-3 py-1 rounded-md shadow">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700 transition">
                -

              </button>
              <span className="text-xs text-gray-700 dark:text-gray-400">
                {(zoom * 100).toFixed(0)}%
              </span>
              <button
                onClick={() => setZoom((z) => z + 0.1)}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"        >
                +
              </button>
            </div>
          </div>
        </div>


        {/* LADO DERECHO: INFO + ACCIONES */}
        <div className="w-[320px] flex flex-col justify-between">
          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {template.title}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {template.description}
            </p>
          </div>


          {/* BOTONES DE ACCIÓN */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-green-100 hover:text-green-700 transition"
            >
              Cancelar
            </button>
            <button
              onClick={getTemplateId}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700"
            >
              Usar plantilla
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
