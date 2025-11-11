import { FC, FormEvent, useState } from 'react'
import type { QuickAction } from '../types/chat'

interface MessageInputProps {
  onSend(message: string): void
  quickActions?: QuickAction[],
  onGenerateDashboard(): void // ✅ nuevo prop
  isActive: Boolean
}

const MessageInput: FC<MessageInputProps> = ({ onSend, quickActions = [], onGenerateDashboard,isActive}) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(message)
  }

  const sendMessage = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }
    onSend(trimmed)
    setMessage('')
  }

  const handleQuickAction = (action: QuickAction) => {
    // ✅ Si el botón es "Generar Dashboard", llama la función especial
    if (action.id === 'generate-dashboard' && !isActive) {
      onGenerateDashboard()
      return
    }
    // Si no, envía el mensaje normal
    if(action.id === 'chat'){
      if(isActive){
        onGenerateDashboard();
      } 
       sendMessage(action.message)
    }
    console.log(isActive)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {quickActions.length > 0 && (
        <div className="flex gap-4 justify-center mb-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleQuickAction(action)}
              className="flex items-center gap-2 py-2 px-4 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors text-emerald-700 dark:text-emerald-300"
            >
              <span className="material-icons text-base text-emerald-500 dark:text-emerald-400">
                {action.icon}  {/* boton de generar dashboard*/}
              </span>
              {action.label}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type your message here..."
          className="w-full py-3 pl-4 pr-12 rounded-lg bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg bg-primary text-white hover:opacity-90 transition-opacity"
          aria-label="Send message"
        >
          <span className="material-icons">send</span>
        </button>
      </form>
    </div>
  )
}

export default MessageInput
