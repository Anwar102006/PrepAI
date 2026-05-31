import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coding Challenges',
};

export default function CodingPage() {
  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Coding Challenges</h1>
        <p className="mt-1 text-white/50">Practice coding problems and sharpen your skills.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/5 bg-surface-50/50 p-12 text-center">
        <p className="text-white/30">Coding module will be implemented in Phase 4.</p>
      </div>
    </div>
  );
}
