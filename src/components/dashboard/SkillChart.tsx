'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';

const mockData = [
  { subject: 'React', A: 85, fullMark: 100 },
  { subject: 'System Design', A: 65, fullMark: 100 },
  { subject: 'Algorithms', A: 70, fullMark: 100 },
  { subject: 'Behavioral', A: 90, fullMark: 100 },
  { subject: 'TypeScript', A: 80, fullMark: 100 },
];

export default function SkillChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex h-[400px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skill Analysis</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your performance across key areas
        </p>
      </div>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockData}>
            <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                borderColor: '#374151',
                color: '#fff',
                borderRadius: '8px',
              }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <Radar
              name="Proficiency"
              dataKey="A"
              stroke="#2563eb"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
