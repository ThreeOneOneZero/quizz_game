import apiClient from "../Utils/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

class UserService {
  currentUser = null;

  constructor() {
    this.loadUserFromToken();
  }

  setUser(userData) {
    this.currentUser = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  loadUserFromToken() {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      this.setUser({
        id: Number(decoded.id),
        email: "",
        name: decoded.nome,
        role: decoded.tipo,
      });
    }
  }

  static async getUsers() {
    try {
      const response = await apiClient.get("/users");
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar dados dos usuários: ${error}`);
    }
  }

  async getUser(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar dados do usuário: ${error}`);
    }
  }

  getCurrentUser() {
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

  isAuthorized(requiredRole) {
    return this.currentUser ? this.currentUser.role === requiredRole : false;
  }

  async getAllStudents() {
    // TODO BACK
    return [
      {
        id: 1,
        name: "Alice",
        email: "",
        role: "student",
      },
      { id: 2, name: "Bob", email: "", role: "student" },
      { id: 3, name: "Charlie", email: "", role: "student" },
      { id: 4, name: "Caraca", email: "", role: "student" },
      { id: 5, name: "Xilapada", email: "", role: "student" },
      { id: 6, name: "Mae", email: "", role: "student" },
    ];
  }
}
const UserServiceInstance = new UserService();
export default UserServiceInstance;
