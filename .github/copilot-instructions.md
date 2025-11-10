## Purpose

Short, focused instructions to help an AI coding agent be productive in this repository.

## Big picture

- This repo is a small frontend app built with Vite + React + TypeScript located in `frontend/`.
- There is no backend in the workspace; all runnable code is under `frontend/` (entry: `src/main.tsx`, UI: `src/App.tsx`).
- The project uses Vite for dev server / build and TypeScript project references (`tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.json`).

## How to run (developer flows)

- Start local dev server: run `npm run dev` from `frontend/` (this runs `vite` and enables HMR). See `frontend/package.json` -> `scripts.dev`.
- Build for production: `npm run build` from `frontend/` (runs `tsc -b` then `vite build`).
- Preview production build: `npm run preview` from `frontend/`.
- Linting: `npm run lint` from `frontend/` (calls `eslint .`).

Notes: commands live in `frontend/package.json`. Work inside `frontend/` as the project is a standalone Vite app.

## Key files and what they show

- `frontend/package.json` — scripts and main deps (vite, react). Use this as the authoritative source for dev/build commands.
- `frontend/src/main.tsx` — React entry, mounts `<App />` to `#root`.
- `frontend/src/App.tsx` — primary example component and HMR-friendly code; good reference for React/TSX style in this project.
- `frontend/index.html` — Vite HTML entry (static assets like `/vite.svg` are referenced here).
- `frontend/src/assets/` and `frontend/public/` — static images and public assets. Note the use of absolute `/vite.svg` vs imported assets.
- `frontend/tsconfig.*.json` — TypeScript config and project reference points. When adding type-checked ESLint rules, these files are referenced by ESLint configs.
- `frontend/eslint.config.js` — project linting rules and patterns (follow existing conventions when adding rules or fixes).

## Project-specific patterns & conventions

- Keep changes inside `frontend/` unless adding a new top-level tool or CI config.
- Use the package.json scripts rather than invoking vite/tsc directly to respect the configured flags.
- Prefer imports for local assets (e.g. `import logo from './assets/logo.svg'`) when the file lives under `src/`. Use `/vite.svg` style only for `public/` assets served at root.
- Minimal component pattern: small functional components with local state (see `App.tsx` for examples). Follow TypeScript types already present in `src/` files.

## Integration points & external deps

- External runtime libs: `react`, `react-dom`. Dev tools: `vite`, `typescript`, `eslint`, `@vitejs/plugin-react`.
- There are no CI workflows in this repo yet; if you add CI, prefer running `npm ci` then the `frontend` scripts above.

## When modifying the repository

- If you add new packages, update `frontend/package.json` and remember to run `npm install` before testing locally.
- If you modify TypeScript config or add type-aware ESLint rules, update `frontend/tsconfig.*.json` and `eslint.config.js` together.
- Keep HMR-friendly code in components (avoid long-running side-effects at module level).

## Examples (use these as patterns)

- To start dev server: open a shell at `frontend/` and run `npm run dev` — this is the canonical developer workflow.
- To add a component: create `frontend/src/components/<Name>.tsx`, export a small typed function component, and import it from `App.tsx` for local verification with HMR.

## Quick troubleshooting

- If HMR doesn't reflect a change, ensure the dev server is running (`npm run dev`) and that edits are inside `frontend/src/`.
- If builds fail with type errors, run `npx tsc -b frontend/tsconfig.app.json` to see full TypeScript diagnostics.

## If you need more context

- Read `frontend/README.md` and the root `README.md` for repository intent. Inspect `frontend/package.json`, `frontend/src/main.tsx`, and `frontend/src/App.tsx` for the canonical patterns.

---
If any section is unclear or you want more examples (e.g. testing, CI, or adding a backend), tell me which area to expand.
