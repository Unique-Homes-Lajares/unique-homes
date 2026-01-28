# Unique Homes Lajares

Marketing site and booking flow for **Unique Homes Lajares** — boutique adults-only villas in Lajares, Fuerteventura.

**Site:** [uniquehomeslajares.com](https://www.uniquehomeslajares.com)

## Stack

- **Frontend:** Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix), React Router, TanStack Query
- **Backend:** Supabase (client + Edge Functions)
- **i18n:** de / en / es / fr / it

## Local development

**Requirements:** Node.js & npm (e.g. [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone https://github.com/unique-homes-lajares/unique-homes.git
cd unique-homes
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

## Commands

| Command         | Description                |
|-----------------|----------------------------|
| `npm run dev`  | Start dev server           |
| `npm run build`| Type-check and build       |
| `npm run lint` | Run ESLint                 |
| `npm run preview` | Preview production build |
| `npm run preview:gh` | Build with GitHub Pages base path and preview (open `/unique-homes/` on the shown URL) |

## Project layout

- **`src/`** — React app: pages, components, hooks, i18n, Supabase client.
- **`supabase/functions/`** — Edge functions (e.g. Bali availability via iCal).
- **`docs/`** — [PROJECT.md](docs/PROJECT.md) (context for AI), [lovable.md](docs/lovable.md) (Lovable workflow).

For a concise overview of routes, folders, and conventions, see [docs/PROJECT.md](docs/PROJECT.md).

## Deploy to GitHub Pages

The app deploys via **GitHub Actions** (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml)). The site is served at `https://<owner>.github.io/<repo>/` (e.g. [unique-homes-lajares.github.io/unique-homes/](https://unique-homes-lajares.github.io/unique-homes/)).

### Environment variables for deploy

The build uses Supabase env vars that are **not** committed (see `.env` locally). For GitHub Actions you must add them as **repository secrets**:

1. In the repo: **Settings → Secrets and variables → Actions**.
2. **New repository secret** for each:
   - **Name:** `VITE_SUPABASE_URL` — **Value:** your Supabase project URL (same as in `.env`).
   - **Name:** `VITE_SUPABASE_PUBLISHABLE_KEY` — **Value:** your Supabase anon/public key (same as in `.env`).

The workflow passes these into the build step so the deployed app can call Supabase. If they are missing, the build still runs but the app will have no Supabase connection in production.

**If you see a white page:**

1. **Use “GitHub Actions” as the Pages source**  
   In the repo: **Settings → Pages → Build and deployment → Source** must be **“GitHub Actions”**, not “Deploy from a branch”. With “Deploy from a branch”, GitHub serves the raw repo and the app’s entry script (`/src/main.tsx`) is not built, so the browser gets 404 and a blank screen.

2. **Check the last workflow run**  
   Open the **Actions** tab and confirm the “Deploy to GitHub Pages” workflow ran successfully on your branch (e.g. `main`).

3. **Test the production build locally**  
   From the repo root, run:
   ```sh
   BASE_PATH=/unique-homes/ npm run build && npm run preview
   ```
   Then open the URL shown (e.g. http://localhost:4173/unique-homes/). If that loads correctly, the same build is what Actions deploys when the source is “GitHub Actions”.

## Lovable

This repo is linked to [Lovable](https://lovable.dev). For Lovable-specific info (edit via Lovable, deploy, custom domain), see [docs/lovable.md](docs/lovable.md).
