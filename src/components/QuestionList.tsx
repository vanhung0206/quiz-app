import { useCallback } from "react";
import { useGlobalStore } from "../store";
import QuestionItem from "./QuestionItem";
import { IQuestionItemState } from "../types";

interface IQuestionListProps {
  isShowResult?: boolean;
}

const updatedSeletedAnswers = (
  selectedItem: IQuestionItemState,
  value: string
): void => {
  const isOnlyTwo = selectedItem.question?.toLowerCase().includes("choose two");

  const hasMultiAnswer = selectedItem.corrected_answer?.length > 1 || isOnlyTwo;

  const itemIndex = selectedItem.selected_answers?.indexOf(value) ?? -1;

  if (itemIndex !== -1) {
    selectedItem.selected_answers?.splice(itemIndex, 1);
    return;
  }

  if (!selectedItem.selected_answers?.length) {
    selectedItem.selected_answers = [value];
    return;
  }

  if (hasMultiAnswer) {
    selectedItem.selected_answers.push(value);
  } else {
    selectedItem.selected_answers = [value];
  }

  // if (isOnlyTwo && selectedItem.selected_answers.length > 2) {
  //   selectedItem.selected_answers = selectedItem.selected_answers.slice(-2);
  // }
};

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

        updatedSeletedAnswers(selectedItem, value);

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
