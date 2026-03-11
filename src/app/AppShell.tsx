import { type PropsWithChildren, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toolsRegistry } from "@/core/tools/registry";

const plannedTools = ["Base64", "URL Encode/Decode", "JWT Decode", "Cron Helper", "Regex Tester"];

export function AppShell({ children }: PropsWithChildren) {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return toolsRegistry;
    }

    return toolsRegistry.filter((tool) => {
      const base = `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
      return base.includes(normalized) || tool.keywords.some((item) => item.includes(normalized));
    });
  }, [query]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Dev Matsuri</div>
        <p className="brand-subtitle">Privacy-first toolbox for development workflows.</p>

        <label className="search">
          <span>Find tool</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or keyword"
            type="search"
          />
        </label>

        <p className="section-title">Available</p>
        <nav className="tool-nav">
          {filteredTools.map((tool) => {
            const active = location.pathname === tool.path;

            return (
              <Link key={tool.id} className={active ? "tool-link active" : "tool-link"} to={tool.path}>
                <strong>{tool.name}</strong>
                <span>{tool.category}</span>
              </Link>
            );
          })}
        </nav>

        <p className="section-title">Coming soon</p>
        <div className="coming-soon">
          {plannedTools.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
