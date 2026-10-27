'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Mic, FileText, Code, Settings, History, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Mock Interviews', href: '/dashboard/interviews', icon: Mic },
  { name: 'Resume Analyzer', href: '/dashboard/resume', icon: FileText },
  { name: 'Coding Practice', href: '/dashboard/coding', icon: Code },
  { name: 'History', href: '/dashboard/history', icon: History },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white md:flex dark:border-gray-800 dark:bg-[#0d0e14]">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-xl font-bold text-white">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            PrepAI
          </span>
        </Link>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-gray-100 dark:bg-gray-800/80"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0 transition-colors',
                  isActive
                    ? 'text-blue-600 dark:text-blue-500'
                    : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-gray-200 p-4 dark:border-gray-800">
        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          Plan: <span className="font-semibold text-gray-900 dark:text-white">Free</span>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div className="h-full w-1/3 rounded-full bg-blue-600" />
          </div>
          <p className="mt-1">3 / 10 Mock Interviews</p>
        </div>
      </div>
    </div>
  );
}
