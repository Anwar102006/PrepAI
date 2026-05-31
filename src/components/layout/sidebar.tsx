'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Code,
  BarChart3,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Interviews', href: '/dashboard/interviews', icon: MessageSquare },
  { title: 'Resume', href: '/dashboard/resume', icon: FileText },
  { title: 'Coding', href: '/dashboard/coding', icon: Code },
  { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r border-white/5 bg-surface-50/50 transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-white/5 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-violet">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">
            Prep<span className="gradient-text">AI</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-brand-500/10 text-brand-400'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 shrink-0 transition-colors',
                  isActive ? 'text-brand-400' : 'text-white/40 group-hover:text-white/60'
                )}
              />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-accent-violet/5 p-4">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-brand-400" />
            <span className="text-xs font-semibold text-brand-300">Upgrade to Pro</span>
          </div>
          <p className="mt-1.5 text-xs text-white/40">Unlock unlimited interviews & advanced features.</p>
          <Link
            href="/dashboard/settings"
            className="mt-3 flex w-full items-center justify-center rounded-lg bg-brand-500/20 py-1.5 text-xs font-medium text-brand-300 transition-colors hover:bg-brand-500/30"
          >
            Upgrade
          </Link>
        </div>
      )}

      {/* Collapse Toggle + Logout */}
      <div className="border-t border-white/5 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/40 transition-colors hover:bg-white/5 hover:text-white/60"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
        <button
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
