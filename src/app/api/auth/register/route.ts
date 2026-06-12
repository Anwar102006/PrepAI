import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authRateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    if (authRateLimit) {
      const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
      const { success } = await authRateLimit.limit(ip);
      if (!success) {
        logger.warn('Rate limit exceeded for registration', { ip });
        return new NextResponse('Too Many Requests', { status: 429 });
      }
    }

    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    logger.error('Registration error', { error: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
