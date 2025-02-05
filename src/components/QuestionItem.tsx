import { Space, Typography } from "antd";
import { memo } from "react";
import { IQuestionItemState } from "../types";
import { checkIsInCorrectedAnwser } from "../utils";
import Answer, { IAnswerProps } from "./Answer";

const { Title } = Typography;

interface IQuestionItemProps {
  questionItem: IQuestionItemState;
  index: number;
  onSelectAnswer: (value: string, index: number) => void;
  isShowResult?: boolean;
}

const QuestionItem = (props: IQuestionItemProps) => {
  const answerList = props.questionItem.answers;

  const onClickAnswer = (value: string) => {
    props.onSelectAnswer(value, props.index);
  };

  const getStatusAnswer = (value: string): IAnswerProps["type"] => {
    const { corrected_answer, selected_answers } = props.questionItem;
    if (props.isShowResult) {
      if (selected_answers?.includes(value)) {
        if (checkIsInCorrectedAnwser(value, corrected_answer)) {
          return "answer";
        }

        return "incorrect";
      }

      if (checkIsInCorrectedAnwser(value, corrected_answer)) {
        return "correct";
      }

      return undefined;
    }

    if (selected_answers?.includes(value)) {
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
