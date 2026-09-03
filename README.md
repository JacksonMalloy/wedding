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
