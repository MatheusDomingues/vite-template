# Vite Template

A React dashboard starter with a complete auth flow, a reusable UI kit and a production server. It started as the early base of Linkify, a WhatsApp messaging SaaS, and was kept as a template after the product evolved. It pairs with the [fastify-example](https://github.com/MatheusDomingues/fastify-example) API.

## What's inside

- **Auth flow:** login, sign-up, password recovery with OTP and protected routes
- **Dashboard** layout with charts
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
