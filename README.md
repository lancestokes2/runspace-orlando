# RunSpace Orlando

Every Orlando run club and race in one place — a fast, SEO-friendly Next.js site
with a Supabase-backed email waitlist.

Built with **Next.js 16 (App Router) + TypeScript**. No Tailwind — a single
hand-written design system in `app/globals.css`.

---

## Quick start (local)

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

---

## Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Required | What it is |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Your live URL, e.g. `https://runspaceorlando.com`. Used for metadata, canonical URLs, sitemap, OG tags. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | yes | Contact email shown in the UI. |
| `NEXT_PUBLIC_SUPABASE_URL` | yes | Supabase project URL (Project Settings → API). |
| `SUPABASE_SERVICE_ROLE_KEY` | yes | Supabase **service-role** key. Server-only — never exposed to the browser. |
| `NEXT_PUBLIC_GA_ID` | no | Google Analytics 4 ID (e.g. `G-XXXX`). Leave blank to disable analytics. |

`.env.local` is gitignored. Never commit real keys.

---

## Supabase setup (waitlist backend)

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates the
   `waitlist` table, a case-insensitive unique constraint on email (no
   duplicates), validation constraints, and locks the table with Row Level
   Security.
3. Copy your project URL and **service-role** key into `.env.local`.

The waitlist form posts to `app/api/waitlist/route.ts`, which validates the
input server-side and inserts using the service-role key. The browser never
touches the database directly.

---

## Project structure

```
app/
  layout.tsx            root metadata, fonts, analytics
  page.tsx              home
  clubs/[slug]/page.tsx club profile (statically generated)
  privacy, terms/       legal pages
  api/waitlist/route.ts waitlist POST handler (Supabase insert)
  sitemap.ts, robots.ts SEO
  opengraph-image.tsx   dynamic social share image
  error.tsx, not-found.tsx  error handling
  globals.css           the whole design system
components/             UI (Nav, Footer, WaitlistForm, ClubDirectory, …)
lib/                    data, types, date helpers, site config, options
supabase/schema.sql     database schema
```

---

## Deploying (GitHub → Vercel)

1. Push this folder to a GitHub repo.
2. In [Vercel](https://vercel.com), **Add New → Project** and import the repo.
3. Add the environment variables above in the Vercel project settings.
4. Deploy. Every push to the main branch redeploys automatically.
5. Add your custom domain in **Project → Settings → Domains**.

---

## What only you can do before launch

- Run the Supabase SQL and add the env vars.
- Point `NEXT_PUBLIC_SITE_URL` / contact email at your real domain.
- Replace the `[DATE]` and other `[placeholders]` in Privacy & Terms, and have
  them reviewed.
- Replace the `EX`-tagged example details on the Milk District club profile with
  real, verified notes.
- (Optional) Add your `NEXT_PUBLIC_GA_ID` to turn on analytics.
