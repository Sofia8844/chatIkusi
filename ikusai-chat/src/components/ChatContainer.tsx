import { FC, useState, useRef,useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'
import type { ChatSection, QuickAction, ChatMessageProps } from '../types/chat'
import { fetchChatResponse } from "../api/chatService";
import type { UserProfile } from '../types/auth'

interface ChatContainerProps {
  quickActions: QuickAction[]
  isDarkMode: boolean
  onToggleTheme: () => void;
  onGenerateDashboard: () => void;
  isActive: boolean;
  chatSections: ChatSection[],
  setChatSections: React.Dispatch<React.SetStateAction<ChatSection[]>>,
  currentUser: UserProfile
}

const ChatContainer: FC<ChatContainerProps> = ({
  quickActions,
  isDarkMode,
  onToggleTheme,
  onGenerateDashboard,
  isActive,
  chatSections,
  setChatSections,
  currentUser
}) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const getDataChat = async (content: string) => {
    try {
      const user_id = "1";
      const chat_id = "1";
      const data = await fetchChatResponse(content, currentUser.role,user_id,chat_id); // Llamada a la API
      return data;
    } catch (error) {
      console.error("Error obteniendo respuesta:", error);
      return "Error al obtener respuesta.";
    }
  }

  const timestamp = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const handleSendMessage = async (content: string) => {
    if(isSending) return;

    setIsSending(true);
    // 1️⃣ Mensaje del usuario
    const userMessage: ChatMessageProps = {
      id: `user-${Date.now()}`,
      author: 'You',
      timestamp,
      content,
      isAI: false,
      userInitial: 'J',
      isSend: true,
    };

    // 2️⃣ Mensaje de IA temporal
    const aiMessage: ChatMessageProps = {
      id: `ai-${Date.now()}`,
      author: 'Ikusito',
      timestamp,
      content: '', // ← vacío mientras carga
      isAI: true,
      isLoading: true,
      avatarUrl: '/src/icons/icons8-bot-200.png'
    };

    // 3️⃣ Agregar ambos mensajes al chat
    setChatSections(prev => {
      const [first, ...rest] = prev;
      return [{
        ...first,
        messages: [...first.messages, userMessage, aiMessage]
      }, ...rest];
    });

    // 4Obtener respuesta de la IA
    try {
      const data = await getDataChat(content); // llamado al backend respuest IA

      // Actualizar mensaje de IA con responseData completo
      setChatSections(prev => {
        const [first, ...rest] = prev;
        const updatedMessages = first.messages.map(msg =>
          msg.id === aiMessage.id
            ? { ...msg, isLoading: false, responseData: data } // objeto completo
            : msg
        );

        return [{ ...first, messages: updatedMessages }, ...rest];
      });
    } catch (error) {
      console.error("Error obteniendo respuesta:", error);
      setChatSections(prev => {
        const [first, ...rest] = prev;
        const updatedMessages = first.messages.map(msg =>
          msg.id === aiMessage.id
            ? { ...msg, isLoading: false, content: "Error al obtener respuesta." }
            : msg
        );
        return [{ ...first, messages: updatedMessages }, ...rest];
      })
    } finally{
      setIsSending(false);
    }
  }
  useEffect(() => {
  const el = chatBodyRef.current;
  if (el) {
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }
}, [chatSections]);

const totalMessages = chatSections.reduce((c,section) => c + section.messages.length,0);
const showWelcome = totalMessages < 2;

  return (
    <main className="flex-1 flex flex-col bg-chat-gradient-light dark:bg-chat-gradient-dark" >
      <ChatHeader title="IkusAI Chat" isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
      <div className="flex-1 flex justify-center px-6 pb-6 space-y-6 overflow-y-auto"  ref={chatBodyRef}>
        <div className="w-full max-w-3xl space-y-6 pb-24"  >
           {/*  WELCOME SCREEN */}
          {showWelcome ? (
            <div className="flex flex-col items-center justify-center h-full mt-10 text-center animate-fadeIn">
              <img
                src="/src/icons/icons8-bot-200.png"
                className="w-24 h-24 opacity-90 mb-4"
                alt="Ikusito"
              />
              <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
               { `Cómo te ayudo hoy, ${currentUser.name} ?`}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                Pregúntame sobre Ikusi.
              </p>
               <div className="w-full max-w-lg mt-6
               bg-background-light/70
               backdrop-blur-md shadow-md">
             <MessageInput isActive={isActive} quickActions={quickActions} onSend={handleSendMessage} onGenerateDashboard={onGenerateDashboard} />
         </div>
            </div>
           
          ) : (
          chatSections.map((section) => (
            <div key={section.id} className="space-y-6"   >
              <div className="text-center my-4">
                <span className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary bg-gray-100 dark:bg-zinc-800 rounded-full px-3 py-1">
                  {section.label}
                </span>
              </div>
              {section.messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
            </div>
          ))
          )}
        </div>
      </div>
      {!showWelcome && ( 
      <div className="sticky bottom-0 p-6 border-t border-light-border dark:border-dark-border 
               bg-background-light/70
               backdrop-blur-md shadow-md">
        <MessageInput isActive={isActive}
        isDisabled={isSending} quickActions={quickActions} onSend={handleSendMessage} onGenerateDashboard={onGenerateDashboard} />
      </div>)}
    </main>
  )
}

export default ChatContainer;
