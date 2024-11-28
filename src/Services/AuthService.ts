import { jwtDecode } from "jwt-decode";
import apiClient from "../Utils/api";
import { Role } from "../types/Role";
import UserService from "./UserService";

interface DecodedToken {
  id: string;
  nome: string;
  tipo: Role;
  iat?: number;
  exp?: number;
}
class AuthService {
  static async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        senha: password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      console.log(UserService.getCurrentUser());
      UserService.setUser({
        id: Number(decoded.id),
        email: "",
        name: decoded.nome,
        role: decoded.tipo,
      });

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  }

  static async register(
    email: string,
    password: string,
    name: string,
    role: Role
  ): Promise<boolean> {
    try {
      const response = await apiClient.post("/auth/register", {
        email,
        senha: password,
        nome: name,
        tipo: role,
      });

      return response.status === 201;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  }

  static logout() {
    localStorage.removeItem("token");
    UserService.clearUser();
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }
}

export default AuthService;
