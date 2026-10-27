# Production Deployment Guide

This guide explains how to deploy the PrepAI Mock Interview platform to production, targeting **Vercel** for the frontend/Next.js application and **Supabase (or Railway)** for the PostgreSQL Database.

## Overview of Security & Performance Improvements

Before deploying, we have implemented several production-ready standards:

- **Upstash Redis Rate Limiting**: Added strict API rate-limiting via `@upstash/ratelimit` to protect against DDoS and abuse.
- **Dockerization**: A multi-stage `Dockerfile` has been configured using Next.js `standalone` mode to reduce the image size by 80%.
- **Security Headers**: Standard security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) are injected natively via `next.config.ts`.
- **Structured Logging**: A custom `logger.ts` was added to standardize and stringify logging metrics for parsing in Axiom/Datadog.
- **CI/CD**: GitHub Actions workflows are established in `.github/workflows/main.yml` to lint, typecheck, and build code on every pull request.

---

## 1. Database Setup (Supabase / Railway)

1. **Create the Project**: Log in to Supabase or Railway and spin up a new PostgreSQL database.
2. **Retrieve Connection String**:
   - Navigate to the Database settings and find the Connection Pooler URI (starts with `postgresql://`).
3. **Run Migrations Locally**:
   Before deploying Vercel, push your Prisma schema to the new production database:

   ```bash
   # Set the production connection string locally temporarily
   set DATABASE_URL="postgresql://user:password@your-db.supabase.com:6543/postgres"

   # Push the schema and apply it
   npx prisma db push
   ```

---

## 2. Setting Up Rate Limiting (Upstash)

PrepAI uses Upstash Redis to power rate limiting.

1. Log in to [Upstash](https://upstash.com/).
2. Create a new Redis database (free tier is perfectly sufficient).
3. Retrieve your `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

---

## 3. Deployment on Vercel

Vercel is the most optimized platform for Next.js applications, offering Edge network distribution and automatic CI/CD.

1. **Connect GitHub**: Import your GitHub repository into Vercel.
2. **Configure Environment Variables**:
   Open `.env.production.example` and copy all keys into the Vercel Environment Variables UI. Ensure you update:
   - `DATABASE_URL` -> (From Step 1)
   - `NEXTAUTH_SECRET` -> (Generate using `openssl rand -base64 32`)
   - `NEXTAUTH_URL` -> (Your Vercel domain)
   - `OPENAI_API_KEY` -> (Your production OpenAI key)
   - `UPSTASH_REDIS...` -> (From Step 2)
   - `GOOGLE/GITHUB OAUTH` -> (Update your OAuth providers to include your Vercel URL in their allowed redirect URIs: `https://your-domain.vercel.app/api/auth/callback/google`)
3. **Build Settings**:
   Vercel will automatically detect the Next.js framework. It will run:
   - Install Command: `npm install`
   - Build Command: `npm run build`
     _(Prisma generates automatically during the build step thanks to our `postinstall` or Next.js cache)._

4. **Deploy**: Click Deploy. Vercel will automatically run through the build steps.

---

## 4. Deploying via Docker (Alternative to Vercel)

If you prefer to deploy to a VPS, AWS ECS, or Railway via a Docker container:

1. The included `Dockerfile` uses a highly optimized multi-stage build.
2. Ensure you build with secrets:
   ```bash
   docker build -t prepai-app .
   ```
3. Run the container:
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your_db_url" \
     -e NEXTAUTH_SECRET="secret" \
     -e NEXTAUTH_URL="http://localhost:3000" \
     ...other_env_vars \
     prepai-app
   ```

---

## Post-Deployment Checklist

- [ ] Attempt to Login / Register a user.
- [ ] Upload a mock Resume PDF to test backend parsing memory limits.
- [ ] Run a test Coding execution to verify Piston API reachability.
- [ ] Log in as an Admin and view the Dashboard analytics.
