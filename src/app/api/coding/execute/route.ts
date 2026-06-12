import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { CODING_REVIEW_PROMPT } from '@/lib/prompts/coding';

// Map of languages to Piston API versions
const PISTON_VERSIONS: Record<string, string> = {
  javascript: '18.15.0',
  python: '3.10.0',
  typescript: '5.0.3',
  java: '15.0.2',
  cpp: '10.2.0',
  go: '1.16.2',
};

// Aliases for Piston API
const PISTON_ALIASES: Record<string, string> = {
  javascript: 'javascript',
  python: 'python',
  typescript: 'typescript',
  java: 'java',
  cpp: 'cpp',
  go: 'go',
};

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { language, code } = await req.json();

    if (!language || !code) {
      return new NextResponse('Language and code are required', { status: 400 });
    }

    // 1. Secure Execution via Piston API
    let executionOutput = '';
    let executionError = '';

    try {
      const pistonLang = PISTON_ALIASES[language] || language;
      const pistonVersion = PISTON_VERSIONS[language] || '*';

      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: pistonLang,
          version: pistonVersion,
          files: [{ content: code }],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        executionOutput = data.run.stdout;
        executionError = data.run.stderr || (data.compile && data.compile.stderr) || '';
      } else {
        executionError = 'Failed to connect to execution engine.';
      }
    } catch (error) {
      console.error('Piston Execution Error:', error);
      executionError = 'Execution service is temporarily unavailable.';
    }

    // 2. AI Code Review & Complexity Analysis
    let aiFeedbackData = null;
    try {
      const prompt = `Analyze the following ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\nExecution Output:\n${executionOutput}\nExecution Error:\n${executionError}`;

      const { text } = await generateText({
        model: openai('gpt-4o'),
        system: CODING_REVIEW_PROMPT,
        prompt,
      });

      let jsonString = text.trim();
      if (jsonString.startsWith('\`\`\`json')) {
        jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
      }

      aiFeedbackData = JSON.parse(jsonString);
    } catch (error) {
      console.error('AI Review Error:', error);
      // We don't fail the request if AI review fails, just leave it null
    }

    // 3. Save Submission to Database
    const submission = await prisma.codeSubmission.create({
      data: {
        userId: session.user.id,
        language,
        code,
        output: executionOutput,
        error: executionError,
        aiFeedback: aiFeedbackData ? JSON.stringify(aiFeedbackData) : null,
        score: aiFeedbackData ? aiFeedbackData.score : null,
      },
    });

    return NextResponse.json({
      id: submission.id,
      output: executionOutput,
      error: executionError,
      review: aiFeedbackData,
    });
  } catch (error) {
    console.error('Coding execution route error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
