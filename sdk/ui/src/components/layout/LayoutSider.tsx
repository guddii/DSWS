import { Layout } from "antd";
import { INavigation } from "../../interfaces/INavigation";
import { MenuContext } from "../menu/MenuContext";
import { useLayout } from "../../contexts/LayoutContext";

interface ILayoutSiderProperties {
  navigation?: INavigation;
}

export const LayoutSider = ({ navigation }: ILayoutSiderProperties) => {
  const { collapsedSider } = useLayout();

  if (!navigation) {
    return null;
  }

  return (
    <Layout.Sider
      collapsedWidth={0}
      collapsible
      collapsed={collapsedSider}
      trigger={null}
      width={265}
      style={{
        background: "transparent",
        borderRight: "1px solid rgba(0, 0, 0, 0.10)",
      }}
    >
      <MenuContext navigation={navigation} />
    </Layout.Sider>
  );
};
