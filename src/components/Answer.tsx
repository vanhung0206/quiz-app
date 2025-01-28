import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import React from "react";

export interface IAnswerProps {
  value: string;
  onClick: (value: string) => void;
  type?: "selected" | "correct" | "incorrect" | "answer";
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

      if (props.type === "answer") {
        return "orange";
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
    fontSize: 14,
    whiteSpace: "wrap",
    height: "unset",
    textAlign: "left",
  };

  return (
    <Button
      type={getButtonType()}
      danger={props.type === "incorrect"}
      onClick={onClickButton}
      style={buttonStyle}
      block
    >
      <span
        style={{ display: "block" }}
        dangerouslySetInnerHTML={{ __html: props.value }}
      />
    </Button>
  );
};

export default Answer;
