import React from "react";
import { Col, Layout, Row } from "antd";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { SolidSession } from "./SolidSession";

const { Header, Content, Footer } = Layout;

export const SolidApp: React.FC<any> = ({ children }) => {
  return (
    <SessionProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout className="site-layout">
          <Header style={{ background: "transparent", padding: "0 16px" }}>
            <Row>
              <Col span={6}>
                <div style={{ width: "100%", textOverflow: "ellipsis" }}>
                  Solid Showcase
                </div>
              </Col>
              <Col span={18} style={{ textAlign: "right" }}>
                <SolidSession />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "0 16px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>
            ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </SessionProvider>
  );
};
