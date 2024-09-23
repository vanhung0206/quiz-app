import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

export interface IAnswerProps {
  value: string;
  onClick: (value: string) => void;
  type?: "selected" | "correct" | "incorrect";
  disable?: boolean;
}

const Answer = (props: IAnswerProps) => {
  const getTypeButton = (): BaseButtonProps["type"] => {
    if (
      props.type === "selected" ||
      props.type === "correct" ||
      props.type === "incorrect"
    ) {
      return "primary";
    }
    return "default";
  };

  const onClickButton = () => {
    if (props.disable) {
      return;
    }

    props.onClick(props.value);
  };

  return (
    <Button
      type={getTypeButton()}
      danger={props.type === "incorrect"}
      onClick={onClickButton}
      style={
        props.disable
          ? {
              pointerEvents: "none",
            }
          : undefined
      }
    >
      <span dangerouslySetInnerHTML={{ __html: props.value }} />
    </Button>
  );
};

export default Answer;
