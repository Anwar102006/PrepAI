import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | PrepAI',
  description: 'Create a new PrepAI account',
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
      <RegisterForm />
    </div>
  );
}
