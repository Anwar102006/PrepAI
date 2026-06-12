'use client';

import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, XCircle, Search, Zap, Code } from 'lucide-react';
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
    if (score >= 80) return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-900/30';
    if (score >= 60) return 'bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-900/30';
    return 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-900/30';
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Resume Analyzer</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Upload your resume to get instant ATS optimization and skill gap analysis.</p>
      </div>

      {!result && (
        <div 
          className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
            file 
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' 
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-900'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Analyzing Resume...</h3>
              <p className="text-gray-500 dark:text-gray-400">Our AI is reading your experience and checking ATS compatibility.</p>
            </div>
          ) : (
            <>
              <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                {file ? <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" /> : <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400" />}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {file ? file.name : 'Upload your Resume'}
              </h3>
              
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                {file 
                  ? `${(file.size / 1024 / 1024).toFixed(2)} MB • PDF` 
                  : 'Drag and drop your PDF file here, or click to browse. Maximum size 5MB.'}
              </p>

              {error && (
                <div className="mb-6 inline-flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" />
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
                      className="px-6 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={analyzeResume}
                      className="px-8 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Search className="w-5 h-5" />
                      Analyze Now
                    </button>
                  </div>
                ) : (
                  <label 
                    htmlFor="resume-upload"
                    className="px-8 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer inline-flex items-center gap-2 shadow-md hover:shadow-lg"
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
          <div className={`border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 ${getScoreBg(result.score)}`}>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume Score</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-lg">
                Your resume scored a <strong className={getScoreColor(result.score)}>{result.score}/100</strong>. 
                {result.score >= 80 ? ' Excellent! Your resume is highly ATS-compatible and well-structured.' : 
                 result.score >= 60 ? ' Good start, but there are several areas of improvement to increase your chances.' : 
                 ' Needs significant improvement to pass ATS filters and stand out to recruiters.'}
              </p>
            </div>
            <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center flex-shrink-0 bg-white dark:bg-gray-900 ${
              result.score >= 80 ? 'border-emerald-500' : result.score >= 60 ? 'border-amber-500' : 'border-red-500'
            }`}>
              <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ATS Optimization */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                  <Search className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">ATS Analysis</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</h4>
                  <p className="font-medium text-gray-900 dark:text-white">{result.atsOptimization.status}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.atsOptimization.missingKeywords.map((kw: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-lg text-sm">
                        {kw}
                      </span>
                    ))}
                    {result.atsOptimization.missingKeywords.length === 0 && (
                      <span className="text-sm text-gray-500">None detected!</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Formatting Issues</h4>
                  <ul className="space-y-2">
                    {result.atsOptimization.formattingIssues.map((issue: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
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
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Skill Gap Analysis</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Identified Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skillGapAnalysis.identifiedSkills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30 rounded-lg text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Recommended to Add</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.skillGapAnalysis.recommendedSkills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium border-dashed">
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Strengths</h3>
              </div>
              <ul className="space-y-3">
                {result.strengths.map((strength: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-red-100 dark:border-red-900/30 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weaknesses</h3>
              </div>
              <ul className="space-y-3">
                {result.weaknesses.map((weakness: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Suggestions */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Action Plan</h3>
            </div>
            <div className="space-y-4">
              {result.actionableSuggestions.map((suggestion: string, i: number) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                    {i + 1}
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed mt-0.5">{suggestion}</p>
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
              className="px-8 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Analyze Another Resume
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
