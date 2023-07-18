import { Space, Typography } from "antd";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { CSSProperties } from "react";

export const LoadingFullbleed = () => {
  return (
    <Space
      align="center"
      direction="vertical"
      size="middle"
      style={{ width: "100%", marginTop: 50 }}
    >
      <Loading style={{ fontSize: 30 }} />
      <Typography>Validating Data...</Typography>
    </Space>
  );
};

export const LoadingFailedFullbleed = () => {
  return (
    <Space
      align="center"
      direction="vertical"
      size="middle"
      style={{ width: "100%", marginTop: 50 }}
    >
      <LoadingFailed style={{ fontSize: 30 }} />
      <Typography>Error</Typography>
    </Space>
  );
};

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

interface ILoadingFailedProperties {
  style?: CSSProperties;
}

export const LoadingFailed = ({ style }: ILoadingFailedProperties) => {
  return (
    <Space>
      <ExclamationCircleOutlined rev={"loadingFailed"} style={style} />
    </Space>
  );
};
