import { FC } from 'react'

interface ChatHeaderProps {
  title: string
  isDarkMode: boolean
  onToggleTheme: () => void
}

const ChatHeader: FC<ChatHeaderProps> = ({ title, isDarkMode, onToggleTheme }) => {
  return (
    <header className="flex justify-between items-center p-4">
      <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
        {title}
      </h2>
      <button
        type="button"
        onClick={onToggleTheme}
        className="flex items-center gap-2 py-2 px-4 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors text-emerald-700 dark:text-emerald-300"
        aria-label="Toggle theme"
      >
        <span className="material-icons text-base text-emerald-500 dark:text-emerald-400">
          {isDarkMode ? 'dark_mode' : 'light_mode'}
        </span>
        {isDarkMode ? 'Modo oscuro' : 'Modo claro'}
      </button>
    </header>
  )
}

export default ChatHeader
