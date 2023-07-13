import { Space } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

interface ILoadingProperties {
  style?: CSSProperties;
}

export const Loading = ({ style }: ILoadingProperties) => {
  return (
    <Space>
      <LoadingOutlined rev={"loading"} style={style} />
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
