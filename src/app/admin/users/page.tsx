'use client';

import { useEffect, useState } from 'react';
import { Search, MoreVertical, Edit2, Trash2, Mail } from 'lucide-react';

export default function AdminUsersPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // In a real app, this would be a dedicated /api/admin/users endpoint with pagination
    // Here we re-use the stats endpoint just to get recent users for the demo
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        // Expand the mock list for UI demonstration
        const expandedUsers = [
          ...data.recentUsers,
          {
            id: 'mock1',
            name: 'Alice Smith',
            email: 'alice@example.com',
            role: 'USER',
            createdAt: new Date().toISOString(),
          },
          {
            id: 'mock2',
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'USER',
            createdAt: new Date().toISOString(),
          },
        ];
        setUsers(expandedUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      (u.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (u.email?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage platform users, their roles, and activity.
          </p>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm text-gray-900 transition-shadow outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800 dark:bg-[#11121a] dark:text-white"
            />
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-700">
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#11121a]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No users found matching &quot;{search}&quot;
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="group transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/20"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 font-bold text-gray-600 shadow-sm dark:from-gray-700 dark:to-gray-600 dark:text-gray-300">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user.name || 'Unknown User'}
                          </div>
                          <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="rounded-md p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filteredUsers.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 text-sm dark:border-gray-800">
            <div className="text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium text-gray-900 dark:text-white">1</span> to{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                {filteredUsers.length}
              </span>{' '}
              of{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                {filteredUsers.length}
              </span>{' '}
              users
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300">
                Previous
              </button>
              <button className="rounded-md border border-gray-200 px-3 py-1 text-gray-600 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
