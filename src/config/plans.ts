// ─── Subscription Plan Definitions ──────────────────────────────

export const plans = {
  FREE: {
    name: 'Free',
    description: 'Get started with basic features',
    price: 0,
    stripePriceId: null,
    limits: {
      interviewsPerMonth: 3,
      resumeAnalysesPerMonth: 1,
      codingChallenges: 10,
      feedbackDepth: 'basic' as const,
      voiceInterviews: false,
      analyticsHistoryDays: 30,
      prioritySupport: false,
    },
    features: [
      '3 mock interviews/month',
      '1 resume analysis/month',
      '10 coding challenges',
      'Basic AI feedback',
      '30-day analytics history',
    ],
  },
  PRO: {
    name: 'Pro',
    description: 'Everything you need to ace your interviews',
    price: 19,
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || null,
    limits: {
      interviewsPerMonth: 30,
      resumeAnalysesPerMonth: 10,
      codingChallenges: Infinity,
      feedbackDepth: 'detailed' as const,
      voiceInterviews: true,
      analyticsHistoryDays: 365,
      prioritySupport: false,
    },
    features: [
      '30 mock interviews/month',
      '10 resume analyses/month',
      'Unlimited coding challenges',
      'Detailed AI feedback',
      'Voice interviews',
      '1-year analytics history',
    ],
    popular: true,
  },
  ENTERPRISE: {
    name: 'Enterprise',
    description: 'For teams and organizations',
    price: 49,
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || null,
    limits: {
      interviewsPerMonth: Infinity,
      resumeAnalysesPerMonth: Infinity,
      codingChallenges: Infinity,
      feedbackDepth: 'detailed' as const,
      voiceInterviews: true,
      analyticsHistoryDays: Infinity,
      prioritySupport: true,
    },
    features: [
      'Unlimited mock interviews',
      'Unlimited resume analyses',
      'Unlimited coding challenges',
      'Detailed AI feedback + Action Plan',
      'Voice interviews',
      'Unlimited analytics history',
      'Priority support',
    ],
  },
} as const;

export type PlanKey = keyof typeof plans;
