import { Typography } from "antd";
import { BackgroundResultColor } from "../../types";
import { useGlobalStore } from "../store";

const { Title } = Typography;

const ResultLabel = () => {
  const questionsList = useGlobalStore((state) => state.questionsList);

  const numberOfCorrectedAnswer = questionsList.reduce<number>(
    (result, value) => {
      let currentResult = result;
      if (value.selected_answer === value.correct_answer) {
        currentResult++;
      }
      return currentResult;
    },
    0
  );

  const renderBackground = (): BackgroundResultColor => {
    if (numberOfCorrectedAnswer <= 1) {
      return "red";
    }

    if (numberOfCorrectedAnswer <= 3) {
      return "yellow";
    }

    return "green";
  };

  return (
    <Title
      level={3}
      style={{
        background: renderBackground(),
        padding: "0 10px",
      }}
    >
      {`You scored ${numberOfCorrectedAnswer} out of ${questionsList.length}`}
    </Title>
  );
};

export default ResultLabel;
