"use client";
import React, { ReactNode } from "react";
import {
  Breadcrumb,
  Col,
  Layout,
  Row,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { Metadata } from "next";
interface ItemType {
  title: string;
}
interface ILayoutContentOptions {
  breadcrumbItems: ItemType[];
  currentItem: ItemType;
  metadata: Metadata;
}
interface ILayoutContentProperties {
  children: ReactNode;
  extra?: ReactNode;
  options: ILayoutContentOptions;
}

export const LayoutContent = ({
  children,
  options,
  extra,
}: ILayoutContentProperties) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Viewer`,
      children: children,
    },
  ];

  return (
    <Layout.Content
      style={{
        padding: "0 16px",
        minWidth: 300,
      }}
    >
      <Row style={{ paddingTop: 16 }}>
        <Col span={12}>
          <Breadcrumb
            style={{ marginBottom: 8 }}
            items={options.breadcrumbItems}
          />
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          {extra}
        </Col>
      </Row>
      <Row style={{ paddingBottom: 16 }}>
        <Col span={24}>
          <Typography.Title>{options.currentItem.title}</Typography.Title>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
    </Layout.Content>
  );
};
