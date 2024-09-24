import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import React from "react";

export interface IAnswerProps {
  value: string;
  onClick: (value: string) => void;
  type?: "selected" | "correct" | "incorrect";
  disable?: boolean;
}

const Answer = (props: IAnswerProps) => {
  const getButtonType = (): BaseButtonProps["type"] => {
    if (
      props.type === "selected" ||
      props.type === "correct" ||
      props.type === "incorrect"
    ) {
      return "primary";
    }
    return "default";
  };

  const getButtonBackgroundColor =
    (): React.CSSProperties["backgroundColor"] => {
      if (props.type === "correct") {
        return "green";
      }

      if (props.type === "incorrect") {
        return "red";
      }

      return undefined;
    };

  const onClickButton = () => {
    if (props.disable) {
      return;
    }

    props.onClick(props.value);
  };

  const buttonStyle: React.CSSProperties = {
    pointerEvents: props.disable ? "none" : undefined,
    backgroundColor: getButtonBackgroundColor(),
  };

  return (
    <Button
      type={getButtonType()}
      danger={props.type === "incorrect"}
      onClick={onClickButton}
      style={buttonStyle}
    >
      <span dangerouslySetInnerHTML={{ __html: props.value }} />
    </Button>
  );
};

export default Answer;
