import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Book } from '@/lib/models/Book';

export async function GET() {
  try {
    await connectDB();
    const books = await Book.find({}).lean();
    return NextResponse.json(books);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Грешка при зареждане на книгите' }, { status: 500 });
  }
}
