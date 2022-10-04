export interface QuestionCreation {
  id?: number,
  category?: number,
  value: string,
  choices?: string[]
}

export interface Question {
  id: number,
  category: number,
  value: string,
  choices: string[]
}
