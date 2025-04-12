import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('❌ Failed to fetch users:', error);
    return NextResponse.json({ users: [] }, { status: 500 });
  }
}
