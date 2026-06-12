# PrepAI: The Ultimate AI Mock Interview & Preparation Platform 🚀

![PrepAI Banner](https://via.placeholder.com/1200x400/0a0a0f/3b82f6?text=PrepAI:+Master+Your+Next+Interview)

## 📌 Overview
**PrepAI** is a comprehensive, production-ready AI-powered platform designed to help job seekers, students, and professionals master their technical and behavioral interviews. By leveraging advanced Large Language Models (OpenAI GPT-4o), PrepAI provides real-time mock interviews, instant resume analysis, and a fully functional multi-language coding execution environment.

## ❓ Problem Statement
Job interviews are stressful, and candidates often lack access to personalized, high-quality feedback. Traditional mock interviews require coordinating with peers or hiring expensive coaches. Furthermore, Applicant Tracking Systems (ATS) reject thousands of highly qualified candidates simply due to poor resume formatting or keyword gaps. 
**PrepAI solves this by providing instant, AI-driven, and hyper-personalized feedback for both resumes and live interviews.**

## ✨ Key Features
- **🤖 AI Mock Interviews**: Real-time behavioral, HR, and technical interviews simulated by an AI persona that asks dynamic questions and grades responses.
- **📄 AI Resume Analyzer**: Instantly parse PDF resumes directly in the browser to receive an ATS score, formatting checks, and missing keyword identification.
- **💻 Coding Sandbox**: A fully integrated Monaco Editor with a secure execution backend (Piston API) supporting Python, JavaScript, Java, and C++. Includes AI-powered Time/Space complexity analysis and code refactoring suggestions.
- **📊 Interactive Dashboard**: A highly responsive, visually stunning analytics dashboard (built with Recharts and Framer Motion) to track progress over time.
- **🛡️ Admin Panel**: A dedicated, role-based admin panel to monitor platform usage, manage users, and view real-time system metrics.

## 📸 Screenshots
*(Add your project screenshots here)*
- `[/public/screenshots/dashboard.png]` - Analytics Dashboard
- `[/public/screenshots/resume.png]` - AI Resume Analyzer
- `[/public/screenshots/coding.png]` - Coding Interview Environment

## 🏗️ Architecture Overview
PrepAI is built on a modern, decoupled monolithic architecture using **Next.js 16 (App Router)**.
- **Frontend**: React 19, TailwindCSS, Framer Motion, Recharts.
- **Backend API**: Next.js Edge & Node Runtimes, heavily protected by Upstash Redis Rate Limiting.
- **Database**: PostgreSQL managed by Prisma ORM.
- **Authentication**: NextAuth.js v5 providing credential and OAuth flows.
- **AI Engine**: Vercel AI SDK communicating with OpenAI (`gpt-4o`).

## 🛠️ Tech Stack
| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js (App Router), React, TailwindCSS, Lucide Icons, Framer Motion |
| **Backend** | Next.js Route Handlers, Node.js, `pdf-parse` |
| **Database** | PostgreSQL, Prisma ORM |
| **Authentication** | NextAuth.js (v5) / Auth.js |
| **AI / Execution** | OpenAI (`gpt-4o`), Vercel AI SDK, Piston API |
| **Infrastructure** | Vercel (Hosting), Upstash (Redis), Docker |

## 📂 Folder Structure
\`\`\`text
prepai/
├── prisma/               # Database schema and migrations
├── src/
│   ├── app/              # Next.js App Router (Pages, Layouts, APIs)
│   │   ├── admin/        # Admin Dashboard Routes
│   │   ├── api/          # Backend REST Endpoints
│   │   ├── dashboard/    # User Dashboard Routes
│   │   └── (auth)/       # Public/Authentication Routes
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities (Prisma client, Logger, Prompts)
│   └── proxy.ts          # Edge Middleware (Auth & Routing)
├── public/               # Static assets
└── next.config.ts        # Next.js configuration & security headers
\`\`\`

## 🚀 Quick Start
Please refer to [INSTALLATION.md](./INSTALLATION.md) for detailed local setup instructions.

## 🔐 Environment Variables
PrepAI requires several API keys (Database, NextAuth, OpenAI, Upstash Redis). 
Please see `.env.production.example` for the full required configuration list.

## 📖 Usage Guide
1. **Register/Login**: Create a new account.
2. **Dashboard**: View your overall metrics.
3. **Resume Analyzer**: Navigate to the Resume tab, upload a PDF, and review the AI-generated ATS action plan.
4. **Mock Interview**: Start a new behavioral session, answer the questions, and receive your final grade and feedback report.
5. **Coding Practice**: Select a language, write your algorithm, hit 'Run & Analyze', and review the console output alongside the AI's Space/Time complexity grade.

## 🌍 Deployment
PrepAI is fully optimized for Docker and Vercel deployments. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 🔮 Future Scope
- **WebRTC Video Interviews**: Integrating WebRTC and AI voice-to-text models for real-time verbal interview simulations.
- **Real-time Streaming**: Utilizing Vercel AI SDK's `streamText` to deliver character-by-character feedback instantly.
- **S3 Bucket Integration**: Persisting user resumes to AWS S3 for historical tracking.
