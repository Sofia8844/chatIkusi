export default function SearchSection() {
  return (
    <div className="flex flex-col gap-8 py-10 bg-transparent">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 items-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark text-center">
            ¿Qué diseñamos hoy?
          </h1>

          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
              <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-3xl">
                search
              </span>
            </div>

            <input
              type="search"
              placeholder="Buscar diseño"
              className="w-full rounded-full bg-white/60 dark:bg-surface-dark/60 py-5 pl-16 pr-6 text-xl text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary/50 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
    
  );
}
