'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrainCircuit, Briefcase, UserCheck, ChevronRight } from 'lucide-react';

const INTERVIEW_TYPES = [
  {
    id: 'TECHNICAL',
    name: 'Technical',
    icon: BrainCircuit,
    desc: 'Algorithms, system design, and coding.',
  },
  {
    id: 'BEHAVIORAL',
    name: 'Behavioral',
    icon: UserCheck,
    desc: 'Past experiences and leadership skills.',
  },
  {
    id: 'HR',
    name: 'HR / Cultural Fit',
    icon: Briefcase,
    desc: 'Company values and professional goals.',
  },
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
    <div className="mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Start New Interview</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Configure your AI mock interview session.
        </p>
      </div>

      <div className="space-y-8">
        {/* Interview Type Selection */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            1. Select Interview Type
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {INTERVIEW_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative rounded-2xl border-2 p-6 text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700'
                  }`}
                >
                  <type.icon
                    className={`mb-4 h-8 w-8 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
                  />
                  <h3
                    className={`font-semibold ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}
                  >
                    {type.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {type.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Difficulty Selection */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            2. Select Difficulty
          </h2>
          <div className="flex flex-wrap gap-3">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`rounded-xl border px-6 py-3 text-sm font-medium transition-all ${
                    isSelected
                      ? 'border-gray-900 bg-gray-900 text-white shadow-md dark:border-white dark:bg-white dark:text-gray-900'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                >
                  {diff.charAt(0) + diff.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </section>

        {/* Start Button */}
        <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-800">
          <button
            onClick={startInterview}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Preparing Session...' : 'Start Interview'}
            {!isLoading && <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
