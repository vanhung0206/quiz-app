import { Spin } from "antd";
import React from "react";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

interface ILoadingProps {
  fullscreen?: boolean;
}

const Loading = ({ fullscreen }: ILoadingProps) => (
  <Spin fullscreen={fullscreen} tip="Loading..." size="large">
    {content}
  </Spin>
);

export default Loading;
