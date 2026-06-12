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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#11121a] border-r border-gray-200 dark:border-gray-800 flex flex-col hidden md:flex fixed inset-y-0 z-10">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="bg-blue-600 text-white p-1 rounded-md">Prep</span>
            <span>Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-500" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white dark:bg-[#11121a] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Control Panel</h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            System Online
          </div>
        </header>
        
        <div className="p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
