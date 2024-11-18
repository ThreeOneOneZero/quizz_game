import apiClient from "../Utils/api";
import UserService from "./UserService";
import { localUsers } from "../data/users";
import { User } from "../models/User";

class AuthService {
  static async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await apiClient.post("/login", { email, password });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      UserService.setUser(user);
      //To do: test when the user is not found
      return true;
    } catch (error) {
      console.error("User not found:", error);
      return false;
    }
  }

  static logout() {
    UserService.clearUser();
  }

  static isAuthenticated(): boolean {
    const user = UserService.getCurrentUser();
    return !!user;
  }

  //To do: remove after back implementation
  static getLocalUser(email: string, password: string): User | null {
    const user = localUsers.find(
      (user: User) => user.email === email && user.password === password
    );
    return user || null;
  }
}

export default AuthService;
