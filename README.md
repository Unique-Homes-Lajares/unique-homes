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
git clone <YOUR_GIT_URL>
cd unique-homes
npm install
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

## Commands

| Command         | Description                |
|----------------|----------------------------|
| `npm run dev`  | Start dev server           |
| `npm run build`| Type-check and build       |
| `npm run lint` | Run ESLint                 |
| `npm run preview` | Preview production build |

## Project layout

- **`src/`** — React app: pages, components, hooks, i18n, Supabase client.
- **`supabase/functions/`** — Edge functions (e.g. Bali availability via iCal).
- **`docs/`** — [PROJECT.md](docs/PROJECT.md) (context for AI), [lovable.md](docs/lovable.md) (Lovable workflow).

For a concise overview of routes, folders, and conventions, see [docs/PROJECT.md](docs/PROJECT.md).

## Lovable

This repo is linked to [Lovable](https://lovable.dev). For Lovable-specific info (edit via Lovable, deploy, custom domain), see [docs/lovable.md](docs/lovable.md).
