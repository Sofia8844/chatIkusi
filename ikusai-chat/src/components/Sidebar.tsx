import { FC } from 'react'
import type { ChatHistorySection } from '../types/chat'

interface SidebarProps {
  sections: ChatHistorySection[]
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: FC<SidebarProps> = ({ sections,isCollapsed, onToggleCollapse }) => {
  return (
    <aside
      className={`transition-all duration-700 ease-in-out border-r border-light-border dark:border-dark-border bg-white dark:bg-zinc-900 flex flex-col p-4 ${
        isCollapsed ? 'w-16' : 'w-1/4 max-w-xs'
      }`}
    >
      {/* Header con botón de colapso */}
      <div className="flex items-center justify-between mb-6 px-2">
        {!isCollapsed && <h1 className="text-xl font-bold">History</h1>}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-md hover:bg-emerald-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <span className="material-icons text-emerald-600 dark:text-emerald-300">
            {isCollapsed ? 'menu' : 'menu_open'}
          </span>
        </button>
      </div>

      {/* Lista de historial */}
      <nav
        className={`flex-grow space-y-4 transition-opacity duration-500 ${
          isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {sections.map((section) => (
          <div key={section.id}>
            <h2 className="px-2 mb-2 text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
              {section.title}
            </h2>
            {section.items.map((item) => {
              const baseClasses = 'flex items-center p-2 rounded-lg transition-colors';
              const activeClasses = 'bg-light-accent dark:bg-dark-accent text-primary font-semibold';
              const inactiveClasses =
                'text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-zinc-800';

              return (
                <a
                  key={item.id}
                  href="#"
                  className={`${baseClasses} ${
                    item.isActive ? activeClasses : inactiveClasses
                  }`}
                >
                  <span
                    className={`material-icons mr-3 text-xl ${
                      item.isActive
                        ? 'text-primary'
                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && item.preview}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Botón inferior */}
      {!isCollapsed && (
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors text-emerald-700 dark:text-emerald-300">
          <span className="material-icons text-emerald-500 dark:text-emerald-400">
            add
          </span>
          New Conversation
        </button>
      )}
    </aside>
  );

}

export default Sidebar
