"use client";
import { Space, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CSSProperties, useEffect, useState } from "react";

const Spinner = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="4" width="6" height="14" opacity="1">
        <animate
          id="spinner_rQ7m"
          begin="0;spinner_2dMV.end-0.25s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </rect>
      <rect x="9" y="4" width="6" height="14" opacity=".4">
        <animate
          begin="spinner_rQ7m.begin+0.15s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </rect>
      <rect x="17" y="4" width="6" height="14" opacity=".3">
        <animate
          id="spinner_2dMV"
          begin="spinner_rQ7m.begin+0.3s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </rect>
    </svg>
  );
};

export const Initializing = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(false);
  }, []);

  return (
    <div
      hidden={!hidden}
      style={{
        display: "block",
        paddingLeft: 20,
        paddingTop: 25,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        fontSize: 14,
        height: "100%",
        backgroundColor: "#f5f5f5",
        color: "rgba(0, 0, 0, 0.88)",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
        textAlign: "center",
      }}
    >
      <Loading />
    </div>
  );
};

export const LoadingFullbleed = () => {
  return (
    <Space
      align="center"
      direction="vertical"
      size="middle"
      style={{ width: "100%", marginTop: 50 }}
    >
      <Loading />
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

export const Loading = () => {
  return (
    <Space>
      <Spinner />
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
