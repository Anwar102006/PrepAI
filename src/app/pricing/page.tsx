import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Choose the plan that fits your interview preparation needs.',
};

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Get started with basic features',
    features: [
      '3 mock interviews/month',
      '1 resume analysis/month',
      '10 coding challenges',
      'Basic AI feedback',
      '30-day analytics history',
    ],
    cta: 'Get Started',
    href: '/register',
    popular: false,
    gradient: 'from-surface-100 to-surface-50',
  },
  {
    name: 'Pro',
    price: 19,
    description: 'Everything you need to ace your interviews',
    features: [
      '30 mock interviews/month',
      '10 resume analyses/month',
      'Unlimited coding challenges',
      'Detailed AI feedback',
      'Voice interviews',
      '1-year analytics history',
    ],
    cta: 'Start Pro Trial',
    href: '/register?plan=pro',
    popular: true,
    gradient: 'from-brand-600 to-accent-violet',
  },
  {
    name: 'Enterprise',
    price: 49,
    description: 'For teams and organizations',
    features: [
      'Unlimited mock interviews',
      'Unlimited resume analyses',
      'Unlimited coding challenges',
      'Detailed AI feedback + Action Plan',
      'Voice interviews',
      'Unlimited analytics history',
      'Priority support',
    ],
    cta: 'Contact Sales',
    href: '/register?plan=enterprise',
    popular: false,
    gradient: 'from-accent-amber to-accent-rose',
  },
];

export default function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="bg-brand-600/10 absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[120px]" />
        <div className="dot-pattern absolute inset-0 opacity-30" />
      </div>

      {/* Nav */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="from-brand-500 to-accent-violet flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Prep<span className="gradient-text">AI</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-white/70 hover:text-white"
          >
            Log in
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="relative mx-auto max-w-5xl px-6 pt-20 text-center">
        <div className="border-brand-500/20 bg-brand-500/10 text-brand-300 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
          <Star className="h-3.5 w-3.5" />
          Simple Pricing
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Choose Your <span className="gradient-text">Plan</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/50">
          Start free and upgrade as you grow. No hidden fees, cancel anytime.
        </p>
      </section>

      {/* Plans Grid */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative rounded-2xl border p-8 transition-all',
                plan.popular
                  ? 'border-brand-500/30 from-brand-500/5 shadow-brand-500/5 bg-gradient-to-b to-transparent shadow-xl'
                  : 'bg-surface-50/50 border-white/5 hover:border-white/10'
              )}
            >
              {plan.popular && (
                <div className="from-brand-500 to-accent-violet absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r px-4 py-1 text-xs font-semibold text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-white/40">{plan.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-extrabold">${plan.price}</span>
                <span className="text-white/40">/month</span>
              </div>

              <Link
                href={plan.href}
                className={cn(
                  'mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all',
                  plan.popular
                    ? 'from-brand-500 to-brand-600 shadow-brand-500/25 hover:shadow-brand-500/30 bg-gradient-to-r text-white shadow-lg hover:shadow-xl'
                    : 'border border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]'
                )}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        plan.popular ? 'text-brand-400' : 'text-white/30'
                      )}
                    />
                    <span className="text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
