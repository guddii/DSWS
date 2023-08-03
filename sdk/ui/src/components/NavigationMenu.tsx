import { Button, Divider, Space } from "antd";
import { INavigation } from "../interfaces/INavigation";
import { usePathname, useRouter } from "next/navigation";

interface INavigationMenuProperties {
  navigation: INavigation;
}

export function NavigationMenu({ navigation }: INavigationMenuProperties) {
  const pathname = usePathname();
  const router = useRouter();
  const active = navigation.routes.find(
    (navigationMenuEntry) => navigationMenuEntry.key === pathname
  );

  const isActive = (key: string) => {
    return active?.key === key;
  };

  const onClick = (key: string) => {
    router.push(key);
  };

  const buttons = navigation.routes.map((navigation) => (
    <Button
      type={isActive(navigation.key) ? "link" : "text"}
      onClick={() => onClick(navigation.key)}
      key={navigation.key}
    >
      {navigation.label}
    </Button>
  ));

  return (
    <Space>
      {buttons}
      <Divider type="vertical" />
    </Space>
  );
}
