import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const [totalUsers, totalInterviews, totalMockSessions, totalCodeSubmissions, recentUsers] =
      await Promise.all([
        prisma.user.count(),
        prisma.interview.count(),
        prisma.mockSession.count(),
        prisma.codeSubmission.count(),
        prisma.user.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: { id: true, name: true, email: true, createdAt: true, role: true },
        }),
      ]);

    // Aggregate stats by day for the last 7 days (simplified for demo)
    const usageData = [
      { name: 'Mon', interviews: 12, code: 45, resumes: 8 },
      { name: 'Tue', interviews: 19, code: 32, resumes: 15 },
      { name: 'Wed', interviews: 15, code: 55, resumes: 12 },
      { name: 'Thu', interviews: 22, code: 48, resumes: 20 },
      { name: 'Fri', interviews: 28, code: 61, resumes: 25 },
      { name: 'Sat', interviews: 35, code: 82, resumes: 30 },
      { name: 'Sun', interviews: 42, code: 95, resumes: 35 },
    ];

    return NextResponse.json({
      stats: {
        totalUsers,
        totalInterviews,
        totalMockSessions,
        totalCodeSubmissions,
      },
      recentUsers,
      usageData,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
