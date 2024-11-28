import { QuizzDificulty } from "../types/Dificulty";
import { Question, QuestionRequest } from "./Question";

export interface Quizz {
  id: number;
  title: string;
  authorId: number;
  difficulty: QuizzDificulty;
  questions: Question[];
}
export interface CreateQuizz {
  id: number;
  title: string;
  authorId: number;
  difficulty: QuizzDificulty;
  questions: QuestionRequest[];
}
