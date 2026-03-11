import type { ComponentType } from "react";

export type ToolDefinition = {
  id: string;
  name: string;
  description: string;
  category: string;
  path: string;
  keywords: string[];
  component: ComponentType;
};
