// ─── Application Constants ──────────────────────────────────────

export const APP_NAME = 'PrepAI';

// ─── File Upload ────────────────────────────────────────────────
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

// ─── Interview ──────────────────────────────────────────────────
export const INTERVIEW_TYPES = [
  {
    value: 'BEHAVIORAL',
    label: 'Behavioral',
    icon: 'Users',
    description: 'Situational & behavioral questions',
  },
  {
    value: 'TECHNICAL',
    label: 'Technical',
    icon: 'Code',
    description: 'Technical knowledge & problem-solving',
  },
  {
    value: 'SYSTEM_DESIGN',
    label: 'System Design',
    icon: 'Network',
    description: 'Architecture & scalability',
  },
  { value: 'HR', label: 'HR Round', icon: 'Briefcase', description: 'Culture fit & expectations' },
  { value: 'MIXED', label: 'Mixed', icon: 'Shuffle', description: 'Combination of all types' },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: 'EASY', label: 'Easy', color: 'text-emerald-500' },
  { value: 'MEDIUM', label: 'Medium', color: 'text-amber-500' },
  { value: 'HARD', label: 'Hard', color: 'text-orange-500' },
  { value: 'EXPERT', label: 'Expert', color: 'text-red-500' },
] as const;

export const DEFAULT_INTERVIEW_DURATION = 30 * 60; // 30 minutes in seconds

// ─── Coding ─────────────────────────────────────────────────────
export const SUPPORTED_LANGUAGES = [
  { value: 'python', label: 'Python', monacoId: 'python' },
  { value: 'javascript', label: 'JavaScript', monacoId: 'javascript' },
  { value: 'typescript', label: 'TypeScript', monacoId: 'typescript' },
  { value: 'java', label: 'Java', monacoId: 'java' },
  { value: 'cpp', label: 'C++', monacoId: 'cpp' },
  { value: 'go', label: 'Go', monacoId: 'go' },
] as const;

export const CODING_CATEGORIES = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stacks',
  'Queues',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Sorting',
  'Searching',
  'Recursion',
  'Math',
  'Bit Manipulation',
  'Greedy',
  'Backtracking',
] as const;

// ─── Pagination ─────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// ─── Rate Limiting ──────────────────────────────────────────────
export const RATE_LIMITS = {
  api: { requests: 100, window: 60 }, // 100 req/min
  ai: { requests: 20, window: 60 }, // 20 req/min for AI endpoints
  auth: { requests: 10, window: 60 }, // 10 req/min for auth
  upload: { requests: 5, window: 60 }, // 5 uploads/min
} as const;
