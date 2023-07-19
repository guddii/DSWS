import { Layout } from "antd";

export function LayoutFooter() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      ©{new Date().getFullYear()}
    </Layout.Footer>
  );
}
