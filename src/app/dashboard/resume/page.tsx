import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume Analyzer',
};

export default function ResumePage() {
  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resume Analyzer</h1>
        <p className="mt-1 text-white/50">Upload and analyze your resume with AI.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/5 bg-surface-50/50 p-12 text-center">
        <p className="text-white/30">Resume analyzer will be implemented in Phase 3.</p>
      </div>
    </div>
  );
}
