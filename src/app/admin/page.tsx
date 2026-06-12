'use client';

import { useEffect, useState } from 'react';
import { Users, Code, BrainCircuit, Activity, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) return <div>Failed to load stats.</div>;

  const statCards = [
    { title: 'Total Users', value: data.stats.totalUsers, icon: Users, color: 'bg-blue-500', trend: '+12%' },
    { title: 'Mock Interviews', value: data.stats.totalMockSessions, icon: BrainCircuit, color: 'bg-emerald-500', trend: '+25%' },
    { title: 'Code Submissions', value: data.stats.totalCodeSubmissions, icon: Code, color: 'bg-purple-500', trend: '+18%' },
    { title: 'Active Sessions', value: data.stats.totalInterviews, icon: Activity, color: 'bg-amber-500', trend: '+5%' },
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-[#11121a] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                  {stat.trend} <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart & Recent Users */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-[#11121a] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Platform Usage (AI Analytics)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.usageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCode" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="interviews" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorInterviews)" name="Mock Interviews" />
                <Area type="monotone" dataKey="code" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCode)" name="Code Executions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users List */}
        <div className="bg-white dark:bg-[#11121a] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Users</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">View All</button>
          </div>
          
          <div className="space-y-4 flex-1">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {data.recentUsers.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name || 'Anonymous User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-32 md:w-48">{user.email}</p>
                  </div>
                </div>
                <div className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
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
