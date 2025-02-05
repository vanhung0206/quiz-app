export interface IQuestionItemResponse {
  question_number: number;
  topic_number: number;
  question: string;
  answers: string[];
  corrected_answer: string[];
  created_at: string;
  imagesOnPage: string[] | null;
}

export interface IConfig {
  numberOfQuestion: number;
  totalTime: number;
  random?: boolean;
}

export interface IQuestionItemState extends IQuestionItemResponse {
  selected_answers?: string[];
}

export type BackgroundResultColor = "red" | "yellow" | "green";
