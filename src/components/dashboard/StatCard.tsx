'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  delay?: number;
}

export default function StatCard({ title, value, trend, trendUp, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform duration-500 group-hover:scale-110 dark:opacity-10 [&>svg]:h-24 [&>svg]:w-24">
        {icon}
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-700 dark:[&>svg]:text-gray-300">
          {icon}
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-baseline gap-2">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</h2>
        {trend && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${trendUp ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}
          >
            {trendUp ? '+' : '-'}
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
