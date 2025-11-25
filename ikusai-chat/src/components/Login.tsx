import { FC, FormEvent, useMemo, useState } from 'react';
import type { UserProfile } from '../types/auth';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const USERS: UserProfile[] = [
  {
    id: 'cesar-villamil',
    name: 'Cesar Villamil',
    role: 'gerente_general',
    title: 'Gerente General',
  },
  {
    id: 'stefhany-soto',
    name: 'STEFHANY SOTO LUQUE',
    role: 'gerente_proyectos',
    title: 'Gerente de Proyectos',
  },
];

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(USERS[0].id);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const selectedUser = useMemo(
    () => USERS.find((user) => user.id === selectedUserId) ?? USERS[0],
    [selectedUserId],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== '123456') {
      setError('Credenciales no válidas. Usa la clave demo 123456.');
      return;
    }
    setError('');
    onLogin(selectedUser);
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-700/40 bg-emerald-900 text-white shadow-2xl p-8 md:p-10">
          <div className="absolute -left-12 -top-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-24 w-24 rounded-full bg-emerald-300/10 blur-2xl" />
          <div className="relative z-10 space-y-5">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm uppercase tracking-[0.2em]">
              Ikusi · Demo interna
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Bienvenid@ a IkusAI
            </h1>
            <p className="text-emerald-50 text-lg leading-relaxed">
              Accede como parte del equipo Ikusi para conversar con <span className="font-semibold">Ikusito</span>, tu agente
              especializado que conoce el negocio y acelera tus decisiones.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
              <div className="rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                <p className="text-sm text-emerald-100">Roles disponibles</p>
                <p className="text-lg font-semibold">Gerente general · Gerente de proyectos</p>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/15 px-4 py-3">
                <p className="text-sm text-emerald-100">Interacción</p>
                <p className="text-lg font-semibold">Chat directo con Ikusito</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-100">
              <span className="material-icons text-base text-emerald-200">verified_user</span>
              Úsalo para mostrar cómo Ikusi cuida a su gente desde el primer clic.
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-light-border dark:border-dark-border shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-light-text-secondary dark:text-dark-text-secondary">
                Inicio seguro
              </p>
              <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
                Ingresa al chat de Ikusito
              </h2>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center border border-emerald-100 dark:border-emerald-800">
              <span className="material-icons text-emerald-600 dark:text-emerald-300 text-xl">chat</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                Selecciona tu usuario
              </span>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-emerald-500">
                  account_circle
                </span>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border rounded-xl px-10 py-3 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
                >
                  {USERS.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} · {user.title}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary">
                Contraseña demo
              </span>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-emerald-500">
                  lock
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-white dark:bg-zinc-800 border border-light-border dark:border-dark-border rounded-xl px-10 py-3 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
                />
              </div>
              <p className="mt-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Clave demo: <span className="font-semibold text-emerald-600 dark:text-emerald-300">123456</span>
              </p>
            </label>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-700 text-sm">
                <span className="material-icons text-base">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              Entrar y chatear con Ikusito
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-light-accent dark:bg-dark-accent border border-light-border dark:border-dark-border px-4 py-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <p className="font-semibold text-light-text-primary dark:text-dark-text-primary">
              Bienvenida Ikusi
            </p>
            <p>
              Presenta este demo con orgullo: Ikusito está listo para responder y acompañar a cada líder desde el primer mensaje.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
