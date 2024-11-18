import { User } from "../models/User";
import { Role } from "../types/Role";

export const localUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "1234",
    role: Role.Professor,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "1234",
    role: Role.Student,
  },
];
