'use client';

import { Bell, Menu, Search } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Session } from 'next-auth';

export default function Navbar({ user }: { user: Session['user'] }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md md:px-8 dark:border-gray-800 dark:bg-[#0d0e14]/80">
      <div className="flex items-center md:hidden">
        <button className="p-2 text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="ml-4 flex w-full max-w-md items-center md:ml-0">
        <div className="relative hidden w-full md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full rounded-lg border border-transparent bg-gray-100 py-1.5 pr-4 pl-10 text-sm text-gray-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:bg-gray-800/50 dark:text-gray-100 dark:focus:bg-gray-900"
            placeholder="Search interviews, challenges..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <button className="relative p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#0d0e14]" />
        </button>

        <div className="group relative">
          <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 ring-2 ring-white focus:outline-none dark:ring-[#0d0e14]">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="User avatar" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            )}
          </button>

          <div className="invisible absolute right-0 z-50 mt-1 w-48 origin-top-right rounded-xl border border-gray-200 bg-white pt-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || 'User'}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-gray-50 dark:text-red-400 dark:hover:bg-gray-800"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
