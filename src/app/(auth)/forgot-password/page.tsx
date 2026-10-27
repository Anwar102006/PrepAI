'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement password reset
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="animate-fade-in text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Check your email</h2>
        <p className="mt-3 text-white/50">
          We sent a password reset link to <span className="text-white/70">{email}</span>. Please
          check your inbox.
        </p>
        <Link
          href="/login"
          className="text-brand-400 hover:text-brand-300 mt-8 inline-flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold tracking-tight">Reset your password</h2>
      <p className="mt-2 text-white/50">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/70">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:border-brand-500 focus:ring-brand-500 w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pr-4 pl-10 text-sm text-white placeholder-white/25 transition-colors focus:ring-1 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group from-brand-500 to-brand-600 shadow-brand-500/25 hover:shadow-brand-500/30 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              Send Reset Link
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-white/40 hover:text-white/60"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  );
}
