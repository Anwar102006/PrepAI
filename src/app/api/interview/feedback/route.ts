import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { FEEDBACK_SYSTEM_PROMPT } from '@/lib/prompts/interview';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { sessionId } = await req.json();

    if (!sessionId) {
      return new NextResponse('Session ID is required', { status: 400 });
    }

    const mockSession = await prisma.mockSession.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!mockSession || mockSession.userId !== session.user.id) {
      return new NextResponse('Session not found', { status: 404 });
    }

    // Format the transcript for the AI evaluator
    const transcript = mockSession.messages
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');

    const prompt = `Analyze the following interview transcript and provide feedback in JSON format:\n\nTranscript:\n${transcript}`;

    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: FEEDBACK_SYSTEM_PROMPT,
      prompt,
    });

    // Clean JSON response (OpenAI sometimes wraps JSON in markdown blocks)
    let jsonString = text.trim();
    if (jsonString.startsWith('\`\`\`json')) {
      jsonString = jsonString.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
    }
    
    let feedbackData;
    try {
      feedbackData = JSON.parse(jsonString);
    } catch {
      console.error('Failed to parse AI JSON feedback:', jsonString);
      return new NextResponse('Failed to generate valid feedback format', { status: 500 });
    }

    // Update the session in the database
    const updatedSession = await prisma.mockSession.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        score: feedbackData.overallScore,
        feedback: JSON.stringify(feedbackData),
      },
    });

    // Optionally update user progress
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId: session.user.id },
    });

    if (userProgress) {
      const newCount = userProgress.interviewsCount + 1;
      const newAverage =
        (userProgress.averageScore * userProgress.interviewsCount + feedbackData.overallScore) / newCount;
      
      await prisma.userProgress.update({
        where: { userId: session.user.id },
        data: {
          interviewsCount: newCount,
          averageScore: newAverage,
        },
      });
    } else {
      await prisma.userProgress.create({
        data: {
          userId: session.user.id,
          interviewsCount: 1,
          averageScore: feedbackData.overallScore,
        },
      });
    }

    return NextResponse.json(updatedSession);
  } catch (error) {
    console.error('Feedback generation error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
