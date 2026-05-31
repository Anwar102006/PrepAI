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
    <div className="hidden md:flex flex-col w-64 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0d0e14] sticky top-0">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">PrepAI</span>
        </Link>
      </div>

      <div className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'relative flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group',
                isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-gray-100 dark:bg-gray-800/80 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  'w-5 h-5 mr-3 flex-shrink-0 transition-colors',
                  isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
          Plan: <span className="text-gray-900 dark:text-white font-semibold">Free</span>
          <div className="mt-2 h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-1/3 rounded-full" />
          </div>
          <p className="mt-1">3 / 10 Mock Interviews</p>
        </div>
      </div>
    </div>
  );
}
