import type { CountdownProps } from "antd";
import { Button, Modal, notification, Statistic, Typography } from "antd";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import QuestionList from "../components/QuestionList";
import QuizMakerForm from "../components/QuizMakerForm";
import { useGlobalStore } from "../store";

import "./CreateQuiz.style.css";

const { Title } = Typography;
const { Countdown } = Statistic;

const CreateQuiz = () => {
  const questionListStatus = useGlobalStore(
    (state) => state.questionListStatus
  );

  const config = useGlobalStore((state) => state.config);

  const resetStore = useGlobalStore((state) => state.resetStore);

  const navigate = useNavigate();

  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
    notification.info({
      message: "Time out",
    });
    navigate("/result");
  };

  const onClickSubmit = () => {
    Modal.confirm({
      title: "Are you sure you want to submit your exam?",
      content:
        "You won’t be able to review or change your answers after submission.",
      okText: "Submit",
      okType: "primary",
      cancelText: "Cancel",
      onOk() {
        navigate("/result");
      },
    });
  };

  useLayoutEffect(() => {
    resetStore();
  }, [resetStore]);

  const renderQuestionList = () => {
    switch (questionListStatus) {
      case "None": {
        return null;
      }
      case "Loading": {
        return <Loading />;
      }
      case "Loaded": {
        return <QuestionList />;
      }
    }
  };

  return (
    <>
      <Title level={2}>AWS Certified Developer - Associate DVA-C02</Title>
      <QuizMakerForm />
      {questionListStatus === "Loaded" && (
        <div className="question">
          <div className="question__render">{renderQuestionList()}</div>
          <div className="question__timer">
            <div className="question__countdown">
              <Countdown
                title="Time"
                style={{ color: "#fff" }}
                value={Date.now() + 1000 * 60 * config.totalTime}
                onFinish={onFinish}
              />
              <Button
                onClick={onClickSubmit}
                style={{ marginTop: 20 }}
                size="large"
                block
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
