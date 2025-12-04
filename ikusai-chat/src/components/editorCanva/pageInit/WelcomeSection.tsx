import type { FC } from "react";

interface WelcomeSectionProps {
     username: string
}
 const WelcomeSection: FC<WelcomeSectionProps> = ({ username = "Usuario" }) =>{
  return (
    <div className="flex flex-col gap-0 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-wrap justify-between items-start gap-4 p-4 mt-8">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-text-primary-light dark:text-text-primary-dark text-4xl font-black">
            Bienvenido de nuevo, {username}
          </p>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-base">
            Vamos a crear algo increíble hoy.
          </p>
        </div>

        <div className="flex flex-1 gap-3 flex-wrap justify-start sm:justify-end">
          <button className="rounded-lg h-12 px-5 bg-primary text-text-primary-light text-base font-bold">
            Crear un diseño
          </button>

          <button className="rounded-lg h-12 px-5 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm text-text-primary-light dark:text-text-primary-dark text-base font-bold">
            Ir a la Pizarra
          </button>
        </div>
      </div>

    </div>
  );
}
export default  WelcomeSection
