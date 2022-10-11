export interface AnswerCreation {
  id?: number,
  lesson: number,
  question: number,
  choice: number,
  value: string,
  is_correct: boolean
}

export interface Answer {
  id: number,
  lesson: number,
  question: number,
  question_value: string,
  choice: number,
  value: string,
  is_correct: boolean
}
