import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const cookieToken = req.headers.get('cookie')?.split('token=')?.[1]?.split(';')?.[0];
    const token = authHeader || cookieToken;

    if (!token || token === 'null') {
      return NextResponse.json({ message: 'Невалидна сесия' }, { status: 403 });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload._id) {
      return NextResponse.json({ message: 'Невалидна сесия' }, { status: 403 });
    }

    await connectDB();
    const user = await User.findById(payload._id).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'Потребителят не е намерен' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Грешка при зареждане на потребителя' }, { status: 500 });
  }
}
