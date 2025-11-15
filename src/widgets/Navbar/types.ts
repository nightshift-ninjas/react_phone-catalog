import type React from "react";
import type { JSX } from "react";

export type NavbarLink = {
  label: string;
  path: string;
};

export type NavButton = {
  icon?: JSX.Element;
  path?: string;
  component?: React.ComponentType;
};
