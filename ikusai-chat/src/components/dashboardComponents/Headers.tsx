import DashboardPDFGenerator from "./DashboardPDFGenerator";
import type{ Widget } from "../DashboardPanel";
import React from "react";
 interface Props{
    widgets: Widget[]
    dashboardRef:React.RefObject<HTMLDivElement>
    onClose: () =>void
}

export default function HeaderDashboard({widgets,dashboardRef,onClose}: Props){
        return (
          
      <div className="p-4 border-b border-light-border dark:border-dark-border flex justify-between items-center">

        <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Tablero Interactivo
        </h2>

        {/* Exportar PDF */}

        <DashboardPDFGenerator widgets={widgets} dashboardRef={dashboardRef} />
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Arrastra los elementos libremente
        </p>
        <button
          onClick={onClose}
          className="flex items-center gap-2 py-2 px-4 bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors text-emerald-700 dark:text-emerald-300"
        >
          <span className="material-icons">arrow_back</span>
          Volver al chat
        </button>
      </div>
        )
}