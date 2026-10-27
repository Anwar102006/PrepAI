'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      } else {
        router.push('/login?registered=true');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join PrepAI and start practicing
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
