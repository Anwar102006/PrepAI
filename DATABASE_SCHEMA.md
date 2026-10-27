# Database Schema Documentation

PrepAI uses a relational **PostgreSQL** database managed by **Prisma ORM**. Below is the documentation for all primary models.

---

## `User`

Stores the primary identity and role of every user on the platform.

- **Primary Key**: `id` (String/CUID)
- **Fields**: `email` (Unique), `name`, `password`, `image`, `role` (Default: "USER")
- **Relationships**:
  - 1-to-Many: `Account`, `Session`, `Interview`, `MockSession`, `ResumeAnalysis`, `CodeSubmission`
  - 1-to-1: `UserProgress`
- **Purpose**: Central node connecting all authentication, telemetry, and platform activity data.

---

## `CodeSubmission`

Stores historical data regarding executed code in the coding sandbox.

- **Primary Key**: `id` (String/CUID)
- **Foreign Key**: `userId` (References `User.id`)
- **Fields**: `language`, `code` (Text), `output`, `error`, `aiFeedback`, `score`, `createdAt`
- **Purpose**: Allows users to review their past coding solutions and tracks the AI’s grading mechanism for platform analytics.

---

## `ResumeAnalysis`

Stores the AI-generated feedback reports for uploaded PDF resumes.

- **Primary Key**: `id` (String/CUID)
- **Foreign Key**: `userId` (References `User.id`)
- **Fields**: `resumeUrl`, `score`, `suggestions` (Stringified JSON), `createdAt`
- **Purpose**: Persists historical resume data so users do not need to re-upload PDFs to view previous ATS optimizations.

---

## `MockSession`

Records a simulated AI interview session.

- **Primary Key**: `id` (String/CUID)
- **Foreign Key**: `userId` (References `User.id`)
- **Fields**: `type` (TECHNICAL, HR, BEHAVIORAL), `difficulty`, `status`, `score`, `feedback`, `createdAt`
- **Relationships**:
  - 1-to-Many: `MockSessionMessage` (Chat history), `MockSessionQuestion`
- **Purpose**: Groups together chat interactions and scoring data for a singular interview event.

---

## `MockSessionMessage`

Stores the turn-by-turn chat transcripts between the user and the AI.

- **Primary Key**: `id` (String/CUID)
- **Foreign Key**: `mockSessionId` (References `MockSession.id`)
- **Fields**: `role` ("user", "assistant", "system"), `content` (Text), `createdAt`
- **Purpose**: Powers the continuous contextual memory required by OpenAI to carry on a fluid interview conversation.

---

## `UserProgress`

Maintains an aggregated dashboard of the user's historical performance.

- **Primary Key**: `id` (String/CUID)
- **Foreign Key**: `userId` (References `User.id`) - Unique
- **Fields**: `interviewsCount`, `averageScore`, `lastActive`
- **Purpose**: Prevents expensive dynamic aggregations on the dashboard by maintaining an indexed, running tally of user performance.

---

## Auth.js Internal Tables

The schema also includes mandatory tables required by NextAuth (v5) for credential and OAuth management:

- **`Account`**: Stores OAuth provider links (e.g., Google, GitHub).
- **`Session`**: Stores active JSON Web Token (JWT) equivalents if using database sessions.
- **`VerificationToken`**: Stores ephemeral tokens used for magic-link logins or password resets.
