import { auth } from '@/auth';
import StatCard from '@/components/dashboard/StatCard';
import SkillChart from '@/components/dashboard/SkillChart';
import RecentInterviews from '@/components/dashboard/RecentInterviews';
import { Target, Trophy, Clock, BrainCircuit } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Here&apos;s your interview preparation progress.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          <BrainCircuit className="h-4 w-4" />
          Start New Interview
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <StatCard
          title="Total Interviews"
          value="12"
          trend="2 this week"
          trendUp={true}
          icon={<Target />}
          delay={0.1}
        />
        <StatCard
          title="Average Score"
          value="82%"
          trend="4.2% increase"
          trendUp={true}
          icon={<Trophy />}
          delay={0.2}
        />
        <StatCard
          title="Practice Time"
          value="18h"
          trend="1.5h this week"
          trendUp={true}
          icon={<Clock />}
          delay={0.3}
        />
        <StatCard title="Skills Mastered" value="5" icon={<BrainCircuit />} delay={0.4} />
      </div>

      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentInterviews />
        </div>
        <div className="lg:col-span-1">
          <SkillChart />
        </div>
      </div>
    </div>
  );
}
