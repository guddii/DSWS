import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export const ControlsHelp = () => {
  return (
    <Button
      type="text"
      href={"https://github.com/guddii/showcase-solid-egovernance/issues"}
      target={"_blank"}
      icon={<QuestionCircleOutlined rev={"QuestionCircleOutlined"} />}
    />
  );
};
