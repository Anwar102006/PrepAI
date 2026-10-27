'use client';

import { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Zap,
  Code,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are supported.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be under 5MB.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== 'application/pdf') {
        setError('Only PDF files are supported.');
        return;
      }
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('File size must be under 5MB.');
        return;
      }
      setFile(droppedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to analyze resume');
      }

      const data = await res.json();
      setResult(JSON.parse(data.suggestions));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80)
      return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-900/30';
    if (score >= 60)
      return 'bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-900/30';
    return 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-900/30';
  };

  return (
    <div className="mx-auto max-w-5xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Resume Analyzer</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Upload your resume to get instant ATS optimization and skill gap analysis.
        </p>
      </div>

      {!result && (
        <div
          className={`rounded-3xl border-2 border-dashed p-12 text-center transition-all ${
            file
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
              : 'border-gray-300 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Analyzing Resume...
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our AI is reading your experience and checking ATS compatibility.
              </p>
            </div>
          ) : (
            <>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                {file ? (
                  <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                ) : (
                  <UploadCloud className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                )}
              </div>

              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {file ? file.name : 'Upload your Resume'}
              </h3>

              <p className="mx-auto mb-8 max-w-sm text-gray-500 dark:text-gray-400">
                {file
                  ? `${(file.size / 1024 / 1024).toFixed(2)} MB • PDF`
                  : 'Drag and drop your PDF file here, or click to browse. Maximum size 5MB.'}
              </p>

              {error && (
                <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />

                {file ? (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setFile(null)}
                      className="rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={analyzeResume}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg"
                    >
                      <Search className="h-5 w-5" />
                      Analyze Now
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="resume-upload"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-md transition-colors hover:bg-blue-700 hover:shadow-lg"
                  >
                    Select File
                  </label>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Top Score Section */}
          <div
            className={`flex flex-col items-center justify-between gap-8 rounded-3xl border p-8 md:flex-row ${getScoreBg(result.score)}`}
          >
            <div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Resume Score
              </h2>
              <p className="max-w-lg text-gray-600 dark:text-gray-400">
                Your resume scored a{' '}
                <strong className={getScoreColor(result.score)}>{result.score}/100</strong>.
                {result.score >= 80
                  ? ' Excellent! Your resume is highly ATS-compatible and well-structured.'
                  : result.score >= 60
                    ? ' Good start, but there are several areas of improvement to increase your chances.'
                    : ' Needs significant improvement to pass ATS filters and stand out to recruiters.'}
              </p>
            </div>
            <div
              className={`flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full border-8 bg-white dark:bg-gray-900 ${
                result.score >= 80
                  ? 'border-emerald-500'
                  : result.score >= 60
                    ? 'border-amber-500'
                    : 'border-red-500'
              }`}
            >
              <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* ATS Optimization */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-500/10">
                  <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">ATS Analysis</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Status
                  </h4>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {result.atsOptimization.status}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.atsOptimization.missingKeywords.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      >
                        {kw}
                      </span>
                    ))}
                    {result.atsOptimization.missingKeywords.length === 0 && (
                      <span className="text-sm text-gray-500">None detected!</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Formatting Issues
                  </h4>
                  <ul className="space-y-2">
                    {result.atsOptimization.formattingIssues.map((issue: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                        <span>{issue}</span>
                      </li>
                    ))}
                    {result.atsOptimization.formattingIssues.length === 0 && (
                      <li className="text-sm text-gray-500">Perfect formatting!</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Skill Gap */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-500/10">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Skill Gap Analysis
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Identified Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skillGapAnalysis.identifiedSkills.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-800/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Recommended to Add
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skillGapAnalysis.recommendedSkills.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-lg border border-dashed border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      >
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-emerald-900/30 dark:bg-gray-900">
              <div className="mb-4 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {result.strengths.map((strength: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500"></span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm dark:border-red-900/30 dark:bg-gray-900">
              <div className="mb-4 flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weaknesses</h3>
              </div>
              <ul className="space-y-3">
                {result.weaknesses.map((weakness: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Suggestions */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-500/10">
                <Zap className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Action Plan</h3>
            </div>
            <div className="space-y-4">
              {result.actionableSuggestions.map((suggestion: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700/50 dark:bg-gray-800/50"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white font-bold text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    {i + 1}
                  </div>
                  <p className="mt-0.5 leading-relaxed text-gray-800 dark:text-gray-200">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button
              onClick={() => {
                setResult(null);
                setFile(null);
              }}
              className="rounded-xl bg-gray-100 px-8 py-3 font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Analyze Another Resume
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
