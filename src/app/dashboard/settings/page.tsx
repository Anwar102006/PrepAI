import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <div className="animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-white/50">Manage your profile, preferences, and subscription.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/5 bg-surface-50/50 p-12 text-center">
        <p className="text-white/30">Settings page will be fully implemented in Phase 6.</p>
      </div>
    </div>
  );
}
