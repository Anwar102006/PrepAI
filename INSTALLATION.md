# Installation Guide

Follow these steps to set up the PrepAI platform locally on your machine.

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**: v20 or v22 (LTS recommended)
- **npm** (v10+)
- **PostgreSQL**: v14+ (or a cloud instance like Supabase/Railway)
- **Git**

## 1️⃣ Clone & Install Dependencies
First, clone the repository and install the required npm packages:
\`\`\`bash
git clone https://github.com/yourusername/prepai.git
cd prepai
npm install
\`\`\`

## 2️⃣ PostgreSQL Database Setup
PrepAI requires a running PostgreSQL database. You can use a local instance or a free cloud provider like [Supabase](https://supabase.com).

**Local PostgreSQL:**
1. Open pgAdmin or your terminal.
2. Create a new database:
\`\`\`sql
CREATE DATABASE prepai;
\`\`\`

## 3️⃣ Environment Setup
Copy the production environment template to create your local `.env.local` file:
\`\`\`bash
cp .env.production.example .env.local
\`\`\`

Open `.env.local` and populate the fields:
- `DATABASE_URL`: Set this to your PostgreSQL connection string (e.g., `postgresql://postgres:password@localhost:5432/prepai`).
- `NEXTAUTH_SECRET`: Run `openssl rand -base64 32` in your terminal and paste the result here.
- `NEXTAUTH_URL`: `http://localhost:3000`
- `OPENAI_API_KEY`: Your OpenAI API Key (required for AI features).
- `UPSTASH_REDIS_*`: (Optional for local dev) If left blank, rate-limiting will gracefully disable itself locally.

## 4️⃣ Prisma ORM Setup
Initialize the database tables and generate the TypeScript client:
\`\`\`bash
# Push the schema to your PostgreSQL database
npx prisma db push

# Generate the Prisma Client
npx prisma generate
\`\`\`

## 5️⃣ Running Locally
Start the Next.js development server:
\`\`\`bash
npm run dev
\`\`\`
The application will be available at [http://localhost:3000](http://localhost:3000).

## 🛠️ Troubleshooting

- **`pdf-parse` / DOMMatrix Errors**: If the server crashes on boot with `DOMMatrix is not defined`, ensure you are using the latest `main` branch. This was an SSR bug that has been patched using dynamic imports.
- **Database Connection Error (P1001)**: Verify your `DATABASE_URL` is correct and the PostgreSQL service is running on your machine.
- **API Returns 429 Too Many Requests**: You have configured Upstash Redis, but you have hit the rate limit. Wait 10 seconds (or 15 minutes for auth routes) for the sliding window to reset.
- **Unauthorized (401) on API calls**: Ensure you are logged into the platform. You cannot test backend `/api/` endpoints directly in the browser URL bar without an active NextAuth session.
