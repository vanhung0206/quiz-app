import { Typography } from "antd";
import QuestionList from "../components/QuestionList";
import QuizMakerForm from "../components/QuizMakerForm";
import { useGlobalStore } from "../store";
import Loading from "../components/Loading";
import { useLayoutEffect } from "react";
const { Title } = Typography;

const CreateQuiz = () => {
  const questionListStatus = useGlobalStore(
    (state) => state.questionListStatus
  );

  const resetStore = useGlobalStore((state) => state.resetStore);

  useLayoutEffect(() => {
    resetStore();
  }, [resetStore]);

  const renderQuestionList = () => {
    switch (questionListStatus) {
      case "None": {
        return null;
      }
      case "Loading": {
        return <Loading />;
      }
      case "Loaded": {
        return <QuestionList />;
      }
    }
  };

  return (
    <>
      <Title level={2}>QUIZ MAKER</Title>
      <QuizMakerForm />
      {renderQuestionList()}
    </>
  );
};

export default CreateQuiz;
