# Agent guidance for unique-homes

This document tells AI agents how to work in this repository.

---

## Context7 code-writing subagent

**Use Context7 for all code.** A dedicated rule (`.cursor/rules/context7-for-code.mdc`) enforces this:

- When **writing, generating, or refactoring any code**, always use Context7 so responses follow **current library documentation** (React, Vite, Tailwind, TypeScript, etc.).
- Treat every code-related request as if the user said “use context7”—do not rely on memory or generic examples when Context7 can provide up-to-date docs.
- Context7 is configured in `.cursor/mcp.json`. This “code-writing subagent” behavior is **always on** for code in this project.

---

## What this project is

**unique-homes** is a **Lovable app** (Vite + React + TypeScript + Tailwind) at the **repo root**. The product is the app itself.

**`docs/`** holds project context for AI: **`docs/PROJECT.md`** describes the app (Unique Homes Lajares), stack, src layout, Supabase, and conventions. Use it when you need to understand or change this codebase.

---

## Repository layout

| Location | Role |
|----------|------|
| **Root** | Lovable app: `src/`, `index.html`, `vite.config.ts`, `package.json`, `tsconfig*.json`, Tailwind/ESLint/PostCSS configs, etc. |
| **`docs/`** | Project context for AI (see `docs/PROJECT.md`). |
| **`AGENTS.md`** (this file) | Agent instructions; applies to the whole repo. |

### Root (the app)

- **`src/`** – React app code (components, styles, entry).
- **`package.json`** – App deps and scripts: `npm run dev`, `npm run build`, `npm run lint`, etc.
- **`tsconfig.json`**, **`tsconfig.app.json`**, **`tsconfig.node.json`** – TypeScript for the app and build tooling.
- **`vite.config.ts`**, **`tailwind.config.ts`**, **`postcss.config.js`**, **`eslint.config.js`** – Build and tooling config.
- **`index.html`**, **`components.json`** – Entry HTML and (e.g. shadcn) component config.

### `docs/` (project context for AI)

| File | Role |
|------|------|
| **`docs/PROJECT.md`** | App overview for AI: what it is (Unique Homes Lajares), stack, src layout, Supabase, i18n, conventions. |
| **`docs/README.md`** | Points to PROJECT.md. |

---

## How to work in this repo

1. **Default scope is the app**
   - Edit, add, or refactor code under **root** and **`src/`**.
   - Use app tooling: `npm run dev`, `npm run build`, `npm run lint` from root.

2. **When you need project context**
   - Read **`docs/PROJECT.md`** for app purpose, stack, src layout, Supabase, i18n, and conventions.

3. **When editing files in `docs/`**
   - Keep **`docs/PROJECT.md`** accurate as the app (routes, folders, backend) changes.

4. **App vs setup**
   - Do **not** treat `docs/` as part of the app’s build or runtime.
   - The app is what runs when you `npm run dev` or `npm run build` from the repo root.

---

## Commits

**Use [gitmoji](https://gitmoji.dev) for all commit messages.** Start every message with an emoji, then a short description.

Examples:
- `:tada: Initial commit: Unique Homes Lajares marketing site`
- `:bug: Fix Deno types in Supabase Edge Function`
- `:memo: Update README and move Lovable docs to docs/lovable.md`
- `:sparkles: Add villa editorialIntro and triptych to i18n types`

When suggesting or writing commit messages, always pick the appropriate gitmoji (e.g. `:tada:` init, `:sparkles:` feat, `:bug:` fix, `:memo:` docs, `:lipstick:` style, `:recycle:` refactor, `:construction_worker:` CI/build).

---

## Commands (run from repo root)

- **`npm run dev`** – Start dev server  
- **`npm run build`** – Type-check and build  
- **`npm run lint`** – ESLint  
- **`npm run preview`** – Preview production build  


---

## Summary

- **Root = Lovable app.** Work and run the app from here.
- **`docs/PROJECT.md`** = project context for AI. Use it to understand and change this codebase.
