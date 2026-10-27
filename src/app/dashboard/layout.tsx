import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/sidebar';
import Navbar from '@/components/layout/Navbar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-[#0a0a0f] dark:text-gray-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar user={session.user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
