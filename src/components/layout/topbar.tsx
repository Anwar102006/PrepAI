'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  Menu,
  X,
  LayoutDashboard,
  MessageSquare,
  FileText,
  Code,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const mobileNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Interviews', href: '/dashboard/interviews', icon: MessageSquare },
  { title: 'Resume', href: '/dashboard/resume', icon: FileText },
  { title: 'Coding', href: '/dashboard/coding', icon: Code },
  { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Topbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive page title from pathname
  const getPageTitle = () => {
    const segment = pathname.split('/').filter(Boolean).pop() || 'dashboard';
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-surface-0/80 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition-colors hover:bg-white/5 hover:text-white/70">
            <Search className="h-4 w-4" />
          </button>

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition-colors hover:bg-white/5 hover:text-white/70">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500" />
          </button>

          {/* User Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-violet text-sm font-bold text-white">
            P
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 animate-slide-down bg-surface-50 p-4 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-violet">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Prep<span className="gradient-text">AI</span></span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-brand-500/10 text-brand-400'
                        : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', isActive ? 'text-brand-400' : 'text-white/40')} />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
