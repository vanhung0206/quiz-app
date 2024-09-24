import { Button } from "antd";
import { useCallback } from "react";
import { useGlobalStore } from "../store";
import QuestionItem from "./QuestionItem";
import { useNavigate } from "react-router-dom";

interface IQuestionListProps {
  isShowResult?: boolean;
}

const QuestionList = (props: IQuestionListProps) => {
  const questionList = useGlobalStore((state) => state.questionList);
  const setQuestionList = useGlobalStore((state) => state.setQuestionList);
  const navigate = useNavigate();
  const isShowSubmitButton = questionList.every(
    (item) => !!item.selected_answer
  );

  const onClickSubmit = () => {
    navigate("/result");
  };

  const onSelectAnswer = useCallback(
    (value: string, index: number) => {
      setQuestionList((prev) => {
        const newQuestionList = [...prev];
        const selectedItem = {
          ...newQuestionList[index],
        };
        selectedItem.selected_answer = value;
        newQuestionList[index] = selectedItem;
        return newQuestionList;
      });
    },
    [setQuestionList]
  );

  const renderQuestionItem = () => {
    return questionList.map((item, index) => (
      <QuestionItem
        questionItem={item}
        key={`question-${index}`}
        index={index}
        onSelectAnswer={onSelectAnswer}
        isShowResult={props.isShowResult}
      />
    ));
  };

  const renderSubmitButton = () => {
    if (props.isShowResult || !isShowSubmitButton) {
      return null;
    }

    return (
      <Button
        onClick={onClickSubmit}
        style={{ marginTop: 20 }}
        size="large"
        block
      >
        SUBMIT
      </Button>
    );
  };

  return (
    <div>
      {renderQuestionItem()}
      {renderSubmitButton()}
    </div>
  );
};

export default QuestionList;
