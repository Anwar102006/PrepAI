import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
// @ts-expect-error: pdf-parse does not have default export types
import pdfParse from 'pdf-parse';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { RESUME_ANALYZER_PROMPT } from '@/lib/prompts/resume';

export async function POST(req: Request) {
  try {
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

    // Extract text from PDF
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

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
      console.error('Failed to parse Resume JSON feedback:', jsonString);
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
    console.error('Resume analysis error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
