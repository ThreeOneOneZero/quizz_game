import { mockQuizz, mockSecondQuizz } from "../../data/quizzes";
import QuizzService from "../../Services/QuizzService";

export const localQuizz = (): void => {
  QuizzService.setQuizzes(mockSecondQuizz);
};
