# Project Viva Questions & Answers

This document contains 25 common Viva questions, model answers, and potential examiner questions for the PrepAI project defense.

---

## Technical & Architecture Questions

**1. What is the core objective of your project?**
**Answer:** The objective is to build a unified, AI-driven platform that helps job seekers prepare for interviews by providing real-time mock interviews, ATS resume analysis, and an interactive coding sandbox with AI code review.

**2. Why did you choose Next.js over traditional React?**
**Answer:** Next.js provides Server-Side Rendering (SSR) and Route Handlers (backend API capabilities) out of the box. This allowed us to build a full-stack application within a single repository, improving SEO and reducing initial page load times through Server Components.

**3. What database did you use and why?**
**Answer:** We used PostgreSQL managed by Prisma ORM. We chose it because of its robust relational integrity. Since our app involves complex relationships (e.g., Users have many MockSessions, MockSessions have many Messages), a relational database ensures data consistency.

**4. How does the AI evaluate the resume?**
**Answer:** We extract text from the uploaded PDF using `pdf-parse`. We then securely send this text to the OpenAI `gpt-4o` model using a highly specific system prompt that forces the AI to evaluate the text against standard ATS algorithms, returning structured JSON containing the score and skill gaps.

**5. How did you securely execute user code?**
**Answer:** Executing arbitrary user code locally is extremely dangerous. We integrated the **Piston API**, which acts as a secure sandbox. It takes the code payload, runs it inside isolated, ephemeral Docker containers, and returns only the standard output and error strings.

**6. What is Prisma, and why not use raw SQL?**
**Answer:** Prisma is an Object-Relational Mapper (ORM). We used it because it generates strict TypeScript types based on our schema. This prevents SQL injection attacks and catches database errors at compile-time rather than run-time.

**7. How do you handle authentication?**
**Answer:** We implemented NextAuth.js (v5). It securely handles credential-based login (using bcrypt for password hashing) and OAuth (Google/GitHub integration) while managing encrypted JWT session cookies.

**8. Explain the concept of Rate Limiting in your project.**
**Answer:** To prevent DDoS attacks or malicious users exhausting our OpenAI API credits, we implemented `@upstash/ratelimit` with a sliding window algorithm. It restricts users to a specific number of requests (e.g., 10 requests per 10 seconds) based on their IP address.

**9. What is a Server Component in Next.js?**
**Answer:** Server Components render entirely on the server and do not ship their JavaScript to the browser. We used them to fetch database records directly (like the dashboard statistics) without needing to create separate API endpoints, making the app much faster.

**10. How did you achieve the UI design and animations?**
**Answer:** We used TailwindCSS for rapid, utility-first styling and Framer Motion for complex mount/unmount animations, providing a premium, app-like user experience.

---

## Database & Backend Questions

**11. Explain the relationship between MockSession and MockSessionMessage.**
**Answer:** It is a One-to-Many relationship. A single `MockSession` represents one interview event. It contains multiple `MockSessionMessage` records, representing the back-and-forth chat history between the user and the AI.

**12. Why did you use bcrypt?**
**Answer:** We use bcrypt to salt and hash user passwords before storing them in PostgreSQL. This ensures that even if the database is compromised, the plaintext passwords cannot be recovered.

**13. What happens if the OpenAI API goes down?**
**Answer:** We wrapped our external API calls in `try/catch` blocks. If OpenAI times out, the backend gracefully catches the error, logs it using our structured logger, and returns a user-friendly 500 error to the frontend without crashing the Node.js server.

**14. What is Edge middleware in Next.js?**
**Answer:** Middleware runs before a request completes. In our app, `proxy.ts` acts as middleware. It checks if the user has a valid session token before allowing them to access protected routes like `/dashboard`.

**15. How did you optimize the database queries for the Admin dashboard?**
**Answer:** Instead of awaiting five separate database `count()` queries sequentially, we used `Promise.all()`. This executes all database queries concurrently, significantly reducing the API response time.

---

## AI & Prompt Engineering Questions

**16. What is the Vercel AI SDK?**
**Answer:** It is a library that standardizes how we communicate with LLMs. We used it to handle the streaming of chat messages between the client and OpenAI, making the chat interface feel fast and responsive.

**17. What is "Prompt Engineering" and how did you use it?**
**Answer:** Prompt engineering is the process of crafting instructions for the AI. For the coding module, we wrote a specific prompt instructing the AI to strictly output JSON containing the Space/Time complexity (Big-O notation) and an array of code improvements.

**18. How does the AI maintain conversational memory during the mock interview?**
**Answer:** The AI itself has no memory. On every request, our backend fetches the previous `MockSessionMessage` records from the database and sends the entire chat history back to the AI so it understands the context of the conversation.

**19. What is JSON parsing, and why did you use it for the Resume Analyzer?**
**Answer:** AI typically outputs plain text. We instructed the AI to format its text strictly as JSON. Our backend then uses `JSON.parse()` to convert that string into a JavaScript object so the frontend can render dynamic progress bars and lists based on the data.

---

## Deployment & Security Questions

**20. Where is this application deployed?**
**Answer:** The frontend and serverless APIs are deployed on Vercel, the database is hosted on Supabase (PostgreSQL), and the rate limiter is powered by Upstash Redis.

**21. What does the `next.config.ts` file do in your project?**
**Answer:** It configures the Next.js build process. We used it to inject security headers (like X-Frame-Options to prevent Clickjacking) and to enable `standalone` output mode to optimize our Docker containers.

**22. How did you optimize the deployment size?**
**Answer:** We utilized a multi-stage Dockerfile. It copies only the necessary compiled code into the final container, ignoring raw source files and massive `node_modules` folders, reducing the container size by over 80%.

**23. What is the purpose of the `.env` file?**
**Answer:** It stores sensitive environment variables like API keys and database passwords. This file is excluded from version control (`.gitignore`) to prevent leaking secrets to the public internet.

**24. How did you handle errors in your React components?**
**Answer:** We utilized defensive programming. If an API call fails, the UI sets an error state variable and renders an error toast or message, ensuring the user is informed without the web page crashing (white screen of death).

**25. What was the most challenging bug you fixed?**
**Answer:** We encountered a Server-Side Rendering (SSR) bug where `pdf-parse` tried to access browser Canvas APIs (`DOMMatrix`) during the Next.js build phase. I fixed it by refactoring the API route to use dynamic `require()` imports inside the request handler, completely insulating the build process.

---

## 👨‍🏫 Potential Examiner "Curveball" Questions

**Examiner:** "If 10,000 users upload resumes at the exact same time, your server will crash due to memory limits parsing the PDFs. How do you fix this?"
**Model Answer:** Currently, we parse PDFs in memory (buffers). For a high-scale production system, we would offload this to an asynchronous background worker (like AWS SQS + Lambda) and store the files in an S3 bucket. The user would see a "Processing..." spinner until a WebSocket or polling system informs them the analysis is complete.

**Examiner:** "Why use OpenAI when you could train your own model?"
**Model Answer:** Training a custom model with the capability of `gpt-4o` requires millions of dollars in compute (GPUs) and massive datasets. Using an API allows us to leverage state-of-the-art models cost-effectively, allowing us to focus on the platform's architecture and user experience.

**Examiner:** "How do you ensure the AI doesn't give wrong answers (hallucinations) during technical code reviews?"
**Model Answer:** While we cannot 100% prevent hallucinations, we mitigate them via "few-shot prompting"—providing the AI with examples of correct code reviews in the system prompt. We also primarily grade the user based on the deterministic output of the Piston API (did the code compile and run successfully?), using the AI only as a secondary mentor.
