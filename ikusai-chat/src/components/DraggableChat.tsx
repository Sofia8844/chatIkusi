import React, { useState, useRef, useEffect } from "react";
import ChatContainer from "./ChatContainer";
import type { QuickAction,ChatSection  } from "../types/chat";

interface DraggableChatProps {
  quickActions: QuickAction[];
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onGenerateDashboard: () => void;
  isActive: boolean;
  chatSections: ChatSection[];
  setChatSections: React.Dispatch<React.SetStateAction<ChatSection[]>>;
}

const TOP_GAP = 30;
const BOTTOM_GAP = 30;
const CHAT_EXPANDED_HEIGHT = 600;

function adjustPositionWithinViewport(node: HTMLDivElement): { y: number } {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const expandedBottom = rect.top + CHAT_EXPANDED_HEIGHT;

  if (rect.top < TOP_GAP) {
    return { y: TOP_GAP - rect.top };
  }

  // Si se saldría por abajo
    if (expandedBottom > viewportHeight - BOTTOM_GAP) {
      return {y:viewportHeight - BOTTOM_GAP - expandedBottom};
  }

    return {y:0};
}

const DraggableChat: React.FC<DraggableChatProps> = ({
  quickActions,
  isDarkMode,
  onToggleTheme,
  onGenerateDashboard,
  isActive,
  chatSections,
   setChatSections
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleExpand = () => {
    if (nodeRef.current) {
      const { y } = adjustPositionWithinViewport(nodeRef.current);
      setOffsetY(y);
    }
    setIsCollapsed(false);
  };

   useEffect(() => {
    if (!nodeRef.current || isCollapsed) return;

    const handleResize = () => {
      if (!nodeRef.current) return;
    const { y } = adjustPositionWithinViewport(nodeRef.current);
      setOffsetY(y);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  useEffect(() => {
    if (!nodeRef.current || isCollapsed) {
      return;
    }

    const handleResize = () => {
      if (!nodeRef.current || isCollapsed) {
        return;
      }
      const { y } = adjustPositionWithinViewport(nodeRef.current);
      setOffsetY(y);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed]);

  return (
      <div
        ref={nodeRef}
        className={`fixed z-50 border border-light-border dark:border-dark-border rounded-xl shadow-lg bg-white dark:bg-zinc-900 transition-all duration-500 ease-in-out
          ${isCollapsed ? "w-80 h-14" : "w-[500px] min-w-[400px] h-[500px]"}`}
        style={{
          right: "2rem",
          bottom: "2rem"
          
        }}
      >
        {/* Header draggable */}
        <div 
        className="drag-header flex justify-between items-center px-4 py-2 bg-emerald-600 text-white cursor-move rounded-t-xl">
          <h2 className="font-semibold text-lg">IkusAI Chat</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => (isCollapsed ? handleExpand() : setIsCollapsed(true))}
              className="p-1 hover:bg-emerald-500 rounded"
            >
              <span className="material-icons text-white text-xl">
                {isCollapsed ? "open_in_full" : "minimize"}
              </span>
            </button>
          </div>
        </div>
        {/* Cuerpo del chat con dirección de expansión controlada */}

          {!isCollapsed && (
            <div
              className="h-[calc(100%-40px)] overflow-y-auto overflow-x-hidden rounded-b-xl transition-transform duration-300 ease-out"     
            >
              <ChatContainer
                quickActions={quickActions}
                isDarkMode={isDarkMode}
                onToggleTheme={onToggleTheme}
                onGenerateDashboard={onGenerateDashboard}
                isActive={isActive}
                  chatSections={chatSections}
                 setChatSections={setChatSections}
              />
            </div>
          )}
      </div>
  );
};
export default DraggableChat;
