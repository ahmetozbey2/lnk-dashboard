import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
  const { userId } = await context.params;

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!userExists) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const payrolls = await prisma.payroll.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            position: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, payrolls });
  } catch (error) {
    console.error('❌ Error fetching payrolls by user:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch payrolls' }, { status: 500 });
  }
}
