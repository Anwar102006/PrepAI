# API Documentation

All PrepAI backend endpoints are natively built using Next.js App Router Route Handlers.

---

## Global Requirements
- **Authentication**: All endpoints (except Auth) require an active NextAuth session cookie.
- **Rate Limiting**: All endpoints are protected by Upstash Redis (Sliding Window Algorithm).

---

## 1. Authentication

### `POST /api/auth/register`
Creates a new user account in the database.
- **Auth Required**: No
- **Rate Limit**: 5 requests per 15 minutes per IP.
- **Request Body**:
  \`\`\`json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  \`\`\`
- **Success Response (201 Created)**:
  \`\`\`json
  {
    "message": "User created successfully",
    "user": { "id": "cuid...", "email": "john@example.com" }
  }
  \`\`\`
- **Error Responses**:
  - `400 Bad Request`: Email/password missing.
  - `409 Conflict`: User already exists.
  - `429 Too Many Requests`: Rate limit exceeded.

---

## 2. Resume Analyzer

### `POST /api/resume/analyze`
Accepts a PDF file, extracts the text using `pdf-parse`, and utilizes OpenAI `gpt-4o` to generate an ATS optimization report.
- **Auth Required**: Yes (User)
- **Rate Limit**: 10 requests per 10 seconds per IP.
- **Request Body**: `multipart/form-data`
  - `file`: The PDF file buffer (Max 5MB).
- **Success Response (200 OK)**:
  \`\`\`json
  {
    "score": 85,
    "issues": ["Formatting error on page 1"],
    "identifiedSkills": ["React", "TypeScript"],
    "recommendedSkills": ["Docker", "AWS"],
    "actionPlan": ["Add quantifiable metrics to experience 1"]
  }
  \`\`\`
- **Error Responses**:
  - `400 Bad Request`: No file provided, non-PDF file, or file exceeds 5MB.
  - `401 Unauthorized`: No active session.
  - `500 Internal Server Error`: Failed to parse JSON from OpenAI.

---

## 3. Coding Execution

### `POST /api/coding/execute`
Securely executes source code against the Piston API and generates an AI review for time/space complexity.
- **Auth Required**: Yes (User)
- **Rate Limit**: 10 requests per 10 seconds per IP.
- **Request Body**:
  \`\`\`json
  {
    "language": "python",
    "code": "print('Hello World')"
  }
  \`\`\`
- **Success Response (200 OK)**:
  \`\`\`json
  {
    "id": "code_submission_cuid",
    "output": "Hello World\n",
    "error": "",
    "review": {
      "score": 100,
      "complexity": { "time": "O(1)", "space": "O(1)" },
      "review": {
        "positives": ["Clean syntax"],
        "issues": [],
        "improvements": []
      },
      "optimizedCode": "print('Hello World')"
    }
  }
  \`\`\`
- **Error Responses**:
  - `400 Bad Request`: Missing language or code.
  - `401 Unauthorized`: No active session.

---

## 4. Admin Panel

### `GET /api/admin/stats`
Retrieves aggregated platform usage statistics for the admin dashboard.
- **Auth Required**: Yes (Role: `ADMIN` only)
- **Request Body**: None
- **Success Response (200 OK)**:
  \`\`\`json
  {
    "stats": {
      "totalUsers": 150,
      "totalInterviews": 45,
      "totalMockSessions": 120,
      "totalCodeSubmissions": 350
    },
    "recentUsers": [...],
    "usageData": [...]
  }
  \`\`\`
- **Error Responses**:
  - `401 Unauthorized`: No session, or session role is not `ADMIN`.
