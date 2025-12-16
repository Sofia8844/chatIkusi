import { createContext, useContext, useState } from "react";
import type { ChatSection } from "../types/chat";
import type { UserProfile } from "../types/auth";

interface ChatContextType {
  chatSections: ChatSection[];
  setChatSections: React.Dispatch<React.SetStateAction<ChatSection[]>>;
  currentUser: UserProfile | null;
  setCurrentUser: (u: UserProfile | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  showDashboard: boolean;
  toggleDashboard: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
  id: 'cesar-villamil',
  name: 'Cesar Villamil',
  role: 'gerente_general',
  title: 'Gerente General',

  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
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
   return (
    <ChatContext.Provider
      value={{
        chatSections,
        setChatSections,
        currentUser,
        setCurrentUser,
        isDarkMode,
        toggleDarkMode: () => setIsDarkMode((d) => !d),
        showDashboard,
        toggleDashboard: () => setShowDashboard((p) => !p),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be inside <ChatProvider>");
  return ctx;
}