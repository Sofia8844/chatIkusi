import Header from "./Header";
import SearchSection from "./SearchSection";
import WelcomeSection from "./WelcomeSection";
import TemplateCarousel from "./LayoutCards";

export default function AppEditor() {
return (
        <div className="font-display bg-background-light dark:bg-background-dark relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-gradient-to-b from-pastel-green to-pastel-purple dark:from-surface-dark dark:to-background-dark">
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col w-full max-w-screen-xl flex-1">
                
                <Header  avatarUrl="/src/icons/icons8-user-64.png"/>
    
                <main className="flex-1">
                  <SearchSection />
    
                  <WelcomeSection username="Sofía"/>
    
                  <TemplateCarousel />
                </main>
    
              </div>
            </div>
          </div>
        </div>
      ); 
/* return (

        <html className="light" lang="es"><head>
            <meta charset="utf-8" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <title>Panel Principal</title>
            <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&amp;display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />

        </head>
            <body className="font-display bg-background-light dark:bg-background-dark">
                <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-gradient-to-b from-pastel-green to-pastel-purple dark:from-surface-dark dark:to-background-dark">
                    <div className="layout-container flex h-full grow flex-col">
                        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
                            <div className="layout-content-container flex flex-col w-full max-w-screen-xl flex-1">
                                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/30 dark:border-surface-dark/20 px-4 sm:px-6 lg:px-10 py-3 bg-transparent">
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-4 text-text-primary-light dark:text-text-primary-dark">
                                            <div className="size-6 text-primary">
                                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor"></path>
                                                    <path clip-rule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z" fill="currentColor" fill-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight tracking-[-0.015em]">DiseñoApp</h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 justify-end gap-4 sm:gap-6 lg:gap-8">
                                        <div className="hidden md:flex items-center gap-9">
                                            <a className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal" href="#">Plantillas</a>
                                            <a className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal" href="#">Recursos</a>
                                            <a className="text-text-primary-light dark:text-text-primary-dark text-sm font-medium leading-normal" href="#">Precios</a>
                                        </div>
                                        <button className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-text-primary-light text-sm font-bold leading-normal tracking-[0.015em]">
                                            <span className="truncate">Crear un diseño</span>
                                        </button>
                                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User avatar image" style={{ backgroundimage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqBWHnKw97MVaOvjF0VRHwtJ0wEgVBhPjhMTBOK88sd_q_6Atdv7uxfhfvHJQH0bW7mK7YHXLfDXQbNHlen3RQdRuL0SBwodi1SCngVDyXyGpX0uXl2WaYuQiUfzPC7krPI9zdL2knJb3BxPxEERx1b3NMYT1O1B6-Llj1DLd78jpbSx1leQ2kiLA5eeL8RtM5dHeT0CpB0i4rL85wASNwIQpWUoF8iMiLgbYuYOT1wecVW5sN5yediIfQQlM3aOgax0tv-ovMlFDP')" }}></div>
                                    </div>
                                </header>
                                <main className="flex-1">
                                    <div className="flex flex-col gap-8 py-10 bg-transparent">
                                        <div className="px-4 sm:px-6 lg:px-10">
                                            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 items-center">
                                                <h1 className="text-4xl sm:text-5xl font-bold text-text-primary-light dark:text-text-primary-dark tracking-tight text-center">¿Qué diseñamos hoy?</h1>
                                                <div className="relative w-full">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
                                                        <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark !text-3xl">search</span>
                                                    </div>
                                                    <input className="w-full rounded-full border-none bg-white/60 dark:bg-surface-dark/60 py-5 pl-16 pr-6 text-xl text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:ring-2 focus:ring-primary/50 backdrop-blur-sm" placeholder="Buscar diseño" type="search" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0 px-4 sm:px-6 lg:px-10">
                                        <div className="flex flex-wrap justify-between items-start gap-4 p-4 mt-8">
                                            <div className="flex min-w-72 flex-col gap-3">
                                                <p className="text-text-primary-light dark:text-text-primary-dark text-4xl font-black leading-tight tracking-[-0.033em]">Bienvenido de nuevo, Usuario</p>
                                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal leading-normal">Vamos a crear algo increíble hoy.</p>
                                            </div>
                                            <div className="flex flex-1 gap-3 flex-wrap justify-start sm:justify-end">
                                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-text-primary-light text-base font-bold leading-normal tracking-[0.015em]">
                                                    <span className="truncate">Crear un diseño</span>
                                                </button>
                                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm text-text-primary-light dark:text-text-primary-dark text-base font-bold leading-normal tracking-[0.015em]">
                                                    <span className="truncate">Ir a la Pizarra</span>
                                                </button>
                                            </div>
                                        </div>
                                        <h2 className="text-text-primary-light dark:text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">Empieza con una plantilla</h2>
                                        <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
                                            <div className="flex items-stretch p-4 gap-4">
                                                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer">
                                                    <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col" data-alt="Abstract green and white pattern" style={{
                                                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVVqFtGzzHbboylJdCcxiL0uY7fuxq6qhhJXYD5QE1bOWMMEAKa9ooKHFYfajHJoa3l_sVIXlRlX2nkhAE-1v0x5mNpWDRpPYXqV6L93-Ff2zBmIhiu0hpVe9lu4ys7OC0Nt4BtSi6LsqshCEnGvCYsXuLAMfJTNfq7NqNtOjS4lSVT18mYqLnse6N1HIlt5-_qW7a6Ee8EJmsSW0sQKP2gKJRv_hFWZ-D7Md6WRnhuazi3w7g6qrJCsANayoEZN2C6WOYWjjDQ4Bq')"
                                                    }}></div>
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">Presentación</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Crea diapositivas impactantes</p>
                                                    </div>
                                                </div>
                                                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer">
                                                    <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col" data-alt="Abstract green and light green shapes"
                                                        style={{
                                                            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEKylKYOsefehrNHKsSVjnyo6PzhBySkv4A_BHmfZ1qCCdZLescDhDuOn0A9Dj-GJs1Lf-qH5C_hBLFA0h5yn65Hg3CKRCUYl3Dg4bkoM5w8pqtMTdcRpMiKhxQ7XuyBpewd6M3DRnHaaXagBacVUpQ4dbA7126TG3o8ucT2UTPJwR5eT3uFGGcMQSoIoz57VMgK8_sZSLAiV3SSMqim0N7h0l5d1cWjVCzhnkR20Mu4Qa0RXuIpVaY6srd73PG5a3B6XevCvtWW39')"

                                                        }}></div>
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">Post para Instagram</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Diseños para redes sociales</p>
                                                    </div>
                                                </div>
                                                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer">
                                                    <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col" data-alt="Minimalist document layout with green header" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtpCoyCHtHQUjaBvROUy13_UNtUJfoN6PuH4JLpjlCoQUsK1icp_EUfGc-oo6SLarFuO_ClIBJ5Q_vFeFteZajL07vc0w-Nnw_rMVrhtIFY6_IEBVdmj8NsQeIUpEfRjjyHelkNtyLnpilalNdZbEV8Z029CzyclGvNyanAy2Yezxyw4MlCM7t5tdT0oe39nIBgVAI419xQQMzmyLB_w3h03VVYkhsZQcLBISsgvcHuFyWuo7M9-zcS6uyfsd0ng7uduO6mbb9QM1I')" }}></div>
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">Documento A4</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Para informes y documentos</p>
                                                    </div>
                                                </div>
                                                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 cursor-pointer">
                                                    <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg flex flex-col" data-alt="Stylized resume template with pastel green accents" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQLXkVZXpQzMckN3zDqS_TScR0DiwrLkcW6e-yfH5YV33iLVb7u2H---iX2iw8kjEHRtaj6npWlphjGBjtSTaW7CpKT1sjqdwpz2UPJFUB13QG63RigrofGZfAYihWsrUQbMFsftjXAjdFJd3ZaceNjiKmRcGS18eANV_rMLtmEglwLqadf7Q7VsF7iz6EX2h8fuhRAHb-oOhzK5XDi8t1zy10BV7Zfof9W0VG0tkCH4E8bkDx_PIN0d5XwWXgu6uuMy4gu0j2jP3J')" }}></div>
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">Currículum</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Destaca profesionalmente</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 className="text-text-primary-light dark:text-text-primary-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-6">Mis Proyectos Recientes</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                                            <div className="flex flex-col gap-3 group">
                                                <div className="relative w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg bg-surface-light dark:bg-surface-dark overflow-hidden cursor-pointer" data-alt="Thumbnail of a marketing presentation design" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcWH-6Kc_N7KREs-EToB6SEoQtzZUxxtdTNcOu_NzGQWyabRbamcKdWu2B5lELprQzd0RuZKhg61YgACvRfZJFA93IeEnLRSt9cZL6pfvibrJt4obYm0gPUrSA-5DziBY67531vYcik2y7yCx7hLOWN7nwdI3M7gtQrSdC_BB0O5M6p_LH1dzzHTAAp-OQ1Eoq0VDph6qfaoBEMX5KMUvxmljdSx2F6156H6XhnYEz_U2iaQ5NI7VUWqZSYQWIuR4-iNERTK9SAfBd')" }}>
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">Presentación Marketing Q3</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Modificado: Hace 2 días</p>
                                                    </div>
                                                    <button className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-surface-dark/50 text-text-secondary-light dark:text-text-secondary-dark">
                                                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 group">
                                                <div className="relative w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg bg-surface-light dark:bg-surface-dark overflow-hidden cursor-pointer" data-alt="Thumbnail of an Instagram post about a summer sale" style=
                                                    {{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjNbI1B_f66th6oXIW0YgWNUCkJtiwgp0wDVmK37VOH3fEZBQYcxj6WdOn1YYRKmAfg94FGESyCA4Tkbbf-xum1Iv_rktDZ1XytHWU5zYZvFIldVfktAL46FTQs779Ucfn016Qgp7mV1yBmnzbmhjHoDQRDlleqMvF9NWflz-88LEA3YqDOSr3Du-qd8RRh4vKmTr77nNnOLYu9aGjDxhthA5fmOYda_Uqd1hwUD-xC10lz5jRFO6hJq4IelDITO4oZPtX2FYw-Yaj')" }}>
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">Post Venta de Verano</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Modificado: Hace 5 días</p>
                                                    </div>
                                                    <button className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-surface-dark/50 text-text-secondary-light dark:text-text-secondary-dark">
                                                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 group">
                                                <div className="relative w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg bg-surface-light dark:bg-surface-dark overflow-hidden cursor-pointer" data-alt="Thumbnail of an internal company report document" style=
                                                    {{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASNVAWKgpq2edY6OMt5RcwrImqOEOJKb1N6RU2ki43R2zMjx3FzLPWR5GQgVHaPZolqJZO5r3mH1XJUty02Mm6-lWR5QcFnL_xtJswEHQQsNBLE18I_dQq9MgtopCD_5omn5Y1ZJaFGtnY8Np2OZHIqzXwTI7NLsi-W8Paxsmm70U9hM4v3FUhhaBz8sNs7wLeE-Pek02QUmzqbbe93cwTjdiTB0Rvm2QWP7v2c-xtQHBkbFb3L0jt7c2ZHHODcy5iMaPsSO7OnTPh')" }}>
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">Informe Interno 2024</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">La semana pasada</p>
                                                    </div>
                                                    <button className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-surface-dark/50 text-text-secondary-light dark:text-text-secondary-dark">
                                                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 group">
                                                <div className="relative w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg bg-surface-light dark:bg-surface-dark overflow-hidden cursor-pointer" data-alt="Thumbnail of a professional resume for John Doe" style={{ backgroundimage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqbWZ8WmgeghcZLeOXCH_fU2C0Qklqcwp4e3I91T_DsxYaxON_PF9RIuQutmHhdfUoW6IIwV5Idf_cGj-RhQHhRvQ22T0nrpDtyrrrHa3-oYjgY5KGOydJTqKHx5JpxIRX8qHbA1Q08_y0oRcXVkHHCv-Qr7I4JJFTH8mvVdSoHcJd6AO4TR9w9OsfDCikubDcivlTmE3gzR3pbJNjGQuHNXyLgs3aXNSgxh007mPvvc830if1TMyT7AL4TcZWBN7MA2EEAjkpy9AM')" }}>
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal">CV Juan Pérez</p>
                                                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-normal">Modificado: El mes pasado</p>
                                                    </div>
                                                    <button className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-surface-dark/50 text-text-secondary-light dark:text-text-secondary-dark">
                                                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div></body></html>

    );  */
}
