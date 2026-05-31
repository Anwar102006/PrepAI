// ─── Zod Validation Schemas ─────────────────────────────────────
// Shared validation schemas for both client and server

import { z } from 'zod';

// ─── Auth Schemas ───────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// ─── Interview Schemas ──────────────────────────────────────────

export const createInterviewSchema = z.object({
  type: z.enum(['BEHAVIORAL', 'TECHNICAL', 'SYSTEM_DESIGN', 'HR', 'MIXED']),
  role: z.string().min(2, 'Role is required').max(100),
  company: z.string().max(100).optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']).default('MEDIUM'),
});

export const interviewMessageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty').max(5000),
});

// ─── Resume Schemas ─────────────────────────────────────────────

export const resumeUploadSchema = z.object({
  fileName: z.string().min(1),
  fileSize: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),
  mimeType: z.enum([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]),
});

// ─── Coding Schemas ─────────────────────────────────────────────

export const codeSubmissionSchema = z.object({
  language: z.enum(['python', 'javascript', 'typescript', 'java', 'cpp', 'go']),
  code: z.string().min(1, 'Code cannot be empty').max(50000),
});

// ─── Admin Schemas ──────────────────────────────────────────────

export const updateUserRoleSchema = z.object({
  role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']),
});

export const createQuestionBankSchema = z.object({
  title: z.string().min(2).max(200),
  type: z.enum(['BEHAVIORAL', 'TECHNICAL', 'SYSTEM_DESIGN', 'HR', 'MIXED']),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  questions: z.array(
    z.object({
      q: z.string().min(5),
      category: z.string().min(1),
    })
  ),
});

export const createCodingChallengeSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(100),
  description: z.string().min(10),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']),
  category: z.string().min(1),
  tags: z.array(z.string()),
  starterCode: z.record(z.string(), z.string()),
  solution: z.string().optional(),
  hints: z.array(z.string()),
  timeLimit: z.number().min(5).max(120).default(30),
  testCases: z.array(
    z.object({
      input: z.string(),
      expected: z.string(),
      isHidden: z.boolean().default(false),
    })
  ),
});

// ─── Pagination Schema ──────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(50).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ─── Type Exports ───────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
export type InterviewMessageInput = z.infer<typeof interviewMessageSchema>;
export type CodeSubmissionInput = z.infer<typeof codeSubmissionSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
