import { ReactNode } from "react";

export type BuilderMode = "flow" | "chat";

export interface LayoutProps {
  children: ReactNode;
  mode: BuilderMode;
}
