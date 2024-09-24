import { App, Button, Form, Select, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { ICategoryListResponse, IQuizMakerParam } from "../types";
import { getQuestionList } from "../apis";
import { LEVEL_LIST } from "../constants";
import { useGlobalStore } from "../store";

const QuizMakerForm = () => {
  const categoryListResponse = useRouteLoaderData(
    "main"
  ) as ICategoryListResponse;

  const setQuestionList = useGlobalStore((state) => state.setQuestionList);
  const setQuestionListStatus = useGlobalStore(
    (state) => state.setQuestionListStatus
  );

  const { notification } = App.useApp();

  const categoryList = useMemo<DefaultOptionType[]>(() => {
    if (!categoryListResponse?.trivia_categories) return [];
    return categoryListResponse.trivia_categories.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [categoryListResponse]);

  const onFinish = async (quizMakerParam: IQuizMakerParam) => {
    try {
      notification.destroy();
      setQuestionListStatus("Loading");
      const questionList = await getQuestionList(quizMakerParam);
      setQuestionList(questionList.results);
      setQuestionListStatus("Loaded");
    } catch (error) {
      setQuestionListStatus("None");
      setQuestionList([]);
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
            options={categoryList}
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
