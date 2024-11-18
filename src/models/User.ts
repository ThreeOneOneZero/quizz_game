import { Role } from '../types/Role';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  code?: number;
  role: Role;
}
