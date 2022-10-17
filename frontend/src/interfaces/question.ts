import { Choice } from './choice';
export interface QuestionCreation {
  id?: number,
  category?: number,
  value: string,
}

export interface Question {
  id: number,
  category: number,
  value: string,
  choices: Choice[]
}
