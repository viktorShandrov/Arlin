'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerAction } from '@/lib/authActions';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerAction(formData);

    setLoading(false);
    if (result.success) {
      router.push('/books');
      router.refresh();
    } else {
      setError(result.message || 'Грешка при регистрация');
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="bg-slate-800/80 p-8 rounded-xl border border-slate-700 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Регистрация</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Име</label>
            <input
              type="text"
              name="firstName"
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Фамилия</label>
            <input
              type="text"
              name="lastName"
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-1">Имейл</label>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-1">Парола</label>
          <input
            type="password"
            name="password"
            required
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Регистриране...' : 'Регистрация'}
        </button>
      </form>
    </div>
  );
}
