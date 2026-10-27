'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to your PrepAI account
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="relative flex items-center justify-center py-2">
        <div className="absolute w-full border-t border-gray-200 dark:border-gray-700"></div>
        <span className="relative bg-white px-4 text-sm text-gray-500 dark:bg-gray-900">
          Or continue with
        </span>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center rounded-lg border px-4 py-2 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
