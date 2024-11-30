import { jwtDecode } from "jwt-decode";
import apiClient from "../Utils/api";
import UserService from "./UserService";
import Cookies from "js-cookie";

class AuthService {
  static async login(email, password) {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        senha: password,
      });

      const { token } = response.data;
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      Cookies.set("token", token, { expires: new Date(decoded.exp * 1000) });
      // console.log(UserService.getCurrentUser());

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

  static async register(email, password, name, role) {
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

    Cookies.remove("token");
    UserService.clearUser();
  }

  static isAuthenticated() {
    return !!Cookies.get("token");
  }

  static getToken() {
    return Cookies.get("token");
  }
}

export default AuthService;
