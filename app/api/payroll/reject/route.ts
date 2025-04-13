// app/api/payroll/reject/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { payrollId } = await req.json();

  if (!payrollId) {
    return NextResponse.json({ error: 'Missing payrollId' }, { status: 400 });
  }

  try {
    const updated = await prisma.payroll.update({
      where: { id: payrollId },
      data: { status: 'rejected' },
    });

    return NextResponse.json({ success: true, payroll: updated });
  } catch (error) {
    console.error('Reject failed:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
