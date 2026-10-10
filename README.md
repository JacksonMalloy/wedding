This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Private rehearsal dinner invitation

The rehearsal dinner lives at `/invite/<secret>`. It is deliberately absent from
the main navigation, returns a 404 for an incorrect secret, and sends no-index
headers to search engines. Configure these environment variables before running
or deploying it:

```bash
REHEARSAL_INVITE_SLUG=use-a-long-random-value-here
RESEND_API_KEY=re_...
RESEND_FROM="Delina & Jackson <rsvp@your-verified-domain.com>"
REHEARSAL_RSVP_TO=jackson@example.com,delina@example.com
REHEARSAL_RSVP_REPLY_TO=jackson@example.com
```

`REHEARSAL_RSVP_TO` and `REHEARSAL_RSVP_REPLY_TO` are optional. A successful
RSVP uses Resend's batch endpoint to submit an organizer notification and a guest
confirmation together. Production guest confirmations require a Resend-verified
sending domain.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### West Coast reception invitation

The separate reception invitation lives at `/reception/<secret>`. It uses its
own guest list, secret, and RSVP endpoint; it does not change the Niagara wedding
or rehearsal invitations. The event is Saturday, November 14, 2026, with a drop-in
window of 1–5 PM Pacific Standard Time at the hosts' home in Port Moody.

`src/lib/reception-guests.ts` currently stages only six confirmed adult-contact
households, including one unnamed plus-one slot. It is **not the full guest list**.
Resolve the remaining households before opening RSVPs. The highlighted photograph
is stored as a metadata-free WebP at `public/reception/celebration.webp`, with
responsive image sizes served by Next.js. The original upload is not committed.

Names and emails in this file are public repository data and are included in the client bundle; the secret
URL and no-index headers do not make those details confidential. Do not add
research source links, guessed contacts, or child details to this file.

Configure before deploying or sharing a real invitation link:

```bash
RECEPTION_INVITE_SLUG=replace-with-a-long-random-secret
RECEPTION_RSVP_ENABLED=false
RESEND_API_KEY=re_...
RESEND_FROM="Delina & Jackson <rsvp@your-verified-domain.com>"
# Optional reception-specific overrides:
RECEPTION_RSVP_FROM="Delina & Jackson <rsvp@your-verified-domain.com>"
RECEPTION_RSVP_TO=jackson@example.com,delina@example.com
RECEPTION_RSVP_REPLY_TO=jackson@example.com
```

Keep `RECEPTION_RSVP_ENABLED=false` until the guest list and email settings are
ready. Set it to exactly `true` to open the form and API. Both also require a
secret of at least 16 characters and confirmed, nonblank event date/time. With
RSVPs disabled, a valid link shows event details and a “More details soon” notice;
invalid or missing secrets return a 404. The route is absent from main navigation
and has no-index and no-referrer headers.

RSVPs validate household membership against the reception list, derive names on
the server, and send an organizer notification plus a guest confirmation in one
Resend batch. Retries of an unchanged form reuse an event-scoped idempotency key
for Resend's deduplication window. This is email delivery, not a persistent RSVP
database; responses are not written to Notion or automatically reconciled with
the contact tracker. No invitations are sent when the page is deployed.

#### Checks

Use Node.js 22.18+ or 24+ for the native TypeScript unit tests.

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm lint
# Existing wedding API requires RESEND_API_KEY during build. A non-secret
# placeholder is sufficient for build-only validation; do not send with it.
RESEND_API_KEY=re_build_placeholder_only pnpm build
```

`pnpm test` covers confirmed roster invariants, name search, event details,
validation, household isolation, plus-ones, and declines. The existing global
lint target also includes bundled Pinpoint code and older wedding components.
