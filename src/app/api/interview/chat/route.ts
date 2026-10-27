import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { INTERVIEW_SYSTEM_PROMPT } from '@/lib/prompts/interview';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    if (rateLimit) {
      const { success } = await rateLimit.limit(ip);
      if (!success) {
        logger.warn('Rate limit exceeded for interview chat', { ip });
        return new Response('Too Many Requests', { status: 429 });
      }
    }

    const session = await auth();
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages, sessionId } = await req.json();

    if (!sessionId) {
      return new Response('Session ID is required', { status: 400 });
    }

    const mockSession = await prisma.mockSession.findUnique({
      where: { id: sessionId },
    });

    if (!mockSession || mockSession.userId !== session.user.id) {
      return new Response('Session not found or unauthorized', { status: 404 });
    }

    // Save the user's latest message to the DB
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      await prisma.mockSessionMessage.create({
        data: {
          mockSessionId: sessionId,
          role: 'user',
          content:
            typeof lastMessage.content === 'string'
              ? lastMessage.content
              : JSON.stringify(lastMessage.content),
        },
      });
    }

    const systemPrompt = `${INTERVIEW_SYSTEM_PROMPT}\n\nInterview Type: ${mockSession.type}\nDifficulty: ${mockSession.difficulty}`;

    const result = await streamText({
      model: openai('gpt-4o'),
      messages,
      system: systemPrompt,
      async onFinish({ text }) {
        // Save the AI's response to the DB when the stream completes
        await prisma.mockSessionMessage.create({
          data: {
            mockSessionId: sessionId,
            role: 'assistant',
            content: text,
          },
        });
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    logger.error('Chat error', { error: error instanceof Error ? error.message : 'Unknown' });
    return new Response('Internal Server Error', { status: 500 });
  }
}
