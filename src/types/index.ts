export interface IQuestionListResponse {
  results: IQuestionItemResponse[];
  response_code: number;
}

export interface IQuestionItemResponse {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IQuestionItemState extends IQuestionItemResponse {
  selected_answer?: string;
}

export interface ICategoryListResponse {
  trivia_categories: ICategoryItemResponse[];
}

export interface ICategoryItemResponse {
  id: number;
  name: string;
}

export interface IQuizMakerParam {
  categorySelect: number;
  difficultySelect: string;
}

export type BackgroundResultColor = "red" | "yellow" | "green";
