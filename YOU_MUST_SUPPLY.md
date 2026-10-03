# What you must supply before going live

1. **Resume** — a generated CV is in `public/resume.pdf` (from your portfolio data). Replace it anytime with your own designed PDF.
2. **Project links** — add `githubUrl` / `liveUrl` in `src/data/content.ts` (buttons stay hidden while empty)
3. **Optional photo** — add an image under `public/` and set `site.avatar` in `content.ts`
4. **`ANTHROPIC_API_KEY`** — for Ask Sadanand's AI (`/api/chat`)
5. **Form delivery** — either `FORMSPREE_FORM_ID` or `RESEND_API_KEY` (+ optional `CONTACT_FROM_EMAIL`)
6. **No invented metrics** — only add awards/numbers when you have verified facts
