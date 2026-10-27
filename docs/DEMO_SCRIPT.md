# PrepAI - Project Demonstration Script

This script is designed to be followed during the live project demonstration for university examiners. It ensures a smooth flow showcasing all core features.

---

### Phase 1: Introduction & Authentication (2 Minutes)

**Speaker:** "Good morning/afternoon. Today I will be demonstrating PrepAI, our AI-powered interview preparation platform. I'll start by showing you our authentication flow."

- **Action:** Open the web app. Show the landing page.
- **Action:** Click "Get Started" and navigate to `/register`.
- **Action:** Create a new test user (`examiner@test.com`).
- **Speaker:** "We use NextAuth to securely hash credentials using bcrypt and store them in our PostgreSQL database. Once logged in, we are redirected to the Dashboard."

### Phase 2: The Dashboard & Analytics (1 Minute)

**Speaker:** "This is the central dashboard. Currently, all metrics are zero. As the user completes interviews and coding challenges, this dashboard will populate with their historical performance metrics, pulled directly from our database using highly optimized server-side rendering."

- **Action:** Briefly hover over the empty charts and highlight the modern UI animations powered by Framer Motion.

### Phase 3: AI Resume Analyzer (3 Minutes)

**Speaker:** "The first step of any job application is the resume. Let's see how PrepAI helps optimize it."

- **Action:** Navigate to the "Resume Analyzer" tab.
- **Action:** Upload a sample PDF resume.
- **Speaker:** "When I upload this PDF, the server extracts the text in-memory using `pdf-parse`. It then sends that text to OpenAI with a strict system prompt to act as an Applicant Tracking System (ATS). Watch how fast it responds."
- **Action:** Wait for the results. Scroll through the generated Score, Skill Gaps, and Actionable feedback.
- **Speaker:** "As you can see, the AI didn't just extract text; it returned a structured JSON object containing an ATS score and exact formatting improvements."

### Phase 4: Conversational AI Mock Interview (3 Minutes)

**Speaker:** "Now that our resume is ready, let's practice for the actual interview."

- **Action:** Navigate to the "Mock Interviews" tab. Click "Start New Session". Select "Behavioral".
- **Speaker:** "I am starting a behavioral interview. The system has initialized a new session in the database."
- **Action:** Let the AI ask the first question. Type a brief response.
- **Speaker:** "Notice how fast the AI responds. We use the Vercel AI SDK to stream the chat context. Every message I send, and every AI response, is securely saved to PostgreSQL so the AI maintains perfect conversational memory."

### Phase 5: Multi-Language Coding Sandbox (3 Minutes)

**Speaker:** "Finally, let's look at the technical interview module."

- **Action:** Navigate to the "Coding Practice" tab.
- **Speaker:** "This is a full-fledged IDE built into the browser using the Monaco Editor—the exact same engine that powers VS Code."
- **Action:** Write a simple Python function (e.g., a simple loop to reverse a string or calculate a factorial) but make it slightly inefficient.
- **Action:** Click "Run & Analyze".
- **Speaker:** "Right now, two things are happening. First, the code is sent to the Piston API, which executes the code securely inside an isolated Docker container and returns the output. Second, we send the code to OpenAI for a complexity review."
- **Action:** Show the console output. Then, highlight the AI feedback showing the Big-O Time/Space complexity and the suggested code improvements.

### Phase 6: Security & Admin Dashboard (2 Minutes)

**Speaker:** "Before we conclude, I want to emphasize security."

- **Action:** Open a new incognito window and try to navigate to `/dashboard` or `/admin`. Show how it strictly redirects to `/login`.
- **Speaker:** "Our platform uses Edge Middleware to prevent unauthorized access. Additionally, every API route is protected by Upstash Redis. If a bot tries to spam our AI routes, they are immediately blocked with a 429 Too Many Requests error."
- **Action:** Log in using the Admin account. Navigate to `/admin`.
- **Speaker:** "Here is the Admin panel, restricted strictly to accounts with the 'ADMIN' role in the database. It provides global telemetry on how many users and interviews the platform is currently processing."

### Phase 7: Conclusion

**Speaker:** "In conclusion, PrepAI consolidates the entire interview preparation journey into a single, highly performant, and secure monolithic application. Thank you for your time. I am now open to any questions."
