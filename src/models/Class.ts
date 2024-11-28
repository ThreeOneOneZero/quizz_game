import { User } from "./User";

export interface Class {
  name: string;
  authorId: number;
  students: User[];
}
