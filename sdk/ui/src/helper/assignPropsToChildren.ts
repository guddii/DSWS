import React, { ReactNode } from "react";

/**
 * Assigns props to children by cloning all child elements and passing the props.
 * @param children
 * @param props
 * @returns cloned children with new props
 */
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
