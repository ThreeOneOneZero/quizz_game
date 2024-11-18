import { User } from './User';

export interface Class {
  id: number;
  name: string;
  authorId: number;
  students: User[];
}
