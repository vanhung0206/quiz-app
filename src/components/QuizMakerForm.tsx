import { App, Button, Form, Select, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { ICategoriesListResponse, IQuizMakerParam } from "../../types";
import { getQuestionsList } from "../apis";
import { LEVEL_LIST } from "../constants";
import { useGlobalStore } from "../store";

const QuizMakerForm = () => {
  const categoriesListResponse = useRouteLoaderData(
    "main"
  ) as ICategoriesListResponse;

  const setQuestionsList = useGlobalStore((state) => state.setQuestionList);
  const setQuestionListStatus = useGlobalStore(
    (state) => state.setQuestionListStatus
  );

  const { notification } = App.useApp();

  const categoriesList = useMemo<DefaultOptionType[]>(() => {
    if (!categoriesListResponse?.trivia_categories) return [];
    return categoriesListResponse.trivia_categories.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [categoriesListResponse]);

  const onFinish = async (quizMakerParam: IQuizMakerParam) => {
    try {
      notification.destroy();
      setQuestionListStatus("Loading");
      const questionsList = await getQuestionsList(quizMakerParam);
      setQuestionsList(questionsList.results);
      setQuestionListStatus("Loaded");
    } catch (error) {
      setQuestionListStatus("None");
      setQuestionsList([]);
      const errorObject = error as Error | AxiosError;
      const errorMessage = errorObject?.message || "Something went wrong!";
      notification.error({
        message: "Error",
        description: errorMessage,
        placement: "bottom",
      });
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Space wrap>
        <Form.Item
          name="categorySelect"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select
            placeholder="Select a category"
            options={categoriesList}
            style={{ width: 400 }}
            size="large"
            id="categorySelect"
          />
        </Form.Item>
        <Form.Item
          name="difficultySelect"
          rules={[{ required: true, message: "Please select difficulty!" }]}
        >
          <Select
            placeholder="Select difficulty"
            options={LEVEL_LIST}
            style={{ width: 200 }}
            id="difficultySelect"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button id="createBtn" type="default" htmlType="submit" size="large">
            Create
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default QuizMakerForm;
