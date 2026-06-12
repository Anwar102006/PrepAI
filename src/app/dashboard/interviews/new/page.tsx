'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, Briefcase, UserCheck, ChevronRight } from 'lucide-react';

const INTERVIEW_TYPES = [
  { id: 'TECHNICAL', name: 'Technical', icon: BrainCircuit, desc: 'Algorithms, system design, and coding.' },
  { id: 'BEHAVIORAL', name: 'Behavioral', icon: UserCheck, desc: 'Past experiences and leadership skills.' },
  { id: 'HR', name: 'HR / Cultural Fit', icon: Briefcase, desc: 'Company values and professional goals.' },
];

const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD', 'EXPERT'];

export default function NewInterviewPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('TECHNICAL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('MEDIUM');
  const [isLoading, setIsLoading] = useState(false);

  const startInterview = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: selectedType, difficulty: selectedDifficulty }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/interviews/${data.id}`);
      } else {
        alert('Failed to start interview. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Start New Interview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Configure your AI mock interview session.</p>
      </div>

      <div className="space-y-8">
        {/* Interview Type Selection */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">1. Select Interview Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INTERVIEW_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <type.icon className={`w-8 h-8 mb-4 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                  <h3 className={`font-semibold ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                    {type.name}
                  </h3>
                  <p className={`text-sm mt-1 ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    {type.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Difficulty Selection */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">2. Select Difficulty</h2>
          <div className="flex flex-wrap gap-3">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-6 py-3 rounded-xl font-medium text-sm transition-all border ${
                    isSelected
                      ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-md'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {diff.charAt(0) + diff.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </section>

        {/* Start Button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button
            onClick={startInterview}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
          >
            {isLoading ? 'Preparing Session...' : 'Start Interview'}
            {!isLoading && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
