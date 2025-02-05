import { App, Button, Form, InputNumber, Space, Switch } from "antd";
import { AxiosError } from "axios";
import { useGlobalStore } from "../store";
import { IConfig, IQuestionItemState } from "../types";
import data from "../data.json";
import { useEffect } from "react";
import { shuffleArray } from "../utils";

function getRandomElements<T>(array: T[], n: number): T[] {
  const shuffled = [...array]; // Tạo bản sao của mảng gốc
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Chọn chỉ số ngẫu nhiên
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Hoán đổi vị trí
  }

  // Nếu n lớn hơn độ dài của mảng, trả về toàn bộ mảng đã trộn
  return shuffled.slice(0, Math.min(n, array.length));
}

const QuizMakerForm = () => {
  const setQuestionListStatus = useGlobalStore(
    (state) => state.setQuestionListStatus
  );
  const questionListStatus = useGlobalStore(
    (state) => state.questionListStatus
  );
  const setQuestionList = useGlobalStore((state) => state.setQuestionList);

  const [form] = Form.useForm();

  const setConfig = useGlobalStore((state) => state.setConfig);
  const config = useGlobalStore((state) => state.config);

  const { notification } = App.useApp();

  const onFinish = async (quizMakerParam: IConfig) => {
    console.log("🚀 ~ onFinish ~ quizMakerParam:", quizMakerParam);
    try {
      notification.destroy();
      setConfig(quizMakerParam);
      let questionList: IQuestionItemState[] = [];

      if (quizMakerParam.random) {
        questionList = getRandomElements(
          data as IQuestionItemState[],
          quizMakerParam.numberOfQuestion
        );
      } else {
        questionList = (data as IQuestionItemState[]).slice(
          0,
          quizMakerParam.numberOfQuestion
        );
      }

      questionList.forEach((item) => {
        shuffleArray(item.answers);
      });

      setQuestionList(questionList);
      setQuestionListStatus("Loaded");
    } catch (error) {
      setQuestionListStatus("None");
      const errorObject = error as Error | AxiosError;
      const errorMessage = errorObject?.message || "Something went wrong!";
      notification.error({
        message: "Error",
        description: errorMessage,
        placement: "bottom",
      });
    }
  };

  useEffect(() => {
    form.resetFields(); // Reset the form to the new initial values
  }, [config, form]);

  return (
    <Form
      onFinish={onFinish}
      disabled={questionListStatus === "Loaded"}
      initialValues={config}
      form={form}
    >
      <Space wrap>
        <Form.Item
          label="Number of question"
          name="numberOfQuestion"
          rules={[
            { required: true, message: "Please enter number of question!" },
          ]}
        >
          <InputNumber
            placeholder="Enter number of question"
            style={{ width: 200 }}
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Total time"
          name="totalTime"
          rules={[{ required: true, message: "Please enter total time!" }]}
        >
          <InputNumber
            placeholder="Enter total time"
            style={{ width: 200 }}
            size="large"
          />
        </Form.Item>
        <Form.Item label="Random" name={"random"}>
          <Switch />
        </Form.Item>
        {questionListStatus !== "Loaded" && (
          <Form.Item>
            <Button
              id="createBtn"
              type="default"
              htmlType="submit"
              size="large"
            >
              Create
            </Button>
          </Form.Item>
        )}
      </Space>
    </Form>
  );
};

export default QuizMakerForm;
