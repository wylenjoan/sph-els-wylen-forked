export interface LessonCreation {
  id?: number,
  userId: number,
  categoryId: number,
  answers?: number[]
}

export interface Lesson {
  id: number,
  userId: number,
  categoryId: number,
  answers: number[]
}
