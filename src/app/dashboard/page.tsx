import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Welcome, {session.user?.name || session.user?.email}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Your role: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{(session.user as any)?.role || 'USER'}</span></p>
        </div>

        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
