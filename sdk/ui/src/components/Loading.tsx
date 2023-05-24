import { Space } from "antd";
import React from "react";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export const Loading = () => {
  return (
    <Space>
      <LoadingOutlined rev={"loading"} />
    </Space>
  );
};

export const LoadingFailed = () => {
  return (
    <Space>
      <ExclamationCircleOutlined rev={"loadingFailed"} />
    </Space>
  );
};
