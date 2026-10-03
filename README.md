# sadanand.tech

Personal portfolio for **Sadanand Konapur** — Generative AI / AI-ML engineer.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, next-themes, Vercel Analytics.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Content |
| --- | --- |
| `/` | Home / hero |
| `/about` | About + education |
| `/experience` | Timeline |
| `/projects` | Project grid |
| `/skills` | Skill groups |
| `/contact` | Contact + form |

Nav links and sitemap are driven from `nav` in `content.ts`.

## Edit content

All copy, experience, projects, skills and chat context live in one file:

```
src/data/content.ts
```

Update that file — layout components read from it. Leave `githubUrl` / `liveUrl` empty to hide project link buttons. TODOs in comments mark items you still need to supply (resume, project links, photo).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Powers **Ask Sadanand's AI** via `/api/chat` (server-only) |
| `FORMSPREE_FORM_ID` | Contact form delivery (Formspree) |
| `RESEND_API_KEY` | Alternative contact delivery (Resend) |
| `CONTACT_TO_EMAIL` | Inbox for Resend (defaults to portfolio email) |
| `CONTACT_FROM_EMAIL` | Verified Resend from-address |

Copy `.env.example` → `.env.local` and fill what you need. The chat widget and contact form degrade gracefully with clear errors if keys are missing.

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Deploy to Vercel (replace sadanand.tech)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add env vars from `.env.example` in **Project → Settings → Environment Variables**.
4. Deploy.
5. In Vercel → **Domains**, add `sadanand.tech` and `www.sadanand.tech`.
6. At your DNS provider, point the domain to Vercel (A/CNAME records Vercel shows).
7. Replace `public/resume.pdf` with your real resume before going live.

## Design notes

- Dark-first editorial look inspired by premium portfolio references: film grain, soft gradient orbs, glass lens hover on the hero, indigo accent (`#6366F1`).
- Light theme via toggle + `prefers-color-scheme`.
- Motion respects `prefers-reduced-motion`.

## What you must supply

1. Real `public/resume.pdf`
2. Project GitHub / live demo URLs in `content.ts`
3. Optional profile photo
4. `ANTHROPIC_API_KEY` for the chat feature
5. Formspree form ID **or** Resend API key for the contact form
