/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { Send, User, Bot, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InterviewChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);
  const [feedback, setFeedback] = useState<{ overallScore: number; strengths: string[]; weaknesses: string[]; detailedFeedback: string } | null>(null);
  
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
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-900 rounded-2xl p-8 text-center shadow-sm">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Completed!</h1>
          <div className="mt-6 inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-emerald-100 dark:border-emerald-900/30">
            <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{feedback.overallScore}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strengths</h3>
            <ul className="space-y-2">
              {feedback.strengths.map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-emerald-500 mt-1">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Areas to Improve</h3>
            <ul className="space-y-2">
              {feedback.weaknesses.map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <span className="text-red-500 mt-1">•</span> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detailed Feedback</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feedback.detailedFeedback}</p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Interview Session</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Respond clearly and naturally.</p>
        </div>
        <button
          onClick={endInterview}
          disabled={isFinishing || isLoading}
          className="bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isFinishing ? 'Generating Feedback...' : 'End Interview'}
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30 dark:bg-[#0a0a0f]/30">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Initializing your interview...</p>
            <p className="text-sm mt-2">Send a message to begin.</p>
          </div>
        )}

        {messages.map((m: { id: string; role: string; content: string }) => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm'
              }`}
            >
              <div className="prose dark:prose-invert prose-sm max-w-none whitespace-pre-wrap">
                {m.content}
              </div>
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-500/10 p-4 rounded-lg text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>Connection error. Please try sending your message again.</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-3xl mx-auto">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your answer..."
            disabled={isLoading || isFinishing}
            className="w-full pl-4 pr-12 py-3 bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-gray-900 dark:text-white disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isFinishing}
            className="absolute right-2 p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
