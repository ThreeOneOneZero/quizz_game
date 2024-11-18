import { Quizz } from "../models/Quizz";
import { QuizzDificulty } from "../types/Dificulty";
import { mockQuestions, mockSecondQuestions } from "./questions";

export const mockQuizz: Quizz = {
  id: 1,
  title: "Quizz de conhecimentos gerais",
  authorId: 1,
  difficulty: QuizzDificulty.Easy,
  questions: mockQuestions,
};
export const mockSecondQuizz: Quizz = {
  id: 2,
  title: "Quizz de dificuldade média",
  authorId: 2,
  difficulty: QuizzDificulty.Medium,
  questions: mockSecondQuestions,
};

export const mockQuizzes: Quizz[] = [mockQuizz, mockSecondQuizz];
