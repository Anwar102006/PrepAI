import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03]">
          <SearchX className="h-10 w-10 text-white/20" />
        </div>
        <h1 className="text-5xl font-bold gradient-text">404</h1>
        <h2 className="mt-3 text-xl font-semibold">Page Not Found</h2>
        <p className="mt-2 max-w-md text-white/50">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500/10 px-6 py-3 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
