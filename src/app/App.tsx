import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/app/AppShell";
import { toolsRegistry } from "@/core/tools/registry";

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to={toolsRegistry[0].path} replace />} />
        {toolsRegistry.map((tool) => (
          <Route key={tool.id} path={tool.path} element={<tool.component />} />
        ))}
      </Routes>
    </AppShell>
  );
}
