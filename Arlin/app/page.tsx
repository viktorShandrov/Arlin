import Link from 'next/link';
import { getSessionUser } from '@/lib/authActions';

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Добре дошли в Arlin</h1>
      <p className="text-lg text-slate-300 max-w-xl mb-8">
        Научете нови езици лесно и приятно чрез интерактивно четене на книги и адаптивни упражнения.
      </p>

      {user ? (
        <div className="flex gap-4">
          <Link
            href="/books"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-white transition"
          >
            Към книгите ({user.firstName || user.email})
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-white transition"
          >
            Вход
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-white transition border border-slate-700"
          >
            Регистрация
          </Link>
        </div>
      )}
    </div>
  );
}
