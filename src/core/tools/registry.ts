import type { ToolDefinition } from "@/core/tools/types";
import { TimestampTool } from "@/tools/timestamp/TimestampTool";

export const toolsRegistry: ToolDefinition[] = [
  {
    id: "timestamp-range",
    name: "Timestamp",
    description: "Generate Unix timestamp ranges for logs, scripts, and debugging windows.",
    category: "Date & Time",
    path: "/timestamp",
    keywords: ["unix", "timestamp", "datetime", "epoch", "range"],
    component: TimestampTool
  }
];
