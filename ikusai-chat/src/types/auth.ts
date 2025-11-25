export type UserRole = 'gerente_general' | 'gerente_proyectos';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  title?: string;
}
