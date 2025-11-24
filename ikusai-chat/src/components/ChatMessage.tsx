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
        className="flex items-start gap-3"
        draggable={!!responseData && responseData.type?.toLowerCase() !== "paragraph"}
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
          <div
            className="mt-1 p-4 rounded-lg rounded-tl-none ai-chat-bubble-gradient-light dark:ai-chat-bubble-gradient-dark text-light-text-primary dark:text-dark-text-primary w-full max-w-4xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                {/* Spinner con segmentos de colores */}
                <div className="w-14 h-14 relative animate-spin">
                  {[
                    "#00936B",
                    "#00C588",
                    "#66DCAE",
                    "#36A2EB",
                    "#5BB1E6",
                    "#8FC6F0"
                  ].map((color, index) => (
                    <div
                      key={index}
                      className="absolute top-0 left-1/2 w-1 h-1/3 origin-bottom rounded"
                      style={{
                        backgroundColor: color,
                        transform: `rotate(${index * 45}deg) translateY(-50%)`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-medium">🤖 Generando respuesta...</span>
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
