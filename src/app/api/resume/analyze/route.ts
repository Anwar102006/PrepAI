import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
// pdf-parse is required dynamically inside the route handler to avoid SSR issues
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { RESUME_ANALYZER_PROMPT } from '@/lib/prompts/resume';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    if (rateLimit) {
      const { success } = await rateLimit.limit(ip);
      if (!success) {
        logger.warn('Rate limit exceeded for resume analysis', { ip });
        return new NextResponse('Too Many Requests', { status: 429 });
      }
    }

    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return new NextResponse('Only PDF files are supported', { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return new NextResponse('File size exceeds 5MB limit', { status: 400 });
    }

    // Convert File to Buffer for pdf-parse
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Extract text from PDF buffer
    let pdfText = '';
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const pdfParse = require('pdf-parse');
      const parsed = await pdfParse(buffer);
      pdfText = parsed.text;
    } catch (err) {
      logger.error('Failed to parse PDF', {
        error: err instanceof Error ? err.message : 'Unknown',
      });
      return new NextResponse(
        'Failed to parse PDF file. Please ensure it is a valid text-based PDF.',
        { status: 400 }
      );
    }

    const resumeText = pdfText;

    if (!resumeText || resumeText.trim().length < 50) {
      return new NextResponse('Could not extract sufficient text from the PDF', { status: 400 });
    }

    // Generate AI Feedback
    const prompt = `Please analyze the following resume text:\n\n${resumeText.substring(0, 10000)}`;

    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: RESUME_ANALYZER_PROMPT,
      prompt,
    });

    // Clean JSON response
    let jsonString = text.trim();
    if (jsonString.startsWith('\`\`\`json')) {
      jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
    }

    let analysisData;
    try {
      analysisData = JSON.parse(jsonString);
    } catch {
      logger.error('Failed to parse Resume JSON feedback', { rawOutput: jsonString });
      return new NextResponse('Failed to generate valid analysis format', { status: 500 });
    }

    // Save Analysis to Database
    const analysis = await prisma.resumeAnalysis.create({
      data: {
        userId: session.user.id,
        resumeUrl: file.name, // Storing filename instead of actual URL since we aren't uploading to S3 right now
        score: analysisData.score,
        suggestions: JSON.stringify(analysisData),
      },
    });

    return NextResponse.json(analysis);
  } catch (error) {
    logger.error('Resume Analysis Error', {
      error: error instanceof Error ? error.message : 'Unknown',
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
