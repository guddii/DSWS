import { Menu, MenuProps } from "antd";
import { INavigation } from "../../interfaces/INavigation";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FormOutlined, InboxOutlined } from "@ant-design/icons";
import { useTranslation } from "i18n/client";

interface INavigationMenuProperties {
  navigation: INavigation;
}

export function MenuContext({ navigation }: INavigationMenuProperties) {
  const t = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState(pathname);

  const onClick: MenuProps["onClick"] = (menuInfo) => {
    setSelectedKey(menuInfo.key);
    router.push(menuInfo.key);
  };

  const items = [];

  if (navigation.contextActions) {
    items.push({
      key: "actionsGroup",
      label: t("_.actions"),
      type: "group",
      children: navigation.contextActions.map((child) => {
        if (child.key.includes("inbox")) {
          return {
            ...child,
            icon: <InboxOutlined rev={"InboxOutlined"} />,
          };
        }
        return child;
      }),
    });
  }

  if (navigation.contextNavigation) {
    items.push({
      key: "navigationGroup",
      label: t("_.navigation"),
      type: "group",
      children: navigation.contextNavigation.map((child) => {
        if (child.key.includes("forms")) {
          return {
            ...child,
            icon: <FormOutlined rev={"FormOutlined"} />,
          };
        }
        return child;
      }),
    });
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[selectedKey]}
      mode="inline"
      items={items}
      style={{
        background: "transparent",
        height: "100%",
        borderInlineEnd: "none",
        padding: 8,
      }}
    />
  );
}
