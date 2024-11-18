import { QuizzDificulty } from "../types/Dificulty";
import { Question } from "./Question";

export interface Quizz {
  id: number;
  title: string;
  authorId: number;
  difficulty: QuizzDificulty;
  questions: Question[];
}
