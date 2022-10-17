import { Question } from './question';
export interface CategoryCreation {
  id?: number,
  title: string,
  description: string,
}

export interface Category {
  id: number,
  title: string,
  description: string,
  questions: Question[]
}
