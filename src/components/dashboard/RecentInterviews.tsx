'use client';

import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

const mockInterviews = [
  { id: 1, title: 'Senior Frontend Engineer', type: 'Technical', date: '2 hours ago', status: 'COMPLETED', score: 85 },
  { id: 2, title: 'Product Manager', type: 'Behavioral', date: 'Yesterday', status: 'IN_PROGRESS', score: null },
  { id: 3, title: 'System Design - Distributed', type: 'System Design', date: 'May 12', status: 'COMPLETED', score: 72 },
  { id: 4, title: 'React Core Architecture', type: 'Technical', date: 'May 10', status: 'CANCELLED', score: null },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    case 'IN_PROGRESS': return <Clock className="w-4 h-4 text-amber-500" />;
    case 'CANCELLED': return <XCircle className="w-4 h-4 text-red-500" />;
    default: return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30';
    case 'IN_PROGRESS': return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-800/30';
    case 'CANCELLED': return 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-800/30';
    default: return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
  }
};

export default function RecentInterviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Interviews</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Review your past performance</p>
        </div>
        <Link href="/dashboard/history" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          View all
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 uppercase border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 font-medium">Interview</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Score</th>
              <th className="px-6 py-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {mockInterviews.map((interview, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                key={interview.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900 dark:text-white">{interview.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                    <span>{interview.type}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span>{interview.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-md ${getStatusBadge(interview.status)}`}>
                    {getStatusIcon(interview.status)}
                    {interview.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {interview.score ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${interview.score >= 80 ? 'bg-emerald-500' : interview.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${interview.score}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{interview.score}%</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500 italic">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <PlayCircle className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
