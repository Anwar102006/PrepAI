import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { getInitialGreeting } from '@/lib/prompts/interview';

export async function POST(req: Request) {
  try {
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
    console.error('Error starting interview:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
