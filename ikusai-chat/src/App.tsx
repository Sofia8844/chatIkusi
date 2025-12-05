import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import DraggableChat from './components/DraggableChat'
import DashboardCanva from "./components/DashboardPanel";

import type {
  ChatHistorySection,
  QuickAction,
  ChatSection} from './types/chat'
import type { UserProfile } from './types/auth'; 
import ChatContainer from './components/ChatContainer';
import Login from './components/Login';
import { useNavigate } from 'react-router-dom';

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
    // Estado compartido del chat
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
          avatarUrl:'/src/icons/icons8-bot-200.png'
          //avatarUrl: 'https://img.icons8.com/?size=100&id=59023&format=png&color=000000',
        },
      ],
    },
  ])
    const navigate = useNavigate();
//const [chatSections, setChatSections] = useState<ChatSection[]>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialDarkMode)
  const [showDashboard, setShowDashboard] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);


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
    setCurrentUser(  {
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

  }, [])

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }
   const handleLogout = () => {
    setChatSections(chatSections);
    setShowDashboard(false);
    setCurrentUser(null);
  }
  
  const handleToggleDashboard = () => {
   setShowDashboard((prev) => !prev);
    //navigate("/editMenu")
  };

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
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
          quickActions={quickActions}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onGenerateDashboard={handleToggleDashboard}
          isActive={showDashboard}
          chatSections={chatSections}
          setChatSections={setChatSections}
          currentUser={currentUser}
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