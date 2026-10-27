import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics',
};

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-white/50">Track your interview preparation progress.</p>
      </div>

      <div className="bg-surface-50/50 mt-8 rounded-2xl border border-white/5 p-12 text-center">
        <p className="text-white/30">Analytics dashboard will be implemented in Phase 5.</p>
      </div>
    </div>
  );
}
