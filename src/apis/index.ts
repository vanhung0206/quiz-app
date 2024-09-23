import axios from "axios";
import {
  ICategoriesListResponse,
  IQuestionsListResponse,
  IQuizMakerParam,
} from "../../types";
const BASE_URL = "https://opentdb.com";

export const getCategoriesList = async (): Promise<ICategoriesListResponse> => {
  const { data } = await axios.get<ICategoriesListResponse>(
    `${BASE_URL}/api_category.php`
  );

  return data;
};

export const getQuestionsList = async (
  { categorySelect, difficultySelect }: IQuizMakerParam,
  amount: number = 5
): Promise<IQuestionsListResponse> => {
  const response = await axios.get<IQuestionsListResponse>(
    `${BASE_URL}/api.php?amount=${amount}&category=${categorySelect}&difficulty=${difficultySelect}&type=multiple`
  );
  return response.data;
};
