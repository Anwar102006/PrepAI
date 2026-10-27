'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play,
  Code2,
  Terminal,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { motion } from 'framer-motion';

const LANGUAGES = [
  {
    id: 'javascript',
    name: 'JavaScript',
    defaultCode:
      'function solve() {\n  // Write your code here\n  console.log("Hello World");\n}\n\nsolve();',
  },
  {
    id: 'python',
    name: 'Python',
    defaultCode: 'def solve():\n    # Write your code here\n    print("Hello World")\n\nsolve()',
  },
  {
    id: 'java',
    name: 'Java',
    defaultCode:
      'public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n        System.out.println("Hello World");\n    }\n}',
  },
  {
    id: 'cpp',
    name: 'C++',
    defaultCode:
      '#include <iostream>\n\nint main() {\n    // Write your code here\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}',
  },
];

export default function CodingInterviewPage() {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(language.defaultCode);
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [review, setReview] = useState<any>(null);

  const handleLanguageChange = (langId: string) => {
    const selected = LANGUAGES.find((l) => l.id === langId) || LANGUAGES[0];
    setLanguage(selected);
    setCode(selected.defaultCode);
    setOutput(null);
    setError(null);
    setReview(null);
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setOutput(null);
    setError(null);
    setReview(null);

    try {
      const res = await fetch('/api/coding/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: language.id, code }),
      });

      if (!res.ok) {
        throw new Error('Failed to execute code');
      }

      const data = await res.json();
      setOutput(data.output);
      setError(data.error);
      setReview(data.review);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Coding Interview Sandbox
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Write, execute, and get AI reviews for your code.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={language.id}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="block rounded-lg border border-gray-200 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleRunCode}
            disabled={isExecuting}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            {isExecuting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Play className="h-4 w-4" fill="currentColor" />
            )}
            Run & Analyze
          </button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Editor Pane */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-[#1e1e1e] shadow-sm dark:border-gray-800">
          <div className="flex items-center gap-2 border-b border-[#3c3c3c] bg-[#252526] px-4 py-2">
            <Code2 className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">
              main.
              {language.id === 'python'
                ? 'py'
                : language.id === 'javascript'
                  ? 'js'
                  : language.id === 'java'
                    ? 'java'
                    : 'cpp'}
            </span>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={language.id}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
              }}
            />
          </div>
        </div>

        {/* Results Pane */}
        <div className="custom-scrollbar flex flex-col gap-6 overflow-y-auto pr-2">
          {/* Terminal Output */}
          <div className="flex min-h-[150px] flex-col rounded-2xl border border-gray-800 bg-gray-900 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-gray-400">
              <Terminal className="h-4 w-4" />
              <span className="text-sm font-medium tracking-wider uppercase">Console Output</span>
            </div>
            <div className="flex-1 overflow-y-auto rounded-xl bg-black/50 p-4 font-mono text-sm">
              {isExecuting && !output && !error && (
                <span className="animate-pulse text-gray-500">Running code...</span>
              )}
              {output && <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>}
              {error && <pre className="mt-2 whitespace-pre-wrap text-red-400">{error}</pre>}
              {!isExecuting && !output && !error && (
                <span className="text-gray-600">No output. Click Run to execute.</span>
              )}
            </div>
          </div>

          {/* AI Review */}
          {review && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-blue-900/30 dark:bg-gray-900"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <BrainCircuit className="h-5 w-5" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    AI Code Review
                  </h3>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-500/10 dark:text-blue-400">
                  Score: {review.score}/100
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <p className="mb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Time Complexity
                  </p>
                  <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                    {review.complexity.time}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
                  <p className="mb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Space Complexity
                  </p>
                  <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                    {review.complexity.space}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {review.review.issues.length > 0 && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      Issues & Bugs
                    </h4>
                    <ul className="space-y-2">
                      {review.review.issues.map((issue: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="mt-0.5 text-red-500">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.review.positives.length > 0 && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      What you did well
                    </h4>
                    <ul className="space-y-2">
                      {review.review.positives.map((positive: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="mt-0.5 text-emerald-500">•</span>
                          {positive}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.review.improvements.length > 0 && (
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400">
                      <Lightbulb className="h-4 w-4" />
                      Suggestions
                    </h4>
                    <ul className="space-y-2">
                      {review.review.improvements.map((improvement: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="mt-0.5 text-blue-500">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.optimizedCode && (
                  <div>
                    <h4 className="mt-4 mb-2 text-sm font-bold text-gray-900 dark:text-white">
                      Optimized Solution
                    </h4>
                    <div className="overflow-x-auto rounded-xl bg-[#1e1e1e] p-4">
                      <pre className="font-mono text-sm text-gray-300">{review.optimizedCode}</pre>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
