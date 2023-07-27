import { Menu } from "antd";
import { INavigation } from "../interfaces/INavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavigationMenuProperties {
  navigation: INavigation;
}

export function NavigationMenu({ navigation }: INavigationMenuProperties) {
  const pathname = usePathname();
  const active = navigation.routes.find(
    (navigationMenuEntry) => navigationMenuEntry.key === pathname
  );

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={active ? [active.key] : undefined}
      items={navigation.routes.map(({ key, label }) => {
        return {
          key,
          label: <Link href={key}>{label}</Link>,
        };
      })}
      style={{
        background: "transparent",
        border: "none",
        lineHeight: "46px",
      }}
    />
  );
}
