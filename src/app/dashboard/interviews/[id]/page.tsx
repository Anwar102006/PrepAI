/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { Send, User, Bot, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InterviewChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);
  const [feedback, setFeedback] = useState<{
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    detailedFeedback: string;
  } | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    // @ts-expect-error: UseChatOptions missing api param in newer types
    api: '/api/interview/chat',
    body: {
      sessionId: params.id,
    },
  }) as any;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const endInterview = async () => {
    setIsFinishing(true);
    try {
      const res = await fetch('/api/interview/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: params.id }),
      });

      if (res.ok) {
        const data = await res.json();
        setFeedback(JSON.parse(data.feedback));
      } else {
        alert('Failed to generate feedback.');
      }
    } catch (err) {
      console.error('Failed to end interview', err);
    } finally {
      setIsFinishing(false);
    }
  };

  if (feedback) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-8">
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm dark:border-emerald-900 dark:bg-gray-900">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-500" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Completed!</h1>
          <div className="mt-6 inline-flex h-32 w-32 items-center justify-center rounded-full border-8 border-emerald-100 dark:border-emerald-900/30">
            <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {feedback.overallScore}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Strengths</h3>
            <ul className="space-y-2">
              {feedback.strengths.map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <span className="mt-1 text-emerald-500">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Areas to Improve
            </h3>
            <ul className="space-y-2">
              {feedback.weaknesses.map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <span className="mt-1 text-red-500">•</span> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Detailed Feedback
          </h3>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            {feedback.detailedFeedback}
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/20">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Interview Session
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Respond clearly and naturally.</p>
        </div>
        <button
          onClick={endInterview}
          disabled={isFinishing || isLoading}
          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
        >
          {isFinishing ? 'Generating Feedback...' : 'End Interview'}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 space-y-6 overflow-y-auto bg-gray-50/30 p-6 dark:bg-[#0a0a0f]/30">
        {messages.length === 0 && (
          <div className="py-10 text-center text-gray-500 dark:text-gray-400">
            <Bot className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>Initializing your interview...</p>
            <p className="mt-2 text-sm">Send a message to begin.</p>
          </div>
        )}

        {messages.map((m: { id: string; role: string; content: string }) => (
          <div
            key={m.id}
            className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role !== 'user' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                m.role === 'user'
                  ? 'rounded-tr-sm bg-blue-600 text-white'
                  : 'rounded-tl-sm border border-gray-100 bg-white text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              <div className="prose dark:prose-invert prose-sm max-w-none whitespace-pre-wrap">
                {m.content}
              </div>
            </div>

            {m.role === 'user' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                style={{ animationDelay: '300ms' }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-500 dark:bg-red-500/10">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>Connection error. Please try sending your message again.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="relative mx-auto flex max-w-3xl items-center">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your answer..."
            disabled={isLoading || isFinishing}
            className="w-full rounded-xl border-transparent bg-gray-100 py-3 pr-12 pl-4 text-gray-900 transition-all outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-900"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isFinishing}
            className="absolute right-2 rounded-lg bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
