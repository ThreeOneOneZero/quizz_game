import { Question, QuestionRequest } from "../models/Question";
import apiClient from "../Utils/api";

export class QuestionService {
  static async createQuestion(request: QuestionRequest): Promise<Question> {
    const response = await apiClient.post("/questions", {
      enunciado: request.questionText,
      nivel_dificuldade: request.difficulty,
      alternativas: request.options.map((opt) => ({
        texto: opt.text,
        correta: opt.isCorrect,
      })),
    });
    return response.data;
  }

  static async getQuestions(): Promise<Question[]> {
    const response = await apiClient.get("/questions");
    return response.data;
  }
}
