import { Quizz } from "../models/Quizz";
import apiClient from "../Utils/api";
import UserService from "./UserService";

class QuizzService {
  quizzes = null;

  getQuizzes() {
    return this.quizzes;
  }

  getAllQuizzes() {
    // To do: Get all quizzes from the server

    return null;
  }

  async getQuizzesByCreator(authorId) {
    try {
      const response = await apiClient.get(`/quizzes/author/${authorId}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar quizzes do autor");
    }
  }

  createQuizz(newQuizz) {
    // To do: Send the new quizz to the server
  }

  async loadUserQuizzes() {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) throw new Error("Usuário não está logado");

    try {
      const response = await apiClient.get("/quizzes/my-quizzes");
      this.setQuizzes(response.data);
    } catch (error) {
      throw new Error("Erro ao carregar quizzes");
    }
  }

  setQuizzes(quizzes) {
    this.quizzes = quizzes;
  }
}
const quizzServiceInstance = new QuizzService();
export default quizzServiceInstance;
