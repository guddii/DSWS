import { Layout } from "antd";

interface ILayoutContentProperties {
  children: React.ReactNode;
}

export function LayoutContent({ children }: ILayoutContentProperties) {
  return (
    <Layout.Content style={{ margin: "32px 16px 16px 16px" }}>
      {children}
    </Layout.Content>
  );
}
