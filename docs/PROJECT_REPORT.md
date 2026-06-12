# Final Year Project Report
**Project Title**: PrepAI - AI Powered Interview Preparation Platform

---

## 1. Abstract
The highly competitive nature of the modern job market demands rigorous preparation. However, traditional interview preparation methods rely heavily on peer coordination or expensive professional coaching, leaving a massive accessibility gap for students and job seekers. To bridge this gap, we present **PrepAI**, a comprehensive, AI-powered platform designed to democratize interview preparation. Leveraging Large Language Models (LLMs), PrepAI provides real-time behavioral, technical, and HR mock interviews, instantaneous Applicant Tracking System (ATS) resume analysis, and a fully functional multi-language coding sandbox for algorithmic practice. The system generates hyper-personalized feedback and evaluates time/space complexity, empowering candidates to master their interview skills continuously and independently.

## 2. Introduction
Interviewing is an inherently stressful process where performance directly dictates career trajectories. Candidates face three primary hurdles: passing ATS filters with their resumes, demonstrating practical coding skills under pressure, and articulating their experiences fluidly during behavioral rounds. PrepAI addresses these challenges by consolidating the fragmented interview preparation ecosystem into a single, intelligent portal. Using Next.js, PostgreSQL, and the OpenAI API, PrepAI acts as a 24/7 personal technical recruiter, guiding users from the initial resume submission all the way to advanced algorithm execution.

## 3. Problem Statement
Job seekers lack access to instantaneous, objective, and high-quality feedback during their interview preparation journey. Existing solutions are either too expensive (human coaching), lack interactivity (static question banks), or are disconnected (separate tools for resumes vs. coding vs. behavioral). This results in high rejection rates, candidate anxiety, and extended unemployment periods.

## 4. Existing System
Currently, candidates use a mix of fragmented platforms:
1. **LeetCode / HackerRank**: Used for coding practice, but feedback is strictly binary (pass/fail) without holistic architectural or behavioral feedback.
2. **Pramp / Mockingbird**: Peer-to-peer mock interviewing, heavily reliant on scheduling and the technical competence of the paired peer.
3. **Resume Worded / JobScan**: Premium tools for ATS optimization that do not integrate with the candidate's actual interview practice.

## 5. Limitations of Existing System
- **High Cost & Scheduling Friction**: Human-led platforms are expensive and subject to availability constraints.
- **Binary Code Execution**: Existing coding sandboxes do not analyze the *quality* of the code (Big-O complexity, variable naming, readability) unless reviewed by a human.
- **Fragmented User Journey**: Users must stitch together multiple disparate platforms, losing aggregated analytics on their overall readiness.
- **Static Feedback**: Feedback is often pre-written or relies on generic templates rather than adapting dynamically to the user's specific weaknesses.

## 6. Proposed System
The proposed system, **PrepAI**, replaces the fragmented ecosystem with a unified, AI-driven monolith. It allows candidates to:
- Upload resumes and immediately receive formatting corrections and ATS keyword gap analyses.
- Engage in conversational mock interviews where the AI adapts questions based on the candidate's previous answers.
- Write, execute, and analyze source code in multiple languages within the browser, receiving immediate AI-generated feedback on algorithmic complexity and optimizations.

## 7. Objectives
1. To develop an interactive, responsive web application that centralizes interview preparation.
2. To integrate a natural language processing model capable of conducting dynamic interviews and generating structured, objective feedback.
3. To engineer a secure backend capable of executing user-submitted code in multiple languages.
4. To implement data visualization dashboards that track user progress and skill acquisition over time.

## 8. Functional Requirements
- **User Authentication**: Secure signup, login, and OAuth (Google/GitHub) integration.
- **Resume Analyzer**: The system must extract text from uploaded PDFs and generate an ATS score out of 100 with an actionable improvement plan.
- **Mock Interviews**: The system must simulate HR, Behavioral, and Technical interviews with contextual conversational memory.
- **Code Execution**: The platform must execute JavaScript, Python, Java, and C++ code securely and return stdout/stderr.
- **AI Code Review**: The system must generate Space/Time complexity evaluations and refactoring suggestions based on code execution output.
- **Admin Panel**: Authorized users must be able to view global platform metrics and user tables.

## 9. Non-Functional Requirements
- **Performance**: API response times (excluding AI generation) must remain under 500ms.
- **Security**: All API routes must implement Sliding Window Rate Limiting to prevent DDoS and API token exhaustion. User passwords must be salted and hashed via bcrypt.
- **Scalability**: The application must be stateless at the application layer to support horizontal scaling on serverless edge networks.
- **Responsiveness**: The UI must operate flawlessly across mobile, tablet, and desktop viewports.

## 10. System Architecture
PrepAI follows a Serverless Monolithic Architecture:
1. **Client Layer**: Next.js App Router (React 19) rendering Server and Client components.
2. **Edge / Middleware Layer**: NextAuth handles secure session validation. Upstash Redis handles API rate limiting.
3. **Application API Layer**: Next.js Route Handlers securely process business logic and interact with external APIs (Piston for code execution, OpenAI for LLM inference).
4. **Data Layer**: Prisma ORM manages schema migrations and securely interfaces with the PostgreSQL relational database.

## 11. Module Descriptions
1. **Authentication Module**: Manages user sessions, password hashing, and OAuth bindings.
2. **Dashboard & Analytics Module**: Uses `recharts` to render visual progress charts based on historical data.
3. **AI Resume Parser Module**: Uses `pdf-parse` in memory to extract text, passing it to the AI for ATS grading.
4. **Interview Chat Module**: Implements the Vercel AI SDK to stream conversational history and manage the active interview context.
5. **Coding Sandbox Module**: Integrates `@monaco-editor/react` for the UI and the Piston API for secure, multi-language remote code execution.

## 12. Database Design Explanation
The database leverages **PostgreSQL** to maintain strict referential integrity.
- **User**: Core entity storing authentication details.
- **CodeSubmission**: Tracks `language`, `code`, `stdout`, and `score` for algorithmic practice.
- **MockSession & MockSessionMessage**: A 1-to-Many relationship maintaining the state and exact transcript of every interview.
- **ResumeAnalysis**: Persists the JSON feedback generated for resumes so users can review historical ATS scores.
- **UserProgress**: An aggregation table maintaining running tallies of scores to optimize dashboard rendering performance.

## 13. Technology Stack Justification
- **Next.js (App Router)**: Chosen for its superior SEO capabilities, built-in API routing, and Server Component architecture which reduces client-side JavaScript bundles.
- **PostgreSQL**: Chosen for its robust relational data integrity and ACID compliance.
- **Prisma ORM**: Provides strict TypeScript definitions for database queries, preventing SQL injection and reducing runtime errors.
- **OpenAI (gpt-4o)**: Chosen for its industry-leading natural language understanding and ability to consistently output structured JSON via strict prompt engineering.
- **TailwindCSS & Framer Motion**: Ensures the application looks professional, modern, and highly interactive with minimal CSS bloat.

## 14. Advantages
- **Cost-Effective**: Replaces thousands of dollars in coaching fees with an accessible software solution.
- **Immediate Feedback**: Candidates no longer wait for human reviews; feedback is generated in seconds.
- **Holistic Preparation**: Combines coding, conversational, and resume prep under a single interface.
- **Objective Grading**: Removes human bias from the interview grading process.

## 15. Future Scope
- **WebRTC Audio/Video**: Integrating speech-to-text models to allow users to answer interview questions verbally via their microphone.
- **Peer-to-Peer System**: Expanding the platform to allow users to optionally connect with human peers, using the AI strictly as an objective moderator.
- **Corporate Portal**: Allowing universities or corporations to track the interview readiness of their student cohorts/employees.

## 16. Conclusion
The PrepAI platform successfully demonstrates how modern artificial intelligence can be harnessed to democratize professional development. By meticulously engineering a secure, performant, and highly interactive application, we have provided job seekers with a powerful tool to overcome the daunting challenges of modern interviewing. PrepAI stands as a complete, production-ready solution that bridges the gap between candidate potential and interview success.
