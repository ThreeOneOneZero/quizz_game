import { mockQuizzes } from "../data/quizzes";
import { Quizz } from "../models/Quizz";
import apiClient from "../Utils/api";
import UserService from "./UserService";

class QuizzService {
  private quizzes: Quizz | null = null;

  getQuizzes(): Quizz | null {
    return this.quizzes;
  }

  getAllQuizzes(): Quizz[] {
    // To do: Get all quizzes from the server

    return mockQuizzes;
  }

  async getQuizzesByCreator(authorId: number): Promise<Quizz[] | null> {
    try {
      const response = await apiClient.get(`/quizzes/author/${authorId}`);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar quizzes do autor");
    }
  }

  createQuizz(newQuizz: Quizz | null): void {
    // To do: Send the new quizz to the server
  }

  async loadUserQuizzes(): Promise<void> {
    const currentUser = UserService.getCurrentUser();
    if (!currentUser) throw new Error("Usuário não está logado");

    try {
      const response = await apiClient.get("/quizzes/my-quizzes");
      this.setQuizzes(response.data);
    } catch (error) {
      throw new Error("Erro ao carregar quizzes");
    }
  }

  setQuizzes(quizzes: Quizz) {
    this.quizzes = quizzes;
  }
}

export default new QuizzService();
