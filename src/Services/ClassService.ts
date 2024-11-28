import { type Class } from "../models/Class";
import { User } from "../models/User";

export class ClassService {
  static async createClass(newClass: Class): Promise<void> {
    // TODO BACK
    console.log("Creating class:", newClass);
  }

  static async getQuizzesByClassId(classId: number): Promise<any[]> {
    // TODO BACK - QUIZZ SERVICE
    return [];
  }

  static async getClassesByAuthorId(authorId?: User): Promise<Class[]> {
    // TODO BACK
    if (!authorId) return [];
    return [];
  }

  static async getClassesByUserId(userId?: User): Promise<Class[]> {
    // TODO BACK
    if (!userId) return [];
    return [];
  }
}
