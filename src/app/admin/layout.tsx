import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';
import { LayoutDashboard, Users, HelpCircle, Activity, FileText, ArrowLeft } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Questions', href: '/admin/questions', icon: HelpCircle },
    { name: 'AI Usage', href: '/admin/usage', icon: Activity },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 z-10 flex hidden w-64 flex-col border-r border-gray-200 bg-white md:flex dark:border-gray-800 dark:bg-[#11121a]">
        <div className="border-b border-gray-200 p-6 dark:border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
          >
            <span className="rounded-md bg-blue-600 p-1 text-white">Prep</span>
            <span>Admin</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Icon className="h-5 w-5 text-gray-500" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex min-h-screen flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 lg:px-8 dark:border-gray-800 dark:bg-[#11121a]">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Admin Control Panel
            </h1>
          </div>
          <div className="flex items-center gap-4 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></div>
            System Online
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
