import axios from "axios";
import {
  ICategoryListResponse,
  IQuestionListResponse,
  IQuizMakerParam,
} from "../types";
const BASE_URL = "https://opentdb.com";

export const getCategoryList = async (): Promise<ICategoryListResponse> => {
  const { data } = await axios.get<ICategoryListResponse>(
    `${BASE_URL}/api_category.php`
  );

  return data;
};

export const getQuestionList = async (
  { categorySelect, difficultySelect }: IQuizMakerParam,
  amount: number = 5
): Promise<IQuestionListResponse> => {
  const response = await axios.get<IQuestionListResponse>(
    `${BASE_URL}/api.php?amount=${amount}&category=${categorySelect}&difficulty=${difficultySelect}&type=multiple`
  );
  return response.data;
};
