import { Space, Typography } from "antd";
import { IQuestionItemState } from "../../types";
import Answer, { IAnswerProps } from "./Answer";
import { memo, useMemo } from "react";

const { Title } = Typography;

interface IQuestionItemProps {
  questionItem: IQuestionItemState;
  index: number;
  onSelectAnswer: (value: string, index: number) => void;
  isShowResult?: boolean;
}

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
};

const QuestionItem = (props: IQuestionItemProps) => {
  const answerList = useMemo<string[]>(() => {
    const answerList = [
      ...props.questionItem.incorrect_answers,
      props.questionItem.correct_answer,
    ];
    shuffleArray(answerList);

    return answerList;
  }, [props.questionItem.incorrect_answers, props.questionItem.correct_answer]);

  const onClickAnswer = (value: string) => {
    props.onSelectAnswer(value, props.index);
  };

  const getStatusAnswer = (value: string): IAnswerProps["type"] => {
    const { correct_answer, selected_answer } = props.questionItem;
    if (props.isShowResult) {
      if (value === selected_answer) {
        if (value === correct_answer) {
          return "correct";
        }

        return "incorrect";
      }

      return undefined;
    }

    if (value === selected_answer) {
      return "selected";
    }

    return undefined;
  };

  return (
    <div style={{ maxWidth: 700, marginBottom: 16 }}>
      <Title level={3}>
        <span
          dangerouslySetInnerHTML={{ __html: props.questionItem.question }}
        />
      </Title>
      <Space wrap>
        {answerList.map((item) => (
          <Answer
            value={item}
            key={item}
            onClick={onClickAnswer}
            type={getStatusAnswer(item)}
            disable={props.isShowResult}
          />
        ))}
      </Space>
    </div>
  );
};

export default memo(QuestionItem);
