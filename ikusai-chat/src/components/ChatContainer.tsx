import { FC, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'
import type { ChatSection, QuickAction,ChatMessageProps } from '../types/chat'
import { fetchChatResponse } from "../api/chatService";

interface ChatContainerProps {
  quickActions: QuickAction[]
  isDarkMode: boolean
  onToggleTheme: () => void;
  onGenerateDashboard: () => void;
  isActive: boolean;
  chatSections: ChatSection[],
  setChatSections: React.Dispatch<React.SetStateAction<ChatSection[]>>

}

const ChatContainer: FC<ChatContainerProps> = ({
  quickActions,
  isDarkMode,
  onToggleTheme,
  onGenerateDashboard,
  isActive,
  chatSections,
  setChatSections
}) => {
 
const getDataChat = async (content: string) =>{
  try {
    const data = await fetchChatResponse(content); // Llamada a la API
    return data;
  } catch (error) {
    console.error("Error obteniendo respuesta:", error);
    return "Error al obtener respuesta.";
  }
}
  const handleSendMessage = async (content: string) => {
    const timestamp = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

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
      author: 'AI Assistant',
      timestamp,
      content: '', // ← vacío mientras carga
      isAI: true,
      isLoading: true,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAIZCmYMZ9_aJOi5pTg3T5Ntwj-Fi9erZXdUDr5Je1z8U9Kb7mmxW_I6SYTBgYpC50dq_-9OGZ3ZrVPxpg1uG6-VakLuxcTQpCVV7BfrMaTDy7bKrhZfVLyDQF0-oyElN18njlmjUFgJXWVyRPUVATFQMD1aR29XSf89Y4_avBBwwHBylE1pOE5goaM-twUJcdXF_eaFUkPZF6qJsI2pINsAN3CYHsmgovqD7tZ7fX0Y19LzptnhAixdAmCVNv5XcigW_mGI-_JcRY',
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
    const data = await getDataChat(content); // llamado al backend

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
  }
}

  return (
    <main className="flex-1 flex flex-col bg-chat-gradient-light dark:bg-chat-gradient-dark">
      <ChatHeader title="IkusAI Chat" isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
      <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto">
        {chatSections.map((section) => (
          <div key={section.id} className="space-y-6">
            <div className="text-center my-4">
              <span className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary bg-gray-100 dark:bg-zinc-800 rounded-full px-3 py-1">
                {section.label}
              </span>
            </div>
            {section.messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-light-border dark:border-dark-border bg-background-light dark:bg-background-dark">
        <MessageInput isActive={isActive} quickActions={quickActions} onSend={handleSendMessage}  onGenerateDashboard={onGenerateDashboard}/>
      </div>
    </main>
  )
}

export default ChatContainer;
