import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getInitialGreeting } from '@/lib/prompts/interview';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    if (rateLimit) {
      const { success } = await rateLimit.limit(ip);
      if (!success) {
        logger.warn('Rate limit exceeded for interview start', { ip });
        return new NextResponse('Too Many Requests', { status: 429 });
      }
    }

    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { type, difficulty } = await req.json();

    if (!type || !difficulty) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const initialMessage = getInitialGreeting(type, difficulty);

    const mockSession = await prisma.mockSession.create({
      data: {
        userId: session.user.id,
        type,
        difficulty,
        status: 'IN_PROGRESS',
        messages: {
          create: {
            role: 'assistant',
            content: initialMessage,
          },
        },
      },
      include: {
        messages: true,
      },
    });

    return NextResponse.json(mockSession);
  } catch (error) {
    logger.error('Error starting interview', {
      error: error instanceof Error ? error.message : 'Unknown',
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
