# Dev Matsuri

Privacy-first developer toolbox inspired by Omatsuri, with a similar UX style and its own branding.

Current tools:
- Timestamp Range (Unix seconds)

## Features

- Browser-only: no backend required
- Offline-ready PWA
- GitHub Pages deployment via Actions
- Modular tool architecture (easy to add new tools)

## Tech Stack

- React
- Vite
- TypeScript
- React Router
- Vitest
- vite-plugin-pwa

## Local Development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```

Build production bundle:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
  app/                  # App shell and routing
  core/tools/           # Tool contract and registry
  tools/timestamp/      # Timestamp tool UI + logic + tests
  styles/               # Global styles and design tokens
public/                 # PWA assets (icons, favicon)
.github/workflows/      # CI/CD workflows (Pages deploy)
```

## GitHub Pages Deployment

Deployment is automated with GitHub Actions (`.github/workflows/deploy.yml`).

1. Push to `main`
2. In GitHub repo settings, open `Pages`
3. Set source to `GitHub Actions`

The workflow builds the app and publishes `dist`.

### Base Path Handling

`vite.config.ts` auto-detects `GITHUB_REPOSITORY` and sets `base` correctly for:
- user/org pages (`https://<user>.github.io/`) -> `/`
- project pages (`https://<user>.github.io/<repo>/`) -> `/<repo>/`

## Adding a New Tool

1. Create a module under `src/tools/<tool-name>/`
2. Export its React component
3. Register it in `src/core/tools/registry.ts`

Once registered, it appears in the sidebar and gets a route automatically.
