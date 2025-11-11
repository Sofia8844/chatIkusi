import React, { FC } from 'react'
import type { ChatMessageProps } from '../types/chat'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ChatMessage: FC<ChatMessageProps> = ({
  id,
  author,
  timestamp,
  content,
  isAI,
  avatarUrl,
  userInitial,
  type,
  diagramData
}) => {
  if (isAI) {
    const handleDragStart = (e: React.DragEvent) =>{
        if(type==="diagram"){
            e.dataTransfer.setData("application/json", JSON.stringify({
              id,
              type,
              label: content,
              diagramData
            }))
        }
      };
     const handleDoubleClick = () =>{
        if(type === "diagram"){
          const event = new CustomEvent("addDiagramToDashboard",{
            detail: {id, type, label: content, diagramData}
          })
          window.dispatchEvent(event);
        }
     }; 
    return (
      <div className="flex items-start gap-3"
         draggable={type === "diagram"}
         onDragStart={handleDragStart}
         onDoubleClick={handleDoubleClick}>
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
          {/*Contenido */}
          <div className="flex items-baseline gap-2">
            <p className="font-bold text-light-text-primary dark:text-dark-text-primary">
              {author}
            </p>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              {timestamp}
            </p>
          </div>
          <div className="mt-1 p-4 rounded-lg rounded-tl-none ai-chat-bubble-gradient-light dark:ai-chat-bubble-gradient-dark text-light-text-primary dark:text-dark-text-primary max-w-md shadow-sm">
            {type === "diagram" ? (
              <div className="bg-white dark:bg-zinc-800 border rounded-lg p-2 shadow-sm">
                <p className="text-sm text-center text-emerald-600 mb-2">📊 {content}</p>
                {/* Gráfico pequeño en el mensaje */}
                <div className="w-60 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={diagramData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10B981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <p>{content}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const initial = userInitial ?? author.charAt(0).toUpperCase()

  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="order-2">
        <div className="flex items-baseline gap-2 justify-end">
          <p className="font-bold text-light-text-primary dark:text-dark-text-primary">
            {author}
          </p>
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
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
  )
}

export default ChatMessage
