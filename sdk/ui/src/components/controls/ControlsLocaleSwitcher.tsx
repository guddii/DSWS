"use client";
import { i18n, Locale, useLocaleFromPath } from "i18n/client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, Dropdown, MenuProps } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { ButtonProps } from "antd/es/button/button";

export const ControlsLocaleSwitcher = () => {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocaleFromPath();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const items = i18n.locales.map((locale, index) => {
    return {
      key: index,
      label: locale,
    };
  });

  const getItem = (event: any) => {
    return items[event.key as unknown as number];
  };

  const handleMenuClick: MenuProps["onClick"] = (event) => {
    const locale = getItem(event).label;
    router.push(redirectedPathName(locale));
  };

  const menuProps = {
    items: items.filter((item) => item.label !== currentLocale),
    onClick: handleMenuClick,
  };

  if (menuProps.items.length >= 2) {
    return (
      <Dropdown menu={menuProps}>
        <Button type={"text"} icon={<SwapOutlined rev={"SwapOutlined"} />} />
      </Dropdown>
    );
  }

  const onClick: ButtonProps["onClick"] = (event) => {
    const locale = items.filter((item) => item.label !== currentLocale)[0]
      .label;
    router.push(redirectedPathName(locale));
  };

  return (
    <Button
      onClick={onClick}
      type={"text"}
      icon={<SwapOutlined rev={"SwapOutlined"} />}
    />
  );
};
