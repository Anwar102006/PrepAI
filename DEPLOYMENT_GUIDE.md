# Deployment Guide

This guide walks you through deploying the PrepAI platform to production using **Vercel** for the frontend/API and **Supabase/Railway** for the PostgreSQL database.

---

## 1. PostgreSQL Deployment (Supabase / Railway)

PrepAI requires a production-ready PostgreSQL instance.

**Steps:**

1. Create a free account on [Supabase](https://supabase.com) or [Railway](https://railway.app).
2. Provision a new PostgreSQL Database.
3. Locate your **Connection String** (URI).
   - _Note: If using Supabase, look for the "Connection Pooler" string (port 6543) for serverless compatibility._
4. Open your local terminal, point Prisma to the new database, and push your schema:
   \`\`\`bash

   # Temporarily set the remote URL

   set DATABASE_URL="postgresql://username:password@your-db-host:6543/postgres"

   # Push schema to production

   npx prisma db push
   \`\`\`

---

## 2. Vercel Deployment (Application & API)

Vercel provides native Edge caching and zero-config Next.js deployments.

**Steps:**

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your PrepAI GitHub repository.
4. Expand the **Environment Variables** section and configure them (see below).
5. Click **Deploy**.

---

## 3. Environment Variables

You must inject these variables into your Vercel deployment settings before building:

| Variable                   | Description                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `NODE_ENV`                 | `production`                                                                           |
| `DATABASE_URL`             | Your PostgreSQL connection string (from Step 1).                                       |
| `NEXTAUTH_SECRET`          | A 32+ character random string. Generate via `openssl rand -base64 32`.                 |
| `NEXTAUTH_URL`             | The fully qualified URL of your Vercel deployment (e.g., `https://prepai.vercel.app`). |
| `OPENAI_API_KEY`           | Your OpenAI secret key (`sk-proj-...`).                                                |
| `UPSTASH_REDIS_REST_URL`   | Redis URL for API rate limiting (from Upstash).                                        |
| `UPSTASH_REDIS_REST_TOKEN` | Redis Token for API rate limiting.                                                     |

_(Optional OAuth)_

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` / `GITHUB_SECRET`

---

## 4. Build Commands

Vercel automatically detects Next.js. If you are deploying manually (e.g., via Docker), use:

- **Install**: `npm install`
- **Generate ORM**: `npx prisma generate`
- **Build**: `npm run build`
- **Start**: `npm run start`

Our codebase relies on `output: "standalone"` in `next.config.ts`, making the build artifact highly optimized for containerized environments.

---

## 5. Production Checklist

Before announcing the platform is live, verify the following:

- [ ] **OAuth Callbacks**: If using Google/GitHub login, ensure you have updated their developer portals to accept your Vercel domain as an authorized redirect URI (`https://your-domain.vercel.app/api/auth/callback/google`).
- [ ] **Rate Limiting Active**: Send 15 rapid requests to `/api/resume/analyze` to ensure Upstash returns a `429 Too Many Requests` status, confirming DDoS protection is live.
- [ ] **Database Indexes**: Verify the Prisma schema was pushed successfully and user logins are persisting in the Supabase dashboard.
- [ ] **PDF Parsing**: Upload a complex PDF to the Resume Analyzer. If it succeeds without a `DOMMatrix` error, your Edge SSR routing is functioning correctly.
