import { connectDB } from '@/lib/db';
import { Book } from '@/lib/models/Book';
import Link from 'next/link';

export default async function BooksPage() {
  await connectDB();
  const books = await Book.find({}).lean();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Каталог с книги</h1>

      {books.length === 0 ? (
        <p className="text-slate-400">Няма налични книги в момента.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book: any) => (
            <div
              key={book._id.toString()}
              className="bg-slate-800/80 border border-slate-700 rounded-xl overflow-hidden shadow hover:border-slate-500 transition flex flex-col"
            >
              {book.image && (
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{book.name}</h3>
                  <p className="text-slate-400 text-sm mb-3">Автор: {book.author || 'Неизвестен'}</p>
                  <p className="text-slate-300 text-sm line-clamp-3 mb-4">{book.resume}</p>
                </div>
                <Link
                  href={`/books/${book._id.toString()}`}
                  className="inline-block text-center bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded transition"
                >
                  Преглед
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
