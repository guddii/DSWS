import React from "react";
import { Col, Layout, Row, Space, Typography } from "antd";
import { SessionProvider } from "solid";
import { ControlsSession } from "./controls/ControlsSession";
import Image from "next/image";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const SolidApp: React.FC<any> = ({ children, metadata }) => {
  return (
    <SessionProvider
      sessionId="session-provider-example"
      onError={console.error}
      restorePreviousSession={false}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Header style={{ background: "transparent", padding: "0 16px" }}>
            <Row>
              <Col span={6}>
                <div style={{ width: "100%", textOverflow: "ellipsis" }}>
                  Solid Showcase
                  <Title style={{ marginTop: "-16px" }}>
                    <Space>
                      <img
                        src={"/icon"}
                        alt="App brand"
                        width={55}
                        height={55}
                      />
                      <>{metadata?.title}</>
                    </Space>
                  </Title>
                </div>
              </Col>
              <Col span={18} style={{ textAlign: "right" }}>
                <ControlsSession />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "32px 16px 16px 16px" }}>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </SessionProvider>
  );
};
