import { Button, Typography } from "antd";
import QuestionList from "../components/QuestionList";
import ResultLabel from "../components/ResultLabel";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const Result = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate("/");
  };

  return (
    <>
      <Title level={2}>RESULTS</Title>
      <QuestionList isShowResult />
      <ResultLabel />
      <Button
        onClick={onClickButton}
        style={{ maxWidth: 700 }}
        size="large"
        block
      >
        Create a new quiz
      </Button>
    </>
  );
};

export default Result;
