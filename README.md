# Linkify Web

Front end of Linkify, a multi-tenant SaaS for automating customer messaging on WhatsApp. It is the dashboard where each organization signs in and follows its WhatsApp instances. The back end lives in [fastify-example](https://github.com/MatheusDomingues/fastify-example).

## What's inside

- **Auth flow:** login, sign-up, password recovery with OTP and protected routes
- **Dashboard** with instance metrics and charts
- **White-label ready:** the product name comes from an environment variable
- **UI kit** built on shadcn/ui (Radix + Tailwind CSS v4), with light and dark themes
- **Forms** with React Hook Form and Zod
- **Production server** in Express that serves the build with compression and proxies `/api` to the back end

## Stack

TypeScript · React 19 · Vite · Tailwind CSS · shadcn/ui · React Router · Zod · Recharts · Express

## Getting started

Create a `.env` file:

```bash
API_URL=http://localhost:5000
```

Then:

```bash
pnpm install
pnpm dev
```
