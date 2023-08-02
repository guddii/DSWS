import { Col, Layout, Row, Space, Typography } from "antd";
import { ControlsSession } from "../controls/ControlsSession";
import { Metadata } from "next";

interface ILayoutMastheadProperties {
  metadata: Metadata;
}

export function LayoutMasthead({ metadata }: ILayoutMastheadProperties) {
  return (
    <Layout.Header style={{ background: "transparent", padding: "0 16px" }}>
      <Row>
        <Col span={6}>
          <div style={{ width: "100%", textOverflow: "ellipsis" }}>
            Solid Showcase
            <Typography.Title style={{ marginTop: "-16px" }}>
              <Space>
                <img src={"/icon"} alt="App brand" width={55} height={55} />
                <div style={{ width: 320 }}> {String(metadata.title)} </div>
              </Space>
            </Typography.Title>
          </div>
        </Col>
        <Col span={18} style={{ textAlign: "right" }}>
          <ControlsSession />
        </Col>
      </Row>
    </Layout.Header>
  );
}
