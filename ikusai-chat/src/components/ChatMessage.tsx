import React, { useEffect, useState, FC } from "react";
import type { ChatMessageProps } from "../types/chat";
import MessageContent from "./responseChatComponents/ComponentRender";

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
  isLoading,
  responseData,
}) => {
  if (isAI) {
    const handleDragStart = (e: React.DragEvent) => {
      if (responseData) {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({
            id,
            diagramData: responseData
          })
        );
      }
    };

    const handleDoubleClick = () => {
      if (responseData) {
        const event = new CustomEvent("addDiagramToDashboard", {
          detail: { id, type, label: content, diagramData },
        });
        window.dispatchEvent(event);
      }
    };

    return (
      
      <div
        className="flex items-start gap-3 transition-transform duration-200 hover:scale-[1.03]"
        draggable={!!responseData && responseData.type?.toLowerCase() !== "paragraph"}
        onDragStart={handleDragStart}
        onDoubleClick={handleDoubleClick}
      >


        <div className="w-12 h-12 rounded-full
                flex items-center justify-center overflow-hidden 
                shadow-[0_0_0_4px_rgba(72,239,128,0.3)] hover:scale-105 transition-transform cursor-pointer">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${author} avatar`}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-lg select-none">AI</span>
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
          <div
            className="mt-1 p-4 rounded-lg rounded-tl-none ai-chat-bubble-gradient-light dark:ai-chat-bubble-gradient-dark text-light-text-primary dark:text-dark-text-primary w-full max-w-4xl shadow-sm overflow-hidden">
            {isLoading ? (
              
  <div className="relative  w-64 h-20 rounded-xl bg-white border border-transparent flex items-center justify-center overflow-visible">

  {/* Borde animado  */}
  <svg
    className="absolute inset-0 w-full h-full overflow-visible"
    width="100%"
    height="100%"
  >
    <rect
      x="2"
      y="2"
      width="100%"
      height="100%"
      rx="12"
      ry="12"
      fill="none"
      stroke="rgb(64, 163, 184)"
      strokeWidth="2"
      strokeDasharray="200"
      className="animate-perimeter"
      style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,0.8))" }}
    />
  </svg>

  {/* Texto */}
  <p className="relative text-gray-700 font-bold text-sm">
       🤖 Generando respuesta...
    <span
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shimmer"
      style={{ backgroundSize: "200% 100%" }}
    ></span>
  </p>
</div>
              

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
