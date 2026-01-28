# Agent guidance for unique-homes

This document tells AI agents how to work in this repository.

**How to use this doc:** Read it at the start of every chat. Sections: **Context7 / Tester** (code and test conventions) → **Subagents** (who owns what) → **Project skills** (step-by-step procedures) → **Workflow rules** (safety, commits, docs) → **What this project is** → **Repository layout** → **How to work** → **Commands** → **Summary**.

---

## Context7 code-writing subagent

**Use Context7 for all code.** A dedicated **code-writing subagent** writes code only using Context7 and senior-architect conventions. Relevant rules:

- **`code-writing-subagent.mdc`** — Defines the code-writing subagent: when writing code, use **only** (1) Context7 and (2) senior-architect conventions. Always on for code output.
- **`context7-for-code.mdc`** — Use Context7 for current docs/APIs (React, Vite, Tailwind, TypeScript, etc.); treat every code-related request as “use context7.”
- **`senior-architect-context7.mdc`** — Approach code as senior architect (structure, boundaries, testability) using Context7 knowledge.

Context7 is configured in `.cursor/mcp.json`. When writing code, the subagent follows these rules and does not deviate from them.

---

## Tester subagent

A dedicated **tester subagent** designs, writes, and reviews tests as a **senior tester** using Context7 testing practices and project test guidance. Relevant rule:

- **`tester-subagent.mdc`** — When designing, writing, or reviewing tests: (1) Use Context7 for Vitest, React Testing Library, user-event, jsdom, and current best practices. (2) Apply senior-tester approach (behavior over implementation, right test level, testability, maintainability). (3) Use **`docs/TEST-SUGGESTIONS.md`** for what to test and priorities in this repo.

The tester subagent uses Context7 and `docs/TEST-SUGGESTIONS.md` and does not deviate from them when producing or evaluating tests.

---

## Subagents (all)

When working in the relevant area, act as the subagent that owns it. All subagent rules live in `.cursor/rules/` and apply as stated in each file.

| Subagent             | Rule                            | When to use                                                                                 |
| -------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- |
| **Code-writing**     | `code-writing-subagent.mdc`     | Writing or refactoring application code.                                                    |
| **Tester**           | `tester-subagent.mdc`           | Designing, writing, or reviewing tests.                                                     |
| **Docs**             | `docs-subagent.mdc`             | Updating or adding PROJECT.md, TEST-SUGGESTIONS, AGENTS.md, README, or other context docs.  |
| **i18n**             | `i18n-subagent.mdc`             | Adding/changing UI copy, translation keys, or `src/i18n/` files.                            |
| **CI/Deploy**        | `ci-deploy-subagent.mdc`        | Editing `.github/workflows/`, build/deploy config, BASE_PATH, or “run tests before deploy.” |
| **Supabase/Backend** | `supabase-backend-subagent.mdc` | Editing Supabase client, types, edge functions, or client–backend contract.                 |
| **Review**           | `review-subagent.mdc`           | User asks “review this,” “review my PR,” or “suggest improvements.”                         |

---

## Project skills

Project skills live in **`.cursor/skills/`** and give step-by-step procedures for specific tasks. Use the skill when the user's request matches its "when to use."

| Skill                      | When to use                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **prompt**                 | Unclear requirements/approach — offer 3 options (one recommended) plus "or describe your own."                                  |
| **research**               | User says "research," gives paths/files, or needs external docs — check files, use web, summarize.                              |
| **test-design**            | "Add tests for X," "what should I test?" — read docs/TEST-SUGGESTIONS.md, pick scope, outline, implement.                       |
| **debug-from-error**       | User reports error — reproduce, isolate, fix, re-run and report.                                                                |
| **context7-lookup**        | Code uses a library API — fetch Context7 docs for that library, apply in next step.                                             |
| **i18n-add-string**        | "Add translation," "add keys" — add to es.json and en.json, use t.\* in component.                                              |
| **deploy-ci-troubleshoot** | "Deploy failing," "add tests to CI" — read deploy.yml and vite.config, suggest reproduce; add test step before build if needed. |
| **review-pr-feedback**     | "Review this," "review my PR" — checklist (Context7, i18n, secrets, tests, docs), output blocking/suggestions/nits.             |
| **docs-update**            | "Update docs," "PROJECT.md wrong," or after big change — map to PROJECT.md, AGENTS.md, TEST-SUGGESTIONS, apply in one pass.     |

---

## Workflow and comfort rules

These rules keep the workflow predictable and safe. All live in `.cursor/rules/` and apply as stated in each file.

| Rule                                       | Purpose                                                                                                                                                                                                                                       |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`check-agents-md-first.mdc`**            | Read AGENTS.md at the start of every chat.                                                                                                                                                                                                    |
| **`run-from-repo-root.mdc`**               | Run npm/lint/build from repo root (cwd = directory containing package.json and AGENTS.md).                                                                                                                                                    |
| **`ask-before-commit.mdc`**                | Never commit without permission; offer 3 gitmoji commit messages (emojis per [gitmoji.dev](https://gitmoji.dev)); commit only after user picks/approves.                                                                                      |
| **`ask-before-destructive-commands.mdc`**  | Confirm before `git push --force`, `git reset --hard`, `rm -rf`, or other irreversible commands.                                                                                                                                              |
| **`when-uncertain-offer-choices.mdc`**     | When requirements or approach are unclear, stop and offer 3 options (one recommended) plus “or describe your own.”                                                                                                                            |
| **`verify-after-errors.mdc`**              | After fixing lint/build/test errors, re-run the failing command and report outcome.                                                                                                                                                           |
| **`prefer-minimal-edits.mdc`**             | Keep each change focused; avoid refactoring unrelated code in the same edit.                                                                                                                                                                  |
| **`outline-before-large-changes.mdc`**     | For big refactors or new features, briefly outline steps (2–4 bullets) before implementing.                                                                                                                                                   |
| **`i18n-for-new-ui-text.mdc`**             | New user-facing strings go through i18n (t.\* keys and translation files).                                                                                                                                                                    |
| **`no-secrets-in-code.mdc`**               | Never put API keys, tokens, or passwords in repo code; use env vars and document in README/docs.                                                                                                                                              |
| **`sync-with-remote-before-push.mdc`**     | Suggest syncing with remote (e.g. `git pull --rebase`) before pushing.                                                                                                                                                                        |
| **`lint-before-commit.mdc`**               | Suggest running lint before committing; fix reported issues when offering to commit.                                                                                                                                                          |
| **`update-agents-md-on-changes.mdc`**      | Update AGENTS.md when repo layout, commands, or workflow change.                                                                                                                                                                              |
| **`update-project-md-on-app-changes.mdc`** | When routes, folders, or backend shape change, update `docs/PROJECT.md` in the same pass.                                                                                                                                                     |
| **`document-new-docs-in-agents-md.mdc`**   | When adding a new important doc (e.g. under `docs/` or root), add it to the docs table in AGENTS.md.                                                                                                                                          |
| **`agents-md-file-structure.mdc`**         | AGENTS.md must document the full project file/folder structure.                                                                                                                                                                               |
| **`tests-for-complex-code.mdc`**           | When adding or changing complex/test-prone code or when adding a new file under src/ or supabase/functions/—classify by TEST-SUGGESTIONS categories; if it matches, add or extend tests in the same pass. See **`docs/TEST-SUGGESTIONS.md`**. |

---

## What this project is

**unique-homes** is a **Lovable app** (Vite + React + TypeScript + Tailwind) at the **repo root**. The product is the app itself.

**`docs/`** holds project context for AI: **`docs/PROJECT.md`** describes the app (Unique Homes Lajares), stack, src layout, Supabase, and conventions. Use it when you need to understand or change this codebase.

---

## Repository layout

| Location                    | Role                                                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Repo root**               | Directory containing `package.json` and `AGENTS.md`. Lovable app: `src/`, `index.html`, `vite.config.ts`, `tsconfig*.json`, Tailwind/ESLint/PostCSS configs. Run `npm run dev` / `build` / `lint` from here. |
| **`docs/`**                 | Project context for AI (see `docs/PROJECT.md`).                                                                                                                                                              |
| **`.cursor/rules/`**        | Cursor rules (subagents, workflow, code conventions). All `*.mdc` apply as stated in each file.                                                                                                              |
| **`.cursor/skills/`**       | Project skills (test-design, debug-from-error, i18n-add-string, etc.). Use when the user’s request matches the skill’s “when to use.”                                                                        |
| **`.github/workflows/`**    | CI (e.g. `deploy.yml` for GitHub Pages).                                                                                                                                                                     |
| **`supabase/`**             | Supabase config and edge functions (e.g. `functions/get-bali-availability/`).                                                                                                                                |
| **`AGENTS.md`** (this file) | Agent instructions; read at start of every chat. Applies to the whole repo.                                                                                                                                  |

### Root (the app)

- **`src/`** – React app code (components, styles, entry). **`src/test/`** – Vitest setup (`vitest.setup.ts`) and shared mocks (`mocks/`).
- **`package.json`** – App deps and scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm run test`, `npm run test:run`, etc.
- **`tsconfig.json`**, **`tsconfig.app.json`**, **`tsconfig.node.json`** – TypeScript for the app and build tooling.
- **`vite.config.ts`** – Build config; includes Vitest `test` block (jsdom, `src/test/vitest.setup.ts`). **`tailwind.config.ts`**, **`postcss.config.js`**, **`eslint.config.js`** – Other tooling.
- **`index.html`**, **`components.json`** – Entry HTML and (e.g. shadcn) component config.

### `docs/` (project context for AI)

| File                           | Role                                                                                                                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`docs/PROJECT.md`**          | App overview for AI: what it is (Unique Homes Lajares), stack, src layout, Supabase, i18n, conventions. Read first when understanding or changing the codebase. |
| **`docs/README.md`**           | Short index: points to PROJECT.md and lists docs.                                                                                                               |
| **`docs/TEST-SUGGESTIONS.md`** | Beneficial tests to add (suggestions only); tooling, unit, integration, CI, backend. Use when introducing or planning tests.                                    |
| **`docs/lovable.md`**          | Lovable project setup and edit workflow (Lovable vs IDE). Optional context when onboarding or editing via Lovable.                                              |

---

## How to work in this repo

1. **Default scope is the app**
   - Edit, add, or refactor code under **repo root** and **`src/`**.
   - Use app tooling: `npm run dev`, `npm run build`, `npm run lint` from repo root.

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
- **`npm run preview:gh`** – Build with GitHub Pages base path and preview (open `/unique-homes/` on the shown URL)
- **`npm run test`** – Run tests (Vitest watch)
- **`npm run test:run`** – Run tests once (used in CI and pre-push)
- **`npm run test:coverage`** – Run tests with coverage

Full test list and priorities: **`docs/TEST-SUGGESTIONS.md`**. Referenced by tester subagent, test-design skill, and **`tests-for-complex-code.mdc`**.

---

## Summary

- **Read AGENTS.md first** at the start of every chat. Use repo root as cwd for npm/lint/build.
- **Repo root = Lovable app.** Work and run the app from here. **`docs/PROJECT.md`** = project context for AI; use it to understand and change the codebase.
- **Subagents** own code, tests, docs, i18n, CI/Deploy, Supabase, and review. **Skills** give step-by-step procedures (test-design, debug-from-error, i18n-add-string, deploy-ci-troubleshoot, review-pr-feedback, docs-update, etc.). Use the right subagent or skill when the task matches its “when to use.”
