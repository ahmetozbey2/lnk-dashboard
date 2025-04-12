import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, amount, currency, reason } = body;

    // validation (opsiyonel)
    if (!userId || !amount || !currency) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const payroll = await prisma.payroll.create({
      data: {
        userId,
        amount,
        currency,
        reason,
      },
    });

    return NextResponse.json({ success: true, payroll });
  } catch (error) {
    console.error('❌ Error creating payroll:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
