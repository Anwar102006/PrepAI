'use client';

import { useEffect, useState } from 'react';
import { Users, Code, BrainCircuit, Activity, ArrowUpRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!data) return <div>Failed to load stats.</div>;

  const statCards = [
    {
      title: 'Total Users',
      value: data.stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      title: 'Mock Interviews',
      value: data.stats.totalMockSessions,
      icon: BrainCircuit,
      color: 'bg-emerald-500',
      trend: '+25%',
    },
    {
      title: 'Code Submissions',
      value: data.stats.totalCodeSubmissions,
      icon: Code,
      color: 'bg-purple-500',
      trend: '+18%',
    },
    {
      title: 'Active Sessions',
      value: data.stats.totalInterviews,
      icon: Activity,
      color: 'bg-amber-500',
      trend: '+5%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#11121a]"
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-3 ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                  <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-sm font-medium text-emerald-500 dark:bg-emerald-500/10">
                  {stat.trend} <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </h3>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart & Recent Users */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Usage Chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2 dark:border-gray-800 dark:bg-[#11121a]">
          <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
            Platform Usage (AI Analytics)
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.usageData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderColor: '#374151',
                    borderRadius: '0.5rem',
                    color: '#fff',
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area
                  type="monotone"
                  dataKey="interviews"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorInterviews)"
                  name="Mock Interviews"
                />
                <Area
                  type="monotone"
                  dataKey="code"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCode)"
                  name="Code Executions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users List */}
        <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#11121a]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Users</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
              View All
            </button>
          </div>

          <div className="flex-1 space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data.recentUsers.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-sm font-bold text-white shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || 'Anonymous User'}
                    </p>
                    <p className="w-32 truncate text-xs text-gray-500 md:w-48 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {user.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
