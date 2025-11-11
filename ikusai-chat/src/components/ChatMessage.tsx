import React, { useEffect,useState,FC } from "react";
import type { ChatMessageProps } from "../types/chat";
import MessageContent from "./responseChatComponents/ComponentRender";
import { fetchChatResponse } from "../api/chatService";

const ChatMessage: FC<ChatMessageProps> = ({
  id,
  author,
  timestamp,
  content,
  isAI,
  avatarUrl,
  userInitial,
  type,
  diagramData,
  isSend
}) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
   //Solo para mensajes AI (llama al backend)
  useEffect(() => {
    const fetchData = async () => {
      if (!isAI || !isSend) return;
      try {
        setLoading(true);
        const data = await fetchChatResponse(content);
        setResponseData(data);
      } catch (error) {
        console.error("Error obteniendo respuesta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [content, isAI,isSend]);
  if (isAI) {
    const handleDragStart = (e: React.DragEvent) => {
      if (type === "diagram") {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({ id, type, label: content, diagramData })
        );
      }
    };

    const handleDoubleClick = () => {
      if (type === "diagram") {
        const event = new CustomEvent("addDiagramToDashboard", {
          detail: { id, type, label: content, diagramData },
        });
        window.dispatchEvent(event);
      }
    };

    return (
      <div
        className="flex items-start gap-3"
        draggable={type === "diagram"}
        onDragStart={handleDragStart}
        onDoubleClick={handleDoubleClick}
      >
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${author} avatar`}
              className="w-6 h-6 object-contain"
            />
          ) : (
            <span className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
              AI
            </span>
          )}
        </div>

        <div>
          {/* Cabecera del mensaje */}
          <div className="flex items-baseline gap-2">
            <p className="font-bold text-light-text-primary dark:text-dark-text-primary">
              {author}
            </p>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              {timestamp}
            </p>
          </div>

          {/* Contenido dinámico */}
             <div className="mt-1 p-4 rounded-lg rounded-tl-none ai-chat-bubble-gradient-light dark:ai-chat-bubble-gradient-dark text-light-text-primary dark:text-dark-text-primary max-w-md shadow-sm">
            {loading ? (
              <p className="text-sm text-gray-500">⏳ Generando respuesta...</p>
            ) : responseData ? (
              <MessageContent data={responseData} />
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const initial = userInitial ?? author.charAt(0).toUpperCase();

  return (

    <div className="flex items-start gap-3 justify-end">
      <div className="order-2">
        <div className="flex items-baseline gap-2 justify-end">
          <p className="font-bold text-light-text-primary dark:text-dark-text-primary">
            {author}
          </p>
          <p className="text-xs text-light-text-secondary dark:text-light-text-secondary">
            {timestamp}
          </p>
        </div>
        <div className="mt-1 p-4 rounded-lg rounded-br-none chat-bubble-gradient text-white max-w-md shadow-sm">
          <p>{content}</p>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-orange-200 text-orange-600 flex items-center justify-center font-bold order-1">
        {initial}
      </div>
    </div>
  );
};

export default ChatMessage;
