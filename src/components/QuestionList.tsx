import { useCallback } from "react";
import { useGlobalStore } from "../store";
import QuestionItem from "./QuestionItem";

interface IQuestionListProps {
  isShowResult?: boolean;
}

const QuestionList = (props: IQuestionListProps) => {
  const questionList = useGlobalStore((state) => state.questionList);
  const setQuestionList = useGlobalStore((state) => state.setQuestionList);

  const onSelectAnswer = useCallback(
    (value: string, index: number) => {
      setQuestionList((prev) => {
        const newQuestionList = [...prev];
        const selectedItem = {
          ...newQuestionList[index],
        };
        if (selectedItem.selected_answer === value) {
          selectedItem.selected_answer = undefined;
        } else {
          selectedItem.selected_answer = value;
        }
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

  return <div>{renderQuestionItem()}</div>;
};

export default QuestionList;
