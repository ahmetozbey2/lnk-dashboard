import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payrolls = await prisma.payroll.findMany({
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

    return NextResponse.json({ payrolls });
  } catch (error) {
    console.error('❌ Error fetching payrolls:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch payrolls' }, { status: 500 });
  }
}
