import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
/* import DraggableChat from './components/DraggableChat'
import DashboardCanva from "./components/DashboardPanel"; */
import { adaptMessagesToSections } from '../adapter/chatSection.adapter';
import type {
  QuickAction,
  ChatSection,
  ChatHistorySection
} from './types/chat'
import type { UserProfile } from './types/auth';
import ChatContainer from './ChatContainer';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { fectNewConversation, fetchChatHistory, fetchChatId, type ChatMessage } from '../api/chatService';
import { groupChatHistoryByDate } from '../utils/chatHistory';
import type { ChatHistoryItem } from '../types/chat';

/* const historySections: ChatHistorySection[] = [
  {
    id: 'today',
    title: 'Hoy',
    items: [
      {
        id: 'history-1',
        title: 'Sales data for the last quarter',
        icon: 'chat_bubble_outline',
        preview: 'Sales data for the last...',
        isActive: true,
      },
    ],
  },
  {
    id: 'yesterday',
    title: 'Ayer',
    items: [
      {
        id: 'history-2',
        title: 'Marketing campaign insights',
        icon: 'chat_bubble_outline',
        preview: 'Marketing campaign i...',
      },
      {
        id: 'history-3',
        title: 'Competitor analysis report',
        icon: 'chat_bubble_outline',
        preview: 'Competitor analysis re...',
      },
      {
        id: 'history-4',
        title: 'User onboarding flow feedback',
        icon: 'chat_bubble_outline',
        preview: 'User onboarding flow f...',
      },
    ],
  },
] */
const storageKey = 'ikusai-theme'

const getInitialDarkMode = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    const stored = window.localStorage.getItem(storageKey)
    if (stored) {
      return stored === 'dark'
    }
  } catch {
    // ignore storage errors and fall back to media query
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
}

const chatPage = () => {
  const quickActions: QuickAction[] = [
    {
      id: "generate-dashboard",
      icon: 'dashboard',
      label: 'Generar Dashboard',
      message: 'Genera un dashboard con los KPIs clave del último trimestre.',
    },
    {
      id: 'chat',
      icon: 'chat',
      label: 'Chat Normal',
      message: '',
    },
  ]

  const navigate = useNavigate();
  //const [chatSections, setChatSections] = useState<ChatSection[]>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialDarkMode)
  const [showDashboard, setShowDashboard] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const [chatSections, setChatSections] = useState<ChatSection[]>([
    {
      id: 'chat-today',
      label: 'Hoy',
      messages: [
        {
          id: 'message-1',
          author: 'Ikusito',
          timestamp: '10:30 AM',
          content: '¡Hola! Soy Ikusito y estoy listo para ayudarte. ¿En qué puedo apoyar hoy al equipo Ikusi?',
          isAI: true,
          avatarUrl: '/src/icons/icons8-bot-200.png'
          //avatarUrl: 'https://img.icons8.com/?size=100&id=59023&format=png&color=000000',
        },
      ],
    },
  ])

  const [historySections, setHistorySections] = useState<ChatHistorySection[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    const root = document.documentElement
    root.classList.toggle('dark', isDarkMode)
    try {
      window.localStorage.setItem(storageKey, isDarkMode ? 'dark' : 'light')
    } catch {
      // ignore storage write errors
    }
  }, [isDarkMode])

  useEffect(() => {
    //Usuario prueba
    setCurrentUser({
      id: 'cesar-villamil',
      name: 'Cesar Villamil',
      role: 'gerente_general',
      title: 'Gerente General',
    });
    if (typeof window === 'undefined') {
      return
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (event: MediaQueryListEvent) => {
      try {
        const stored = window.localStorage.getItem(storageKey)
        if (!stored) {
          setIsDarkMode(event.matches)
        }
      } catch {
        setIsDarkMode(event.matches)
      }
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)

  }, []);
  useEffect(() => {
    const loadHistory = async () => {
      if (!currentUser) return;
      //const history = await fetchChatHistory(currentUser.id); cuando sirva la base de datos
      // Simulación de datos mientras el backend no responde
      const mockHistory: ChatHistoryItem[] = [
        {
          conversation_id: '1',
          title: 'Sales data Q1',
          last_message: 'Revisar ventas del primer trimestre',
          updated_at: '2025-12-17T10:30:00Z',
        },
        {
          conversation_id: '3',
          title: 'User onboarding',
          last_message: 'Feedback de usuarios nuevos',
          updated_at: '2025-12-16T08:45:00Z',
        },
        {
          conversation_id: '4',
          title: 'User onboarding',
          last_message: 'Feedback de usuarios nuevos',
          updated_at: '2025-12-16T08:45:00Z',
        },
        {
          conversation_id: '2',
          title: 'Marketing campaign',
          last_message: 'Campaña navidad 2025',
          updated_at: '2025-12-15T15:20:00Z',
        },
      ];
      // const sections = groupChatHistoryByDate(history); //Cuando sirva la base de datos
      const sections = groupChatHistoryByDate(mockHistory);
      setHistorySections(sections); // solo para mostrar en sidebar
    }
    loadHistory();
  }, [currentUser]);

  const handleSelectConversation = async (chatId: string) => {
    setCurrentChatId(chatId); // activamos la conversación seleccionada
    setChatSections([]);
    try {
      const MOOKS_MESSAGE_ID: ChatMessage[] =
        [
          {
            conversacion_id: '1',
            sender: 'user',
            content: '¿Cuántos clientes hay por ciudad?',
            timestamp: '2025-12-12T15:00:00Z',
          },
          {
            conversacion_id: '1',
            sender: 'ai',
            content: 'Aquí tienes el desglose por ciudad:',
            timestamp: '2025-12-12T15:00:01Z',
            data: {
              type: 'table',
              sql_statement: 'SELECT city, COUNT(*) FROM customers GROUP BY city;',
              columns: ['city', 'count'],
              rows: [
                ['Bogotá', 120],
                ['Medellín', 80],
                ['Cali', 45],
              ],
              natural_language_summary:
                'Bogotá tiene 120 clientes, Medellín 80 y Cali 45.',
              mapping: { x_key: 'city', y_key: 'count' },
            }
          },
          {
            conversacion_id: '1',
            sender: 'user',
            content: 'genera un diagrama circular de la participacion de losproyectos',
            timestamp: '2025-12-12T15:20:00Z',
          },
          {
            conversacion_id: '1',
            sender: 'ai',
            content: 'Aquí tienes el desglose por ciudad:',
            timestamp: '2025-12-12T15:25:01Z',
            data: {
              type: 'doughnut',
              sql_statement: 'SELECT city, COUNT(*) FROM customers GROUP BY city;',
              answer: "¡Hola! 😊 Aquí tienes el diagrama circular que muestra la participación porcentual de los proyectos: un diagrama circular (doughnut) donde cada sector representa el nombre_proyecto y su tamaño corresponde al porcentaje_participacion (participación porcentual sobre el total).",
              columns: [
                "proyecto_id",
                "nombre_proyecto",
                "monto_total",
                "porcentaje_participacion"
              ],
              rows: [
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
              natural_language_summary:
                'Bogotá tiene 120 clientes, Medellín 80 y Cali 45.',
              mapping: { x_key: ["nombre_proyecto"], y_key: ["porcentaje_participacion"] },

            }
          },
          {
            conversacion_id: '1',
            sender: 'user',
            content: 'genera un diagrama de barras, con los montos en el año 2024',
            timestamp: '2025-12-12T14:20:00Z',
          },
          {
            conversacion_id: '1',
            sender: 'ai',
            content: 'Aquí tienes el desglose por ciudad:',
            timestamp: '2025-12-12T15:25:01Z',
            data: {
              rows: [
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
              columns: [
                "fecha",
                "monto_total"
              ],
              sql_statement: "SELECT fecha, SUM(valor) AS monto_total\nFROM projects_plan_detail\nWHERE EXTRACT(YEAR FROM fecha) = 2024\nGROUP BY fecha\nORDER BY fecha ASC;",
              answer: "¡Hola! 😊 Aquí tienes un diagrama de barras que muestra los montos asociados a 2024: el eje X representa la fecha (meses) y el eje Y representa el monto_total (valores monetarios para cada mes).",
              type: "bar",
              mapping: {
                "x_key": [
                  "fecha"
                ],
                "y_key": [
                  "monto_total"
                ]
              }
            }
          },
          {
            conversacion_id: '1',
            sender: 'user',
            content: 'pero con los margenes de rentabilidad agregalo a la tabla',
            timestamp: '2025-12-12T14:20:00Z',
          },
          {
            conversacion_id: '1',
            sender: 'ai',
            content: 'Aquí tienes el desglose por ciudad:',
            timestamp: '2025-12-12T15:25:01Z',
            data: {
              sql_statement: "SELECT\n  p.nombre_proyecto,\n  SUM(ppd.valor) AS monto_total,\n  p.margen_real\nFROM projects_plan_detail ppd\nJOIN projects p ON p.pep = ppd.pep\nGROUP BY p.nombre_proyecto, p.margen_real\nORDER BY monto_total DESC\nLIMIT 10;",
              columns: [
                "nombre_proyecto",
                "monto_total",
                "margen_real"
              ],
              rows: [
                [
                  "Integración G_Suite Davivienda (C-7720)",
                  null,
                  "0"
                ],
                [
                  "IMPL Servicios Ikusi Redes BBVA ACI 2020",
                  null,
                  "0"
                ],
                [
                  "Grupo AVAL EAS",
                  null,
                  "0"
                ],
                [
                  "CE - UROSARIO TORRE 3",
                  null,
                  "0"
                ],
                [
                  "Servicio",
                  null,
                  "0"
                ],
                [
                  "CE Red Multicloud - Sdwan SER.",
                  "39487412822.0",
                  "0.30316880627088288016"
                ],
                [
                  "CE RFP DDI + NTP SERVICIO",
                  "30284664292.0",
                  "0.15447294195411268528"
                ],
                [
                  "SOLUCIÓN LAN",
                  "24794223658.0",
                  "0.18384715509654184124"
                ],
                [
                  "CE Consolidación DC bco VILLAS, OCCIDENT",
                  "24218229232.0",
                  "0.18401408511845885404"
                ],
                [
                  "CE Consolidación DC bco VILLAS, OCCIDENT",
                  "18741380937.0",
                  "0.18297666328025449027"
                ]
              ],
              answer: "¡Hola! 😊 Aquí tienes la tabla con los 10 proyectos con los montos más altos, incluyendo sus márgenes de rentabilidad: columnas: nombre_proyecto (nombre del proyecto), monto_total (valor monetario) y margen_real (margen de rentabilidad).",
              type: "table"
            }

          },
          {
            conversacion_id: '3',
            sender: 'user',
            content: 'Holaaaaa',
            timestamp: '2025-12-12T14:20:00Z',
          },
          {
            conversacion_id: '3',
            sender: 'ai',
            content: ':',
            timestamp: '2025-12-12T15:25:01Z',
            data: {
              answer: "¡Hola, amigo! 😊 Me encantaría charlar, pero mi función es ayudarte solo con temas relacionados con la empresa. Si tienes alguna pregunta sobre nuestros servicios o productos, aquí estoy para ayudarte. ¡Anímate a preguntar algo de la empresa!",
              type: "paragraph"
            }


          },
          {
            conversacion_id: '3',
            sender: 'user',
            content: 'pero con los margenes de rentabilidad agregalo a la tabla',
            timestamp: '2025-12-12T14:20:00Z',
          },
          {
            conversacion_id: '3',
            sender: 'ai',
            content: 'Aquí tienes el desglose por ciudad:',
            timestamp: '2025-12-12T15:25:01Z',
            data: {
              sql_statement: "SELECT\n  p.nombre_proyecto,\n  SUM(ppd.valor) AS monto_total,\n  p.margen_real\nFROM projects_plan_detail ppd\nJOIN projects p ON p.pep = ppd.pep\nGROUP BY p.nombre_proyecto, p.margen_real\nORDER BY monto_total DESC\nLIMIT 10;",
              columns: [
                "nombre_proyecto",
                "monto_total",
                "margen_real"
              ],
              rows: [
                [
                  "Integración G_Suite Davivienda (C-7720)",
                  null,
                  "0"
                ],
                [
                  "IMPL Servicios Ikusi Redes BBVA ACI 2020",
                  null,
                  "0"
                ],
                [
                  "Grupo AVAL EAS",
                  null,
                  "0"
                ],
                [
                  "CE - UROSARIO TORRE 3",
                  null,
                  "0"
                ],
                [
                  "Servicio",
                  null,
                  "0"
                ],
                [
                  "CE Red Multicloud - Sdwan SER.",
                  "39487412822.0",
                  "0.30316880627088288016"
                ],
                [
                  "CE RFP DDI + NTP SERVICIO",
                  "30284664292.0",
                  "0.15447294195411268528"
                ],
                [
                  "SOLUCIÓN LAN",
                  "24794223658.0",
                  "0.18384715509654184124"
                ],
                [
                  "CE Consolidación DC bco VILLAS, OCCIDENT",
                  "24218229232.0",
                  "0.18401408511845885404"
                ],
                [
                  "CE Consolidación DC bco VILLAS, OCCIDENT",
                  "18741380937.0",
                  "0.18297666328025449027"
                ]
              ],
              answer: "¡Hola! 😊 Aquí tienes la tabla con los 10 proyectos con los montos más altos, incluyendo sus márgenes de rentabilidad: columnas: nombre_proyecto (nombre del proyecto), monto_total (valor monetario) y margen_real (margen de rentabilidad).",
              type: "table"
            }

          },
          {
            conversacion_id: '4',
            sender: 'user',
            content: 'Hola, genera un diagrama lineal, con los proyectos con mayor rentabilidad en el 2024',
            timestamp: '2025-17-12T14:20:00Z',
          },
          {
            conversacion_id: '4',
            sender: 'ai',
            content: ':',
            timestamp: '2025-12-12T15:25:01Z',
            data: {
              rows: [
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "5",
                  "0.99503411878697919888"
                ],
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "6",
                  "0.99503411878697919888"
                ],
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "7",
                  "0.99503411878697919888"
                ],
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "8",
                  "0.99503411878697919888"
                ],
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "9",
                  "0.99503411878697919888"
                ],
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "10",
                  "0.99503411878697919888"
                ],
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "11",
                  "0.99503411878697919888"
                ],
                [
                  "RECURSO ATH Proyectos AWS- OCI-AZURE",
                  "12",
                  "0.99503411878697919888"
                ],
                [
                  "Andean Trade - Servicios ACI Jerónimo Ma",
                  "1",
                  "0.94809222983406801599"
                ],
                [
                  "Parque Arauco Servicios Solución Wireles",
                  "1",
                  "0.89019903606451171233"
                ]
              ],
              columns: [
                "nombre_proyecto",
                "mes",
                "margen_promedio"
              ],
              sql_statement: "SELECT\n  p.nombre_proyecto,\n  EXTRACT(MONTH FROM ppd.fecha) AS mes,\n  AVG(p.margen_real) AS margen_promedio\nFROM projects p\nJOIN projects_plan_detail ppd ON p.pep = ppd.pep\nWHERE EXTRACT(YEAR FROM ppd.fecha) = 2024\nGROUP BY p.nombre_proyecto, mes\nORDER BY margen_promedio DESC, p.nombre_proyecto, mes\nLIMIT 10;",
              answer: "¡Hola! 😊 Aquí tienes la gráfica lineal solicitada: una gráfica de líneas donde el eje X representa el mes (1-12) y el eje Y muestra el margen promedio (margen_promedio). Cada línea corresponde a un proyecto (nombre_proyecto) para comparar su desempeño de rentabilidad a lo largo de 2024.",
              type: "line",
              mapping: {
                "x_key": [
                  "mes"
                ],
                "y_key": [
                  "margen_promedio"
                ]
              }
            }
          },
          {
          conversacion_id: '4',
          sender: 'ai',
          content: ':',
          timestamp: '2025-12-12T15:25:01Z',
          data: {
          
    rows: [
        [
            "1",
            "10711171439.0"
        ],
        [
            "2",
            "9972293738.0"
        ],
        [
            "3",
            "16821940666.0"
        ],
        [
            "4",
            "4087302044.0"
        ],
        [
            "5",
            "12867831068.0"
        ],
        [
            "6",
            "11633810954.0"
        ],
        [
            "7",
            "13737037329.0"
        ],
        [
            "8",
            "12793202492.0"
        ],
        [
            "9",
            "12294994829.0"
        ],
        [
            "10",
            "5727522463.0"
        ],
        [
            "11",
            "22874747914.0"
        ],
        [
            "12",
            "55141599565.0"
        ]
    ],
    columns: [
        "mes",
        "monto_total"
    ],
    sql_statement: "SELECT EXTRACT(MONTH FROM fecha) AS mes, SUM(valor) AS monto_total\nFROM projects_plan_detail\nWHERE EXTRACT(YEAR FROM fecha) = 2024\nGROUP BY EXTRACT(MONTH FROM fecha)\nORDER BY EXTRACT(MONTH FROM fecha);",
    answer: "¡Hola! 😊 Soy ikusito. Diagrama de barras: el eje X representa los meses (mes) de 2024 y el eje Y muestra los montos totales por mes (monto_total) para comparar las magnitudes mensuales.",
    type: "bar",
    mapping: {
        "x_key": [
            "mes"
        ],
        "y_key": [
            "monto_total"
        ]
    }
}
        }
        ]
      // ✅ SIMULA BACKEND REAL
      const messages = MOOKS_MESSAGE_ID.filter(
        msg => msg.conversacion_id === chatId
      );

      //   const messages = await fetchChatId(chatId); // trae ChatMessage[] cuando exista DB
      const sections = adaptMessagesToSections(messages); // conv. a ChatSection[] CUANDO EXISTA DB
      // SI NO HAY MENSAJES → CHAT VACÍO
      setChatSections(
        sections.length > 0
          ? sections
          : [
            {
              id: 'chat-today',
              label: 'Hoy',
              messages: [
                {
                  id: 'message-1',
                  author: 'Ikusito',
                  timestamp: '10:30 AM',
                  content: '¡Hola! Soy Ikusito y estoy listo para ayudarte. ¿En qué puedo apoyar hoy al equipo Ikusi?',
                  isAI: true,
                  avatarUrl: '/src/icons/icons8-bot-200.png'
                  //avatarUrl: 'https://img.icons8.com/?size=100&id=59023&format=png&color=000000',
                },
              ],
            },
          ]
      );
    } catch (error) {
      console.error("Error cargando mensajes:", error);
    }
  };
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }
  const handleLogout = () => {
    setChatSections(chatSections);
    setShowDashboard(false);
    setCurrentUser(null);
  }
  const handleNewConversation = async () => {
    // const newChat = await fectNewConversation(currentUser.id); Activar nuevo chat cuando exista db

    // setCurrentChatId(newChat.conversation_id); // Activar nuevo chat cuando exista db
    setChatSections([{
      id: 'chat-today',
      label: 'Hoy',
      messages: [
        {
          id: 'message-1',
          author: 'Ikusito',
          timestamp: '10:30 AM',
          content: '¡Hola! Soy Ikusito y estoy listo para ayudarte. ¿En qué puedo apoyar hoy al equipo Ikusi?',
          isAI: true,
          avatarUrl: '/src/icons/icons8-bot-200.png'
          //avatarUrl: 'https://img.icons8.com/?size=100&id=59023&format=png&color=000000',
        },
      ],
    }]);                       // Limpiar mensajes

    // Opcional: recargar historial desde backend
    // const updatedHistory = await fetchChatHistory(currentUser.id); //// Activar nuevo chat cuando exista db
    //setHistorySections(updatedHistory); // // Activar nuevo chat cuando exista db
  };
  const handleToggleDashboard = () => {
    setShowDashboard((prev) => !prev);
    //navigate("/editMenu")
  };

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }
  return (
    <div className="flex h-screen transition-all duration-500 ease-in-out overflow-hidden">

      <Sidebar sections={historySections} isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        currentConversationId={currentChatId} />

      {/* Chat + Dashboard en el mismo layout */}
      <div className="flex h-screen  flex flex-1 h-full overflow-hidden transition-all duration-500">
        {/* Chat colapsable */}
        {/* Chat fijo o draggable según estado *
      
      
         {!showDashboard ? (
        
        <div
          className={`${
            showDashboard
              ? "w-1/4"
              : "w-full flex h-screen transition-all duration-500 ease-in-out overflow-hidden"
          }`}
        >
          <ChatContainer
            quickActions={quickActions}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onGenerateDashboard={handleToggleDashboard}
            isActive={showDashboard}     
            chatSections={chatSections}
            setChatSections={setChatSections}
            currentUser={currentUser}


     />
        </div>
      ) : (

        <DraggableChat
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onGenerateDashboard={handleToggleDashboard}
          isActive={showDashboard}
          chatSections={chatSections}
          setChatSections={setChatSections}
          currentUser={currentUser}
        />
      )}
      /}
   
         {/* Área de tablero interactivo 
         
                <div
          className={`transition-all duration-500 ease-in-out bg-background-light dark:bg-background-dark ${
            showDashboard ? "flex-1 opacity-100" : "w-0 opacity-0"
          }`}
        >
        <DashboardCanva isActive={showDashboard} onClose={handleToggleDashboard}/>
      </div>
         */}


        <div
          className={`${showDashboard
            ? "w-1/4"
            : "w-full flex h-screen transition-all duration-500 ease-in-out overflow-hidden"
            }`}
        >
          <ChatContainer
            key={currentChatId}
            quickActions={quickActions}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onGenerateDashboard={handleToggleDashboard}
            isActive={showDashboard}
            chatSections={chatSections}
            setChatSections={setChatSections}
            currentUser={currentUser}
          />
        </div>

      </div>

    </div>

  )
}

export default chatPage;