import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ refId: string }> }) {
  // ❗ Next.js 15 ile context.params artık Promise olabilir
  const { refId } = await context.params;

  try {
    const user = await prisma.user.findFirst({
      where: { refId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('❌ Failed to fetch user by refId:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
