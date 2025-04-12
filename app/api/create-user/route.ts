import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, department, position, image } = body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        department,
        position,
        image,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
  }
}
