export interface ChoiceCreation {
  id?: number,
  question?: number,
  value: string,
  is_correct_answer: boolean,
}
export interface Choice {
  id: number,
  question: number,
  value: string,
  is_correct_answer: boolean,
}
