import { Typography } from "antd";
import { BackgroundResultColor } from "../types";
import { useGlobalStore } from "../store";
import { checkAnswer } from "../utils";

const { Title } = Typography;

const ResultLabel = () => {
  const questionsList = useGlobalStore((state) => state.questionList);

  const numberOfCorrectedAnswer = questionsList.reduce<number>(
    (result, value) => {
      let currentResult = result;
      if (checkAnswer(value.selected_answer, value.corrected_answer)) {
        currentResult++;
      }
      return currentResult;
    },
    0
  );

  const getBackgroundColor = (): BackgroundResultColor => {
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
        background: getBackgroundColor(),
        padding: "0 10px",
      }}
    >
      {`You scored ${numberOfCorrectedAnswer} out of ${questionsList.length}`}
    </Title>
  );
};

export default ResultLabel;
