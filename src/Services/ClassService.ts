import { Class } from '../models/Class';

class ClassService {
  private classes: Class[] = [];

  getClassesByProfessor(authorId: number): Class[] {
    return this.classes.filter((classes) => classes.authorId === authorId);
  }

  addClass(newClass: Class) {
    this.classes.push(newClass);
  }
}

export default new ClassService();
