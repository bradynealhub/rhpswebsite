# RHPS Website — Session Handoff (2026-07-19)

This document exists to hand off a very long Claude Code session to a fresh
session with no memory of it. Read this first, then treat the repo itself
(and the plan file referenced below) as the source of truth for anything
this doc doesn't cover in enough detail.

## ⚠️ Most important thing first

**Almost nothing from this session is committed to git.** The only commits
on `main` are:
1. `e356c98` — the original site content (before this session's work)

Everything below — the entire founders' portal (auth, opportunities,
documents, live collaborative editing), the RHT Scout SSO link, the
marketing-pages route-group restructure, the editor UI overhaul, the
opportunity pipeline redesign — is **uncommitted** in the working tree
(`git status` shows ~38 changed/new paths). It is all **live in production**
at rhps.health (deployed via `wrangler`/`opennextjs-cloudflare deploy`
directly from the working tree), but there is no git checkpoint to fall
back to if something gets overwritten or lost locally.

**First thing to do in the new session: ask Brady whether to commit this
now**, and if yes, review `git status`/`git diff` before committing (per
the repo's own safety norms) rather than blindly `git add -A`. Do not
commit `.dev.vars`, secrets, or anything already gitignored.

## What this project is

RHPS (Rural Health Provider Services) — a Next.js 16 marketing site
deployed to Cloudflare Workers via OpenNext, at **rhps.health**. The whole
public site is currently behind a single shared-password gate
(`SITE_PASSWORD`, via `middleware.ts`) for the founders' pre-launch review
period. Brady (the user) is the founder; his portal login is
`bneal@reweavehealth.com` (password known to him, not recorded here).

Sibling repo: **`/Users/ethianmacbookpro/Dev/ETHIAN INCUBATOR/Rural Health
Incubator/rht-scout`** — a separate Cloudflare Worker (Hono, not Next.js)
called "RHT Scout," a state-by-state RHTP grant-opportunity scoring
dashboard at rhtpscout.com. It's now linked into the RHPS portal via SSO
(see below). It has its own git history (2 commits) and is a fully
separate deploy target from the RHPS Website Worker.

## The plan file

A detailed implementation plan for the portal (auth model, data model,
Durable Object design, phased build order) lives at:

```
~/.claude/plans/it-s-working-well-let-s-wobbly-russell.md
```

That plan was written and approved via Claude Code's plan mode partway
through this session, then executed end-to-end. It's still an accurate
architectural reference for *why* things are built the way they are,
though a few things evolved during implementation (noted below).

## What got built this session, in order

1. **Site-wide content voice pass** — repositioned the whole public site
   away from a "twofold capture+deliver" framing (dropped for a legal
   self-dealing concern Brady flagged) to a patient-first "referral ≠ care
   received" voice, then a further MAHA-policy-brief-informed pass. Fully
   committed in `e356c98`. Not relevant to ongoing portal work, just
   context for why the marketing copy reads the way it does.

2. **RHPS Portal — auth system** (`lib/portalSession.ts`,
   `lib/passwordHash.ts`, `lib/portalDb.ts`, `app/portal/api/auth/*`,
   `app/portal/(public)/login`, `app/portal/(public)/setup/[token]`):
   hand-rolled email+password auth (not Cloudflare Access — Brady
   explicitly wanted real accounts, not SSO-only), PBKDF2 password hashing
   via Workers-native `crypto.subtle`, database-backed sessions (D1) so
   access can be revoked instantly, double-submit CSRF for mutating
   routes. Brady is seeded as the first platform admin.

3. **RHPS Portal — opportunities** (grant/funding pipeline): originally a
   5-field version, **redesigned later in the session** (see item 8) into
   a proper 7-stage CRM-informed pipeline with go/no-go tracking and an
   activity timeline.

4. **RHPS Portal — documents**: folders (nestable), file uploads to R2,
   comments, and a Draft → In Review → Approved/Rejected approval
   workflow gated by tier (Founding Operator / Advisory Council can
   approve; Contributor cannot).

5. **RHPS Portal — live collaborative rich-text editing**: the big
   technical piece. `documentRoom.ts` is a Durable Object (one instance
   per richtext document) holding live Yjs CRDT state, reached through a
   **custom Worker entry point** (`worker.ts`) that wraps OpenNext's
   generated Next.js handler — this is required, not a stylistic choice:
   **Next.js Route Handlers cannot handle WebSocket upgrades at all**,
   confirmed via Next.js's own RFC discussion, on any version, including
   on Workers. `worker.ts` verifies the session cookie against D1 itself
   (no `next/headers` available outside the Next.js request context)
   before ever forwarding a WebSocket to the Durable Object.
   `components/portal/CollaborativeEditor.tsx` is a hand-wired Yjs
   WebSocket client (not `y-websocket`) driving a TipTap editor. Verified
   with a real Node.js Yjs test client against the live deployment:
   bidirectional sync, late-joiner catch-up, and presence all confirmed
   working.

6. **RHT Scout SSO link**: a "RHT Scout ↗" link in the portal nav (only
   for Founding Operators / platform admins), opens in a new tab. Clicking
   it hits `app/portal/api/scout/sso/route.ts`, which mints a 60-second
   HMAC-signed handoff token (shared secret `PORTAL_SSO_SECRET`, set on
   *both* Workers) and redirects to `rhtpscout.com/sso`, a new route added
   to the RHT Scout repo that verifies the token and logs the browser into
   RHT Scout's existing single-shared-bearer-token session. RHT Scout's
   code was not moved or merged — it stays a fully separate app/deploy.

7. **Portal UX polish**: real RHPS logo in the portal nav, white portal
   background (vs. the marketing site's warmStone), and the editor got a
   full toolbar overhaul (bold/italic/underline/strike, heading levels,
   font size via a small custom extension — `@tiptap/extension-font-size`
   is still pre-release, so `lib/tiptapFontSize.ts` extends the stable
   `TextStyle` mark directly instead — lists, blockquote, alignment,
   links, undo/redo, an optimistic save-status indicator, and an export
   menu (HTML/text download, print-to-PDF via `window.print()`).

8. **Opportunity pipeline redesign**: Brady's explicit feedback was that
   the original 5-field version "doesn't capture the true window and flow
   of what might need to be tracked in a go/no-go situation" and asked for
   research into open-source CRM opportunity models first. Researched
   Twenty/EspoCRM/SuiteCRM (deal pipeline patterns) and dedicated grant
   pipeline tools (Instrumentl et al. — LOI vs. submission deadlines,
   probability, requested vs. awarded amounts are standard there).
   Redesigned to 7 stages (added **Qualifying** as an explicit pre-commit
   checkpoint, split **No-Go** — our call — from **Declined** — the
   funder's call), added `program_name` (distinct from `funder`),
   `probability`, separate `loi_deadline`/`submission_deadline`/
   `decision_date`/`award_start_date`, `amount_requested_cents` vs.
   `amount_awarded_cents`, an explicit go/no-go decision record (who, when,
   why — `GoNoGoDecision.tsx`), and a CRM-style activity timeline (notes/
   calls/emails/meetings/tasks — `OpportunityActivityTimeline.tsx`).
   Migration `0004_redesign_opportunities.sql` recreates the table
   (SQLite can't alter a CHECK constraint in place) and remaps old
   `Won`/`Lost` data to `Awarded`/`Declined`.

## Hard-won technical facts (don't re-derive these — they cost real debugging time)

- **Next.js Route Handlers cannot do WebSockets, on any version, including
  Workers.** This is why `worker.ts` exists as a custom entry point at
  all. Don't try routing WebSocket traffic through a Next.js API route.
- **`crypto.subtle`'s PBKDF2 on Cloudflare Workers hard-caps at 100,000
  iterations** — OWASP's recommended 210,000 throws a runtime
  `NotSupportedError`. Not documented anywhere; found via a live 500 and
  `wrangler tail`. `lib/passwordHash.ts` uses 100,000 and explains why.
- **`opennextjs-cloudflare build` runs `next build`, which runs its own
  TypeScript check — before `.open-next/worker.js` exists.** `worker.ts`
  importing that generated file is therefore a chicken-and-egg problem;
  solved with an ambient module declaration (`open-next-worker.d.ts`)
  rather than fighting tsconfig excludes (which `next build`'s checker
  doesn't fully respect for root-level files anyway).
- **Durable Object constructors: don't kick off state-loading as a
  separate, unawaited operation from schema setup.** A real bug this
  session: `loadState()` ran as its own promise while table creation was
  still in flight inside a separate `blockConcurrencyWhile` call, causing
  "no such table" on a document's very first connection. Fix: put schema
  setup *and* state loading in the same `blockConcurrencyWhile` callback,
  sequenced.
- **`opennextjs-cloudflare deploy` and plain `wrangler deploy --dry-run`
  can behave differently** — a `--dry-run` bundle check passing doesn't
  fully prove a real deploy will work correctly (Durable Object export
  warnings especially can be false positives *or* real, depending on
  which command path produced them — verify with a live smoke test, not
  just the dry-run).
- **Server Actions invoked via direct JS function call (not a plain
  `<form action={fn}>`) can't be tested through curl** — they use Next's
  internal RSC action-invocation protocol, not a plain POST. Plain
  `<form action={fn}>` *can* be progressively-enhanced-tested this way, in
  principle, but wasn't attempted this session (would need to scrape the
  hidden action-id field). The verification pattern used all session for
  Server-Action-driven UI: seed real rows directly via
  `wrangler d1 execute --remote`, confirm the pages render them correctly,
  clean up. Real click-through by Brady is still the strongest
  confirmation for anything that's only reachable via a client-invoked
  Server Action (e.g. the "Submit for review" button inside the
  collaborative editor, folder creation, comments).
- **The portal's editor toolbar has never been visually verified** — it
  only mounts client-side after JS hydration (`immediatelyRender: false`,
  required for TipTap SSR safety), so it's invisible to any HTML-scraping
  check, and the site's `SITE_PASSWORD` Basic Auth gate blocks the
  automated Browser pane tooling (can't pass the password through without
  materializing it into a visible tool call, which is a hard no per
  safety rules — this came up multiple times this session). Typecheck is
  clean and every call is standard, well-documented TipTap API, but this
  is genuinely unverified beyond that. **Ask Brady to click through it.**
- **Never print secrets into tool output/transcripts.** This came up
  concretely: once, RHT Scout's `ADMIN_API_TOKEN` got printed while
  debugging the SSO flow, and it was immediately rotated via
  `wrangler secret put` as a precaution. `SITE_PASSWORD` and
  `PORTAL_SSO_SECRET` were always read into shell variables and used
  in-line (e.g. `curl -u "site:$PW"`) without ever echoing them.

## Cloudflare resources now in play

- Worker `rhps-website` (custom domain `rhps.health`) — `wrangler.jsonc`
  in this repo. Custom entry point `worker.ts` (not
  `.open-next/worker.js` directly).
- D1 database `rhps-portal` (binding `PORTAL_DB`) — 4 migrations applied,
  both `--local` and `--remote`.
- R2 bucket `rhps-portal-files` (binding `PORTAL_FILES`) — uploaded file
  attachments only, never public.
- Durable Object `DocumentRoom` (binding `DOCUMENT_ROOM`) — one instance
  per richtext document. (A throwaway `SpikeRoom` class from the initial
  transport spike was properly retired via a `deleted_classes` migration
  entry, not just deleted from config.)
- Secrets set on `rhps-website`: `SITE_PASSWORD`, `RESEND_API_KEY`,
  `PORTAL_SSO_SECRET`. Also present in `.dev.vars` for local parity.
- Secrets set on `rht-scout`: `ADMIN_API_TOKEN` (rotated this session),
  `ANTHROPIC_API_KEY`, `PORTAL_SSO_SECRET` (same value as above).
- Deploy commands: `npm run pages:build && npm run pages:deploy` for RHPS
  Website; `npx wrangler deploy` for rht-scout (plain Worker, no OpenNext).

## Known loose ends / things not done

- **Nothing committed to git** (see top of this doc).
- Editor toolbar not visually verified (see above).
- Folder creation, comments, and approve/reject buttons are Server
  Actions invoked from client components — logically verified via D1
  seeding + page-render checks, not full end-to-end click-through.
- `components/layout/TwofoldExplainer.tsx` and the `TwofoldContent` type
  in `content/types.ts` are dead code (unused since the twofold-framing
  removal early in the session) — never cleaned up, low priority.
- No email notifications anywhere in the portal (deliberately deferred —
  Resend is already integrated for the public contact form, would be an
  easy fast-follow for e.g. "you've been invited" or "a document needs
  your approval").
- `workers_dev` is not explicitly set to `false` in `wrangler.jsonc` for
  either Worker. Lower risk than it would have been under the
  originally-planned Cloudflare-Access design (portal auth is now app-
  level session verification, not edge-hostname-based), but worth
  confirming/hardening at some point.
- No automated tests exist anywhere in this repo — all verification this
  session was manual (curl scripts, a real Node.js Yjs test client, direct
  D1 seeding). If this project matures, a real test suite is worth doing.

## Everything else

For anything not covered above, read the actual code — it's heavily
commented specifically to explain *why* (not just what), including a lot
of the reasoning captured in this document. Start with `worker.ts` and
`documentRoom.ts` for the collaborative-editing architecture, `lib/
portalSession.ts` and `lib/portalPermissions.ts` for the auth/permission
model, and the plan file for the original end-to-end design intent.
