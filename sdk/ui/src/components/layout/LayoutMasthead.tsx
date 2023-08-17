import { Col, Layout, Row, Space } from "antd";
import { ControlsSession } from "../controls/ControlsSession";
import { IUserMenu } from "../../interfaces/IUserMenu";
import { Brand } from "../brand/Brand";
import { Metadata } from "next";
import { ControlsSiderToggle } from "../controls/ControlsSiderToggle";

interface ILayoutMastheadProperties {
  userMenu?: IUserMenu;
  metadata: Metadata;
}

export function LayoutMasthead({
  userMenu,
  metadata,
}: ILayoutMastheadProperties) {
  return (
    <Layout.Header
      style={{
        background: "transparent",
        borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
        paddingInlineEnd: 16,
        paddingInlineStart: 0,
      }}
    >
      <Row>
        <Col span={16}>
          <Space>
            <ControlsSiderToggle />
            <span style={{ height: 64, padding: 16 }}>
              <Brand metadata={metadata} />
            </span>
          </Space>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <ControlsSession userMenu={userMenu} />
        </Col>
      </Row>
    </Layout.Header>
  );
}
