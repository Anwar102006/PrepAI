# PowerPoint Presentation Structure (15 Slides)

This document outlines the content for a professional 15-slide presentation for the final year project defense.

---

### Slide 1: Title Slide

- **Project Title:** PrepAI - AI Powered Interview Preparation Platform
- **Subtitle:** Comprehensive Mock Interviews, Resume Analytics, and Code Execution
- **Presented By:** [Your Name / Team Members]
- **Guided By:** [Professor/Guide Name]
- **Date:** [Date]

### Slide 2: Introduction

- **What is PrepAI?**
  - A unified, AI-driven portal designed to prepare candidates for modern job interviews.
- **Key Capabilities:**
  - AI Mock Interviews (Conversational AI)
  - ATS Resume Parsing & Scoring
  - Remote Code Execution & Algorithmic Analysis

### Slide 3: Problem Statement

- **Fragmented Tools:** Candidates use separate platforms for coding (LeetCode), resumes (JobScan), and mock interviews (Pramp).
- **High Costs:** Human coaching is expensive and hard to schedule.
- **Lack of Feedback:** Traditional coding sandboxes don't explain _why_ code is slow (Time/Space complexity).

### Slide 4: Objectives

- Centralize the interview preparation journey into a single web application.
- Leverage Large Language Models (LLMs) to provide instant, objective, and personalized feedback.
- Build a highly secure, rate-limited backend capable of executing arbitrary user code safely.

### Slide 5: System Architecture

_(Include a diagram showing the flow between Client -> Next.js Edge -> Database / OpenAI / Piston)_

- **Frontend Layer**: Next.js App Router, React 19, TailwindCSS.
- **API/Edge Layer**: Next.js Route Handlers, Upstash Redis Rate Limiting.
- **Data Layer**: PostgreSQL, Prisma ORM.
- **External Services**: OpenAI API, Piston API.

### Slide 6: Module 1 - Authentication & Security

- NextAuth.js (v5) implementation for secure JWT session management.
- Credential login (bcrypt hashing) and OAuth Providers (Google/GitHub).
- Upstash Redis Sliding-Window algorithm protecting APIs from DDoS.

### Slide 7: Module 2 - AI Resume Analyzer

- **Flow:** User uploads PDF -> `pdf-parse` extracts text -> Sent to OpenAI with strict system prompts.
- **Output:** AI returns structured JSON containing:
  - Overall ATS Score (0-100).
  - Missing keywords and skill gap analysis.
  - Actionable improvement plan.

### Slide 8: Module 3 - AI Mock Interviews

- Simulates Behavioral, HR, and Technical interviews.
- Maintains conversational memory by fetching chat history from PostgreSQL.
- Dynamically adapts subsequent questions based on the candidate's previous responses.

### Slide 9: Module 4 - Multi-Language Coding Sandbox

- UI powered by `@monaco-editor/react` (VS Code engine).
- Sends raw code payloads to the **Piston API** for secure, containerized execution (Python, JS, Java, C++).
- Analyzes the submitted code for Space and Time complexity (Big-O) via OpenAI.

### Slide 10: Module 5 - Admin Dashboard

- Centralized portal protected by Role-Based Access Control (RBAC).
- Analyzes platform-wide telemetry.
- Visualizes aggregated data using `recharts` (Total Users, Code Submissions, Interviews).

### Slide 11: Database Schema (ER Diagram)

_(Insert ER Diagram here)_

- Core Models: `User`, `MockSession`, `MockSessionMessage`, `ResumeAnalysis`, `CodeSubmission`.
- Managed strictly via Prisma ORM for relational integrity.

### Slide 12: Technology Stack Summary

- **Frontend:** Next.js, React, TailwindCSS, Framer Motion.
- **Backend:** Node.js, Prisma ORM.
- **Database:** PostgreSQL.
- **APIs:** OpenAI (`gpt-4o`), Piston (Execution), Upstash (Redis).

### Slide 13: Advantages & Impact

- **Accessibility:** 24/7 availability with zero scheduling friction.
- **Cost-Reduction:** Replaces expensive human career coaches.
- **Objective Evaluation:** Removes human bias from interview grading.

### Slide 14: Future Enhancements

- Integration of WebRTC for verbal video-based mock interviews.
- Cloud storage integration (AWS S3) for persistent resume hosting.
- B2B portal for universities to track their students' readiness metrics.

### Slide 15: Conclusion & Q&A

- PrepAI successfully demonstrates how AI can democratize professional development.
- **Thank You!**
- **Questions?**
