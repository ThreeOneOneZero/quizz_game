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
    return this.currentUser;
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
}

export default new UserService();
