// ─── TypeScript Type Definitions ────────────────────────────────
// API request/response types

// ─── Generic API Response ───────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ─── Auth Types ─────────────────────────────────────────────────

export interface UserSession {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

// ─── Interview Types ────────────────────────────────────────────

export interface InterviewSummary {
  id: string;
  type: string;
  role: string;
  company: string | null;
  difficulty: string;
  status: string;
  startedAt: string;
  completedAt: string | null;
  duration: number | null;
  overallScore: number | null;
}

export interface InterviewDetail extends InterviewSummary {
  messages: InterviewMessageData[];
  feedback: FeedbackData | null;
}

export interface InterviewMessageData {
  id: string;
  role: 'USER' | 'ASSISTANT' | 'SYSTEM';
  content: string;
  audioUrl: string | null;
  timestamp: string;
}

// ─── Resume Types ───────────────────────────────────────────────

export interface ResumeData {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  createdAt: string;
  analysis: ResumeAnalysisData | null;
}

export interface ResumeAnalysisData {
  id: string;
  overallScore: number;
  atsScore: number;
  contentScore: number;
  formatScore: number;
  skillsFound: string[];
  suggestions: Record<string, string[]>;
  strengths: string[];
  weaknesses: string[];
  rawAnalysis: string;
  analyzedAt: string;
}

// ─── Coding Types ───────────────────────────────────────────────

export interface CodingChallengeData {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  starterCode: Record<string, string>;
  hints: string[];
  timeLimit: number;
}

export interface SubmissionData {
  id: string;
  language: string;
  code: string;
  status: string;
  runtime: number | null;
  memory: number | null;
  score: number | null;
  aiReview: string | null;
  submittedAt: string;
  challenge: { title: string; slug: string };
  testResults: TestResultData[];
}

export interface TestResultData {
  id: string;
  passed: boolean;
  actualOutput: string | null;
  runtime: number | null;
  error: string | null;
}

// ─── Feedback Types ─────────────────────────────────────────────

export interface FeedbackData {
  id: string;
  overallScore: number;
  categories: Record<string, number>;
  strengths: string[];
  improvements: string[];
  detailedNotes: string;
  actionItems: string[];
  createdAt: string;
}

// ─── Analytics Types ────────────────────────────────────────────

export interface AnalyticsOverview {
  totalInterviews: number;
  avgScore: number;
  totalCodingSolved: number;
  streakDays: number;
  lastActiveAt: string;
}

export interface SkillScore {
  skill: string;
  score: number;
}

export interface ActivityData {
  date: string;
  count: number;
}

export interface ScoreTrendData {
  date: string;
  score: number;
  type: string;
}
