import { Answer } from './answer';
export interface LessonCreation {
  userId: number,
  categoryId: number,
}

export interface Lesson {
  id: number,
  userId: number,
  categoryId: number,
  categoryTitle: string,
  answers: Answer[]
}
