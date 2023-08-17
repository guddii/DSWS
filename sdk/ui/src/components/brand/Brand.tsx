import { Metadata } from "next";
import { Space } from "antd";

interface IBrandProperties {
  metadata: Metadata;
}

export const Brand = ({ metadata }: IBrandProperties) => {
  return (
    <Space>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={"/icon"} alt="App brand" width={32} height={32} />
      <span>
        <strong
          style={{
            fontSize: 21,
            whiteSpace: "nowrap",
          }}
        >
          {String(metadata.title)}
        </strong>
        <br />
        <span
          style={{
            fontSize: 24,
            color: "rgba(0, 0, 0, 0.25)",
            textTransform: "lowercase",
          }}
        ></span>
      </span>
    </Space>
  );
};
