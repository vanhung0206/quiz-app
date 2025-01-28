import { Space, Typography } from "antd";
import { IQuestionItemState } from "../types";
import Answer, { IAnswerProps } from "./Answer";
import { memo, useMemo } from "react";

const { Title } = Typography;

interface IQuestionItemProps {
  questionItem: IQuestionItemState;
  index: number;
  onSelectAnswer: (value: string, index: number) => void;
  isShowResult?: boolean;
}

const checkAnswer = (value: string, corrected_answer: string[]): boolean => {
  const answerKey = value.split(".")[0].trim();
  return corrected_answer?.includes(answerKey);
};

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
    const answerList = [...props.questionItem.answers];
    shuffleArray(answerList);

    return answerList;
  }, [props.questionItem.answers]);

  const onClickAnswer = (value: string) => {
    props.onSelectAnswer(value, props.index);
  };

  const getStatusAnswer = (value: string): IAnswerProps["type"] => {
    const { corrected_answer, selected_answer } = props.questionItem;
    if (props.isShowResult) {
      if (value === selected_answer) {
        if (checkAnswer(value, corrected_answer)) {
          return "answer";
        }

        return "incorrect";
      }

      if (checkAnswer(value, corrected_answer)) {
        return "correct";
      }

      return undefined;
    }

    if (value === selected_answer) {
      return "selected";
    }

    return undefined;
  };

  return (
    <div style={{ maxWidth: 1200, marginBottom: 16 }}>
      <Title level={3}>
        <h4>Question Number: {props.questionItem.question_number}</h4>
        <span
          style={{ color: "#fff", fontSize: 16 }}
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
      {props.isShowResult && (
        <div>
          <h4 style={{ marginTop: 16, fontSize: 16 }}>
            Created At: {props.questionItem.created_at}
          </h4>
          {/* <h4>
            Created At: {props.questionItem.created_at}
          </h4> */}
        </div>
      )}
    </div>
  );
};

export default memo(QuestionItem);
