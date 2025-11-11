import { FC } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'
import type { ChatSection, QuickAction } from '../types/chat'

interface ChatContainerProps {
  sections: ChatSection[]
  quickActions: QuickAction[]
  isDarkMode: boolean
  onToggleTheme: () => void
  onSendMessage: (message: string) => void
  onGenerateDashboard: () => void;
  isActive: Boolean
}

const ChatContainer: FC<ChatContainerProps> = ({
  sections,
  quickActions,
  isDarkMode,
  onToggleTheme,
  onSendMessage,
  onGenerateDashboard,
  isActive
}) => {
  return (
    <main className="flex-1 flex flex-col bg-chat-gradient-light dark:bg-chat-gradient-dark">
      <ChatHeader title="IkusAI Chat" isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />
      <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto">
        {sections.map((section) => (
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
        <MessageInput isActive={isActive} quickActions={quickActions} onSend={onSendMessage}  onGenerateDashboard={onGenerateDashboard}/>
      </div>
    </main>
  )
}

export default ChatContainer
