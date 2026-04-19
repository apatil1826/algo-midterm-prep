# algo-midterm-prep

Web-hosted study tool built for the MPCS **Algorithms** midterm (Spring 2026, Ishan Agarwal). Focused on **concept mastery + practice-problem pattern recognition**.

- Browse every topic from the lecture notes with two toggleable views: **Professor's view** (formal, rigorous) and **Simplified view** (intuition-first).
- Every practice problem — from the practice midterm, homeworks, and problem-solving sessions — has a clean step-by-step walkthrough.
- Inline math side-tips refresh log, exponent, and summation rules exactly where they come up.
- A dedicated **Pattern Recognition Guide**: signals in problem wording → technique → solution template → example problems.
- Cmd/Ctrl-K fuzzy search across topics, problems, and patterns (Fuse.js).
- Clerk authentication (email-only); all content gated behind sign-in.

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS, dark mode by default
- KaTeX for math rendering (`$inline$`, `$$block$$`)
- Fuse.js for search
- Clerk (`@clerk/nextjs`) for auth
- Deployable to Vercel with zero config

## Local setup

1. Clone the repo and install dependencies:

   ```sh
   git clone git@github.com:apatil1826/algo-midterm-prep.git
   cd algo-midterm-prep
   npm install
   ```

2. Create a Clerk application:
   - Go to [dashboard.clerk.com](https://dashboard.clerk.com) and create a new application.
   - In **User & Authentication → Email, Phone, Username**, enable **Email address**. Disable username and phone as you prefer.
   - In **User & Authentication → Social Connections**, disable **all** OAuth providers (Google, GitHub, etc.). The spec for this app is email-only sign-in.
   - Grab the **Publishable key** and **Secret key** from the API Keys page.

3. Create `.env.local` (copy from `.env.example`):

   ```sh
   cp .env.example .env.local
   ```

   Fill in:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

4. Run the dev server:

   ```sh
   npm run dev
   ```

   Visit `http://localhost:3000`. You'll be redirected to the sign-in page; the sign-up flow creates an account with email + password (or email magic link if configured in Clerk).

## Content data files

All study content lives in `/data/` and is loaded from JSON at build time. No hard-coded content in React components.

- `data/topics.json` — master topic list with importance tier and lecture number.
- `data/topics/<id>.json` — per-topic: Professor's view, Simplified view, key formulas, "when to use" summary.
- `data/problems.json` — problem metadata.
- `data/problems/<id>.json` — per-problem walkthrough with steps, answers, and math side-tips.
- `data/patterns.json` — the pattern recognition library.
- `data/search-index.json` — flattened searchable index consumed by Fuse.js.

Math is written in LaTeX syntax: `$inline$` and `$$block$$`.

### Regenerating the search index

Whenever you edit topic or problem JSON, rebuild the search index:

```sh
node scripts/build-search-index.mjs
```

This concatenates titles, blurbs, and key text from every topic/problem/pattern into `data/search-index.json`.

## Deploying to Vercel

1. Push this repo to GitHub (it's already wired to `apatil1826/algo-midterm-prep`).
2. On Vercel, click **New Project** and import this repo. Framework auto-detects as Next.js.
3. Before deploying, in **Project Settings → Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk publishable key |
   | `CLERK_SECRET_KEY` | Your Clerk secret key |

   (Add them to Production, Preview, and Development as needed.)

4. In the Clerk dashboard, add your Vercel deployment URL (e.g. `https://algo-midterm-prep.vercel.app`) to **Domains → Authorized Origins** and the corresponding `https://<app>.clerk.accounts.dev` to **Authentication → Paths** settings if you customize.
5. Click **Deploy**. Zero additional config.

## Keyboard shortcuts

- `⌘/Ctrl + K` — open command palette / search
- `Esc` — close any open modal
- `↑ / ↓` in search — navigate results; `Enter` to open

## Structure

```
src/
  app/               Next.js app-router pages (server components)
    page.tsx         home
    topics/          topic list + detail
    problems/        problem list + detail
    patterns/        pattern list + detail
    sign-in/         Clerk sign-in
    sign-up/         Clerk sign-up
  components/        client components (CommandPalette, MathTip, etc.)
  lib/data.ts        JSON loaders
data/                all content as JSON
scripts/             build-search-index.mjs
middleware.ts        Clerk route protection
```

## Adding new content

**New topic:**

1. Add an entry in `data/topics.json` (set `tier` and `lecture`).
2. Create `data/topics/<id>.json` with `whenToUse`, `keyFormulas`, `professor`, `simplified`.
3. Run `node scripts/build-search-index.mjs`.

**New problem:**

1. Add an entry in `data/problems.json`.
2. Create `data/problems/<id>.json` with `statement`, `steps`, `answerKey`. Steps can include `tips` for math-refresher callouts.
3. Run `node scripts/build-search-index.mjs`.

**New pattern:** edit `data/patterns.json` directly and rebuild the search index.
