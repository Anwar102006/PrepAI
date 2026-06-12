import { auth } from '@/auth';
import StatCard from '@/components/dashboard/StatCard';
import SkillChart from '@/components/dashboard/SkillChart';
import RecentInterviews from '@/components/dashboard/RecentInterviews';
import { Target, Trophy, Clock, BrainCircuit } from 'lucide-react';

export default async function DashboardPage() {
  const session = await auth();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here&apos;s your interview preparation progress.</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center gap-2">
          <BrainCircuit className="w-4 h-4" />
          Start New Interview
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Total Interviews"
          value="12"
          trend="2 this week"
          trendUp={true}
          icon={Target}
          delay={0.1}
        />
        <StatCard
          title="Average Score"
          value="82%"
          trend="4.2% increase"
          trendUp={true}
          icon={Trophy}
          delay={0.2}
        />
        <StatCard
          title="Practice Time"
          value="18h"
          trend="1.5h this week"
          trendUp={true}
          icon={Clock}
          delay={0.3}
        />
        <StatCard
          title="Skills Mastered"
          value="5"
          icon={BrainCircuit}
          delay={0.4}
        />
      </div>

      {/* Charts & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
