import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | PrepAI',
  description: 'Create a new PrepAI account',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-950">
      <RegisterForm />
    </div>
  );
}
