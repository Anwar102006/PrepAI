import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="animate-fade-in text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03]">
          <SearchX className="h-10 w-10 text-white/20" />
        </div>
        <h1 className="gradient-text text-5xl font-bold">404</h1>
        <h2 className="mt-3 text-xl font-semibold">Page Not Found</h2>
        <p className="mt-2 max-w-md text-white/50">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
