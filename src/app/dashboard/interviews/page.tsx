import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interviews',
};

export default function InterviewsPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Interviews</h1>
          <p className="mt-1 text-white/50">View and manage your mock interview sessions.</p>
        </div>
      </div>

      {/* Placeholder */}
      <div className="mt-8 rounded-2xl border border-white/5 bg-surface-50/50 p-12 text-center">
        <p className="text-white/30">Interview list will be implemented in Phase 2.</p>
      </div>
    </div>
  );
}
