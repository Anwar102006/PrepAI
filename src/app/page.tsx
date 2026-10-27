import Link from 'next/link';
import { Metadata } from 'next';
import {
  MessageSquare,
  FileText,
  Code,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Star,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'PrepAI — Master Your Next Interview with AI',
  description:
    'AI-powered interview preparation platform. Practice mock interviews, analyze your resume, solve coding challenges, and get personalized feedback.',
};

// ─── Feature Data ───────────────────────────────────────────────

const features = [
  {
    icon: MessageSquare,
    title: 'AI Mock Interviews',
    description:
      'Realistic interview simulations powered by GPT-4o. Practice behavioral, technical, and system design interviews.',
    gradient: 'from-brand-500 to-accent-violet',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description:
      'Get ATS compatibility scores, content quality analysis, and actionable improvement suggestions.',
    gradient: 'from-accent-cyan to-brand-400',
  },
  {
    icon: Code,
    title: 'Coding Challenges',
    description:
      'LeetCode-style problems with a built-in code editor, automated test runner, and AI code reviews.',
    gradient: 'from-accent-amber to-accent-rose',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track your progress with detailed performance metrics, skill radar charts, and activity heatmaps.',
    gradient: 'from-accent-rose to-accent-violet',
  },
  {
    icon: Zap,
    title: 'AI Feedback',
    description:
      'Receive comprehensive performance analysis with category-wise breakdowns and personalized action items.',
    gradient: 'from-brand-400 to-accent-amber',
  },
  {
    icon: Shield,
    title: 'Admin Panel',
    description:
      'Full platform management with user controls, question bank editor, and system-wide analytics.',
    gradient: 'from-accent-violet to-accent-cyan',
  },
];

const stats = [
  { label: 'Mock Interviews', value: '10K+' },
  { label: 'Success Rate', value: '94%' },
  { label: 'Active Users', value: '5K+' },
  { label: 'Questions', value: '500+' },
];

// ─── Landing Page ───────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="bg-brand-600/10 absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]" />
        <div className="bg-accent-violet/8 absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full blur-[100px]" />
        <div className="bg-accent-cyan/5 absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[100px]" />
        <div className="dot-pattern absolute inset-0 opacity-40" />
      </div>

      {/* Navigation */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="from-brand-500 to-accent-violet flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Prep<span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="group from-brand-500 to-brand-600 shadow-brand-500/25 hover:shadow-brand-500/30 relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-in border-brand-500/20 bg-brand-500/10 text-brand-300 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
            <Star className="h-3.5 w-3.5" />
            <span>AI-Powered Interview Preparation</span>
          </div>

          {/* Headline */}
          <h1 className="animate-slide-up text-5xl leading-[1.1] font-extrabold tracking-tight md:text-7xl">
            Master Your Next
            <br />
            <span className="gradient-text">Interview</span> with AI
          </h1>

          {/* Subheading */}
          <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/50 [animation-delay:100ms] md:text-xl">
            Practice with AI interviewers, get your resume scored, solve coding challenges, and
            receive detailed feedback — all in one platform.
          </p>

          {/* CTAs */}
          <div className="animate-slide-up mt-10 flex flex-col items-center gap-4 [animation-delay:200ms] sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group from-brand-500 to-brand-600 shadow-brand-500/25 hover:shadow-brand-500/40 relative inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r px-8 py-4 text-base font-semibold text-white shadow-2xl transition-all"
            >
              Start Practicing Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="glass inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-medium text-white/70 transition-all hover:text-white"
            >
              See Features
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-in mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-6 [animation-delay:400ms] md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="gradient-text text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to <span className="gradient-text">Ace Your Interview</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            A comprehensive suite of AI-powered tools designed to prepare you for any interview
            scenario.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-surface-50/50 hover:bg-surface-50 relative rounded-2xl border border-white/5 p-8 transition-all duration-300 hover:border-white/10"
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-5`}
                />

                <div
                  className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3 shadow-lg`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="mb-3 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="from-brand-950 to-surface-50 relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br p-12 text-center md:p-20">
          <div className="dot-pattern absolute inset-0 opacity-20" />
          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to <span className="gradient-text">Transform</span> Your Interview Prep?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">
              Join thousands of candidates who improved their interview performance with PrepAI.
            </p>
            <Link
              href="/register"
              className="from-brand-500 to-brand-600 shadow-brand-500/25 hover:shadow-brand-500/40 mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r px-8 py-4 text-base font-semibold text-white shadow-2xl transition-all"
            >
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="from-brand-500 to-accent-violet flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">PrepAI</span>
          </div>
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} PrepAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-white/40 hover:text-white/70">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-white/40 hover:text-white/70">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
