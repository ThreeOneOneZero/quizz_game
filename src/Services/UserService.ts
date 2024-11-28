import { User } from "../models/User";
import { Role } from "../types/Role";
import apiClient from "../Utils/api";

class UserService {
  private currentUser: User | null = null;

  setUser(userData: User) {
    this.currentUser = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  static async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar dados dos usuários: ${error}`);
    }
  }

  async getUser(userId: string): Promise<User> {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar dados do usuário: ${error}`);
    }
  }

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem("user");
    console.log("Current user from localStorage", storedUser);
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  }

  getUserRole() {
    return this.currentUser?.role || null;
  }

  clearUser() {
    this.currentUser = null;
    localStorage.removeItem("user");
  }

  isAuthorized(requiredRole: Role): boolean {
    return this.currentUser ? this.currentUser.role === requiredRole : false;
  }

  async getAllStudents(): Promise<User[]> {
    // TODO BACK
    return [
      {
        id: 1,
        name: "Alice",
        email: "",
        role: Role.Student,
      },
      { id: 2, name: "Bob", email: "", role: Role.Student },
      { id: 3, name: "Charlie", email: "", role: Role.Student },
      { id: 4, name: "Caraca", email: "", role: Role.Student },
      { id: 5, name: "Xilapada", email: "", role: Role.Student },
      { id: 6, name: "Mae", email: "", role: Role.Student },
    ];
  }
}
const UserServiceInstance = new UserService();
export default UserServiceInstance;
