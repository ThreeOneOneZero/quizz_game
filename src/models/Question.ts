export interface Question {
  id: number;
  questionText: string;
  options: string[];
  userAnswer?: number;
}
