import { Metadata } from 'next';
import {
  MessageSquare,
  FileText,
  Code,
  TrendingUp,
  ArrowRight,
  Zap,
  Target,
  Flame,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
};

// ─── Stat Cards Data ────────────────────────────────────────────

const stats = [
  {
    label: 'Total Interviews',
    value: '0',
    change: null,
    icon: MessageSquare,
    gradient: 'from-brand-500 to-accent-violet',
  },
  {
    label: 'Avg. Score',
    value: '—',
    change: null,
    icon: Target,
    gradient: 'from-accent-cyan to-brand-400',
  },
  {
    label: 'Coding Solved',
    value: '0',
    change: null,
    icon: Code,
    gradient: 'from-accent-amber to-accent-rose',
  },
  {
    label: 'Day Streak',
    value: '0',
    change: null,
    icon: Flame,
    gradient: 'from-accent-rose to-accent-violet',
  },
];

// ─── Quick Actions ──────────────────────────────────────────────

const quickActions = [
  {
    title: 'Start Mock Interview',
    description: 'Practice with an AI interviewer',
    href: '/dashboard/interviews/new',
    icon: MessageSquare,
    gradient: 'from-brand-500 to-accent-violet',
  },
  {
    title: 'Analyze Resume',
    description: 'Get AI-powered resume feedback',
    href: '/dashboard/resume',
    icon: FileText,
    gradient: 'from-accent-cyan to-brand-400',
  },
  {
    title: 'Coding Challenge',
    description: 'Solve a coding problem',
    href: '/dashboard/coding',
    icon: Code,
    gradient: 'from-accent-amber to-accent-rose',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back! 👋
        </h1>
        <p className="mt-1 text-white/50">
          Here&apos;s an overview of your interview preparation progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-50/50 p-5 transition-all hover:border-white/10"
            >
              <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-5 blur-2xl transition-opacity group-hover:opacity-10`} />
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                {stat.change && (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="mt-0.5 text-xs text-white/40">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface-50/50 p-6 transition-all duration-300 hover:border-white/10 hover:bg-surface-50"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 blur-xl transition-opacity group-hover:opacity-5`} />
                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${action.gradient} p-3 shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold">{action.title}</h3>
                <p className="mt-1 text-sm text-white/40">{action.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
                  Get started <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <div className="rounded-2xl border border-white/5 bg-surface-50/50 p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03]">
              <Clock className="h-7 w-7 text-white/20" />
            </div>
            <h3 className="font-medium text-white/60">No activity yet</h3>
            <p className="mt-1 max-w-sm text-sm text-white/30">
              Start your first mock interview or coding challenge to see your activity here.
            </p>
            <Link
              href="/dashboard/interviews/new"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-500/10 px-5 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
            >
              <Zap className="h-4 w-4" />
              Start First Interview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
