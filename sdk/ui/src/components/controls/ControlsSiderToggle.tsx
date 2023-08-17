import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useLayout } from "../../contexts/LayoutContext";

export const ControlsSiderToggle = () => {
  const { lockedSider, collapsedSider, setCollapsedSider } = useLayout();

  if (lockedSider) {
    return null;
  }

  return (
    <Button
      disabled={lockedSider}
      type="text"
      icon={
        collapsedSider ? (
          <MenuUnfoldOutlined rev={"MenuUnfoldOutlined"} />
        ) : (
          <MenuFoldOutlined rev={"MenuFoldOutlined"} />
        )
      }
      onClick={() => setCollapsedSider(!collapsedSider)}
      style={{
        fontSize: "16px",
        width: 64,
        height: 64,
      }}
    />
  );
};
