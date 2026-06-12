'use client';

import { Bell, Menu, Search } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Session } from 'next-auth';

export default function Navbar({ user }: { user: Session['user'] }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 md:px-8 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0d0e14]/80 backdrop-blur-md">
      <div className="flex items-center md:hidden">
        <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center max-w-md w-full ml-4 md:ml-0">
        <div className="relative w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800/50 border border-transparent rounded-lg focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-gray-900 dark:text-gray-100"
            placeholder="Search interviews, challenges..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-[#0d0e14]" />
        </button>

        <div className="relative group">
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 ring-2 ring-white dark:ring-[#0d0e14] overflow-hidden focus:outline-none">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="User avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            )}
          </button>

          <div className="absolute right-0 w-48 pt-2 mt-1 origin-top-right bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
