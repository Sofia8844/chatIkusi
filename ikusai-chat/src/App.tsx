import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import DraggableChat from './components/DraggableChat'
import DashboardCanva from "./components/DashboardPanel";

import type {
  ChatHistorySection,
  ChatMessageProps,
  ChatSection,
  QuickAction,
} from './types/chat'
import ChatContainer from './components/ChatContainer';

const historySections: ChatHistorySection[] = [
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
]

const initialChatSections: ChatSection[] = [
  {
    id: 'chat-today',
    label: 'Hoy',
    messages: [
      {
        id: 'message-1',
        author: 'AI Assistant',
        timestamp: '10:30 AM',
        content: 'Hello! How can I help you today?',
        isAI: true,
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAIZCmYMZ9_aJOi5pTg3T5Ntwj-Fi9erZXdUDr5Je1z8U9Kb7mmxW_I6SYTBgYpC50dq_-9OGZ3ZrVPxpg1uG6-VakLuxcTQpCVV7BfrMaTDy7bKrhZfVLyDQF0-oyElN18njlmjUFgJXWVyRPUVATFQMD1aR29XSf89Y4_avBBwwHBylE1pOE5goaM-twUJcdXF_eaFUkPZF6qJsI2pINsAN3CYHsmgovqD7tZ7fX0Y19LzptnhAixdAmCVNv5XcigW_mGI-_JcRY',
      },
      {
        id: 'message-2',
        author: 'You',
        timestamp: '10:30 AM',
        content: 'Can you show me the sales data for the last quarter?',
        isAI: false,
        userInitial: 'J',
      },
    ],
  },
  {
    id: 'chat-yesterday',
    label: 'Ayer',
    messages: [
      {
        id: 'message-3',
        author: 'AI Assistant',
        timestamp: '10:31 AM',
        content: 'Of course, pulling that up for you now...',
        isAI: true,
        avatarUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDHpgDosUe68D-9PJLcDNiE8oyEJyMHYXWhEBUw3_t1kLHriFsgy0-kY9kDAZlgWXrBPzxBOCBav0pTJHGUQqwTy-FLzWAYUYgGY7rRh8u2sKlcz2_GlMqzYCV8cQs9EOj2PC8y_wZXL1rbO073AO_I1SEhZNAGNSFvpVb-TJy2y5V0cIU9Gh9FNiVhYUXqG0HcIfBbwESUEBBoTExZJbHggKbf79ODWkNMFEP5gPFGFJcEKCEWsTMfjcNfoF2qWoyaYW2HolahyRQ',
      },
    ],
  },
]

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
    message: 'Necesito más detalles sobre la campaña de marketing.',
  },
]

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

const App = () => {
  const [chatSections, setChatSections] = useState<ChatSection[]>(initialChatSections)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialDarkMode)
  const [showDashboard, setShowDashboard] = useState(false);
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
  }, [])

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }
  
  const handleToggleDashboard = () => {
    setShowDashboard((prev) => !prev);
  };

  const handleSendMessage = (content: string) => {
    const timestamp = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    const newMessage: ChatMessageProps = {
      id: `user-${Date.now()}`,
      author: 'You',
      timestamp,
      content,
      isAI: false,
      userInitial: 'J',
    }

    setChatSections((previous) => {
      if (previous.length === 0) {
        return [
          {
            id: 'chat-today',
            label: 'Hoy',
            messages: [newMessage],
          },
        ]
      }
      const [firstSection, ...rest] = previous
      const updatedFirst: ChatSection = {
        ...firstSection,
        messages: [...firstSection.messages, newMessage],
      }
      return [updatedFirst, ...rest]
    });
    if (content.toLowerCase().includes("grafico") || content.toLowerCase().includes("chart")) {
      const chartData = [
        { name: "Ene", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 5000 },
        { name: "Abr", value: 4500 },
        { name: "May", value: 6000 },
      ];

      const aiMessage: ChatMessageProps = {
        id: `ai-${Date.now()}`,
        author: "AI Assistant",
        timestamp,
        content: "Aquí tienes el gráfico solicitado 📊",
        isAI: true,
        type: "diagram",
        diagramData: chartData,
      };

      setTimeout(() => {
        setChatSections((prev) => {
          const [first, ...rest] = prev;
          const updated = {
            ...first,
            messages: [...first.messages, aiMessage],
          };
          return [updated, ...rest];
        });
      }, 1000);
    }
    
  }

  return (

     <div className="flex h-screen transition-all duration-500 ease-in-out overflow-hidden">
      <Sidebar sections={historySections}   isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar} />

              {/* Chat + Dashboard en el mismo layout */}
      <div className="flex h-screen  flex flex-1 h-full overflow-hidden transition-all duration-500">      
        {/* Chat colapsable */}
      {/* Chat fijo o draggable según estado */}
      {!showDashboard ? (
        
        <div
          className={`${
            showDashboard
              ? "w-1/4"
              : "w-full flex h-screen transition-all duration-500 ease-in-out overflow-hidden"
          }`}
        >
          <ChatContainer
            sections={chatSections}
            quickActions={quickActions}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onSendMessage={handleSendMessage}
            onGenerateDashboard={handleToggleDashboard}
            isActive={showDashboard}
          />
        </div>
      ) : (
        <DraggableChat
          sections={chatSections}
          quickActions={quickActions}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onSendMessage={handleSendMessage}
          onGenerateDashboard={handleToggleDashboard}
          isActive={showDashboard}
        />
      )}
         {/* Área de tablero interactivo */}
       <div
          className={`transition-all duration-500 ease-in-out bg-background-light dark:bg-background-dark ${
            showDashboard ? "flex-1 opacity-100" : "w-0 opacity-0"
          }`}
        >
        <DashboardCanva isActive={showDashboard} onClose={handleToggleDashboard}/>
      </div>
    </div>
  
    </div>

  )
}

export default App
