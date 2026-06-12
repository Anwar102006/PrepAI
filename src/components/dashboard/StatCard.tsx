'use client';

import { LucideIcon } from 'lucide-react';
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
      className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform duration-500 [&>svg]:w-24 [&>svg]:h-24">
        {icon}
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-gray-700 dark:[&>svg]:text-gray-300">
          {icon}
        </div>
      </div>
      
      <div className="relative z-10 mt-4 flex items-baseline gap-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</h2>
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
            {trendUp ? '+' : '-'}{trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
