import React, { ReactNode } from "react";

export const assignPropsToChildren = <T extends Record<string, any>>(
  children: ReactNode,
  props: T
) => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, props);
    }
    return child;
  });
};
