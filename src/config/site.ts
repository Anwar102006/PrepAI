// ─── Site Configuration ─────────────────────────────────────────
// Central place for all site metadata and navigation config

export const siteConfig = {
  name: 'PrepAI',
  description:
    'AI-powered interview preparation platform. Master your next interview with realistic mock interviews, resume analysis, and coding challenges.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og/default.png',
  creator: 'PrepAI Team',
  keywords: [
    'interview preparation',
    'mock interview',
    'AI interview',
    'resume analyzer',
    'coding interview',
    'behavioral interview',
    'technical interview',
    'system design',
  ],
} as const;

export const navItems = {
  dashboard: [
    { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { title: 'Interviews', href: '/dashboard/interviews', icon: 'MessageSquare' },
    { title: 'Resume', href: '/dashboard/resume', icon: 'FileText' },
    { title: 'Coding', href: '/dashboard/coding', icon: 'Code' },
    { title: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
    { title: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
  ],
  admin: [
    { title: 'Overview', href: '/admin', icon: 'Shield' },
    { title: 'Users', href: '/admin/users', icon: 'Users' },
    { title: 'Questions', href: '/admin/questions', icon: 'HelpCircle' },
    { title: 'Challenges', href: '/admin/challenges', icon: 'Code' },
    { title: 'Analytics', href: '/admin/analytics', icon: 'TrendingUp' },
    { title: 'Settings', href: '/admin/settings', icon: 'Cog' },
  ],
} as const;
