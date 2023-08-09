import { Col, Layout, Row, Space, Typography } from "antd";
import { ControlsSession } from "../controls/ControlsSession";
import { Metadata } from "next";
import { INavigation } from "../../interfaces/INavigation";
import { NavigationMenu } from "../NavigationMenu";

interface ILayoutMastheadProperties {
  metadata: Metadata;
  navigation?: INavigation;
}

export function LayoutMasthead({
  metadata,
  navigation,
}: ILayoutMastheadProperties) {
  return (
    <Layout.Header style={{ background: "transparent", padding: "0 16px" }}>
      <Row>
        <Col span={6}>
          <div style={{ width: "100%", textOverflow: "ellipsis" }}>
            Solid Showcase
            <Typography.Title style={{ marginTop: "-16px" }}>
              <Space>
                <img src={"/icon"} alt="App brand" width={55} height={55} />
                <div style={{ width: 430 }}> {String(metadata.title)} </div>
              </Space>
            </Typography.Title>
          </div>
        </Col>
        <Col span={18} style={{ textAlign: "right" }}>
          <Space>
            {navigation && <NavigationMenu navigation={navigation} />}
            <ControlsSession />
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
}
