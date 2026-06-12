'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Code2, Terminal, BrainCircuit, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', defaultCode: 'function solve() {\n  // Write your code here\n  console.log("Hello World");\n}\n\nsolve();' },
  { id: 'python', name: 'Python', defaultCode: 'def solve():\n    # Write your code here\n    print("Hello World")\n\nsolve()' },
  { id: 'java', name: 'Java', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n        System.out.println("Hello World");\n    }\n}' },
  { id: 'cpp', name: 'C++', defaultCode: '#include <iostream>\n\nint main() {\n    // Write your code here\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}' },
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
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coding Interview Sandbox</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Write, execute, and get AI reviews for your code.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={language.id}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
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
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isExecuting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4" fill="currentColor" />
            )}
            Run & Analyze
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Editor Pane */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col bg-[#1e1e1e]">
          <div className="bg-[#252526] px-4 py-2 border-b border-[#3c3c3c] flex items-center gap-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">main.{language.id === 'python' ? 'py' : language.id === 'javascript' ? 'js' : language.id === 'java' ? 'java' : 'cpp'}</span>
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
        <div className="flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Terminal Output */}
          <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 shadow-sm min-h-[150px] flex flex-col">
            <div className="flex items-center gap-2 mb-3 text-gray-400">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Console Output</span>
            </div>
            <div className="flex-1 font-mono text-sm bg-black/50 rounded-xl p-4 overflow-y-auto">
              {isExecuting && !output && !error && (
                <span className="text-gray-500 animate-pulse">Running code...</span>
              )}
              {output && <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>}
              {error && <pre className="text-red-400 whitespace-pre-wrap mt-2">{error}</pre>}
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
              className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 shadow-sm flex-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <BrainCircuit className="w-5 h-5" />
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">AI Code Review</h3>
                </div>
                <div className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold rounded-lg border border-blue-200 dark:border-blue-800">
                  Score: {review.score}/100
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Time Complexity</p>
                  <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">{review.complexity.time}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Space Complexity</p>
                  <p className="font-mono text-lg font-bold text-gray-900 dark:text-white">{review.complexity.space}</p>
                </div>
              </div>

              <div className="space-y-6">
                {review.review.issues.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      Issues & Bugs
                    </h4>
                    <ul className="space-y-2">
                      {review.review.issues.map((issue: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                          <span className="text-red-500 mt-0.5">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.review.positives.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      What you did well
                    </h4>
                    <ul className="space-y-2">
                      {review.review.positives.map((positive: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          {positive}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {review.review.improvements.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
                      <Lightbulb className="w-4 h-4" />
                      Suggestions
                    </h4>
                    <ul className="space-y-2">
                      {review.review.improvements.map((improvement: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                          <span className="text-blue-500 mt-0.5">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {review.optimizedCode && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 mt-4">Optimized Solution</h4>
                    <div className="bg-[#1e1e1e] rounded-xl p-4 overflow-x-auto">
                      <pre className="text-sm font-mono text-gray-300">
                        {review.optimizedCode}
                      </pre>
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
