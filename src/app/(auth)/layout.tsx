import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      {/* Left side - Branding */}
      <div className="from-brand-950 via-surface-0 to-surface-50 relative hidden items-center justify-center overflow-hidden bg-gradient-to-br lg:flex lg:w-1/2">
        <div className="dot-pattern absolute inset-0 opacity-20" />
        <div className="bg-brand-600/15 absolute top-1/4 left-1/3 h-[400px] w-[400px] rounded-full blur-[100px]" />
        <div className="bg-accent-violet/10 absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-md px-8 text-center">
          <div className="from-brand-500 to-accent-violet shadow-brand-500/25 mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-2xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Prep<span className="gradient-text">AI</span>
          </h1>
          <p className="mt-4 text-lg text-white/50">
            Master your next interview with AI-powered practice sessions, resume analysis, and
            personalized feedback.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-left">
              <div className="gradient-text text-2xl font-bold">94%</div>
              <div className="mt-1 text-xs text-white/40">Success Rate</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-left">
              <div className="gradient-text text-2xl font-bold">10K+</div>
              <div className="mt-1 text-xs text-white/40">Interviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="mb-8 lg:hidden">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="from-brand-500 to-accent-violet flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold">
              Prep<span className="gradient-text">AI</span>
            </span>
          </Link>
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
