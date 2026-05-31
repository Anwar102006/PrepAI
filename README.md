# PrepAI — AI-Powered Interview Preparation Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)

**Master your next interview with AI-powered mock interviews, resume analysis, and coding challenges.**

</div>

---

## ✨ Features

- 🎤 **AI Mock Interviews** — Realistic interview simulations with GPT-4o
- 📄 **Resume Analyzer** — ATS scoring, content quality, and improvement suggestions
- 💻 **Coding Challenges** — LeetCode-style problems with sandboxed execution
- 📊 **AI Feedback** — Detailed performance analysis with action items
- 📈 **Analytics Dashboard** — Track progress with charts and heatmaps
- 🛡️ **Admin Panel** — Manage users, questions, and platform settings

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL 16 |
| ORM | Prisma 6 |
| Auth | NextAuth.js v5 |
| AI | OpenAI GPT-4o |
| Cache | Redis 7 |
| Storage | S3 / MinIO |
| Container | Docker Compose |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm 10+

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-org/prepai.git
cd prepai

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start infrastructure (PostgreSQL, Redis, MinIO)
docker compose -f .docker/docker-compose.yml up -d db redis minio

# 4. Install dependencies
npm install

# 5. Generate Prisma client & run migrations
npx prisma generate
npx prisma db push

# 6. Seed the database
npx prisma db seed

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Docker (Full Stack)

```bash
# Start everything (app + PostgreSQL + Redis + MinIO)
docker compose -f .docker/docker-compose.yml up --build
```

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router (pages & API routes)
│   ├── (auth)/       # Auth pages (login, register)
│   ├── (dashboard)/  # Authenticated pages
│   ├── (admin)/      # Admin panel
│   └── api/          # REST API endpoints
├── components/       # React components
│   ├── ui/           # Design system primitives
│   ├── layout/       # Layout components
│   └── shared/       # Cross-cutting components
├── lib/              # Core libraries & utilities
├── services/         # Business logic layer
├── hooks/            # Custom React hooks
├── stores/           # Client state (Zustand)
├── types/            # TypeScript type definitions
├── prompts/          # AI prompt templates
└── config/           # App configuration
```

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

## 📄 License

MIT
