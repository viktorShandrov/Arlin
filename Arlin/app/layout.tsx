import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Arlin - Учи език чрез литература',
  description: 'Иновативна платформа за учене на езици чрез четене на книги и интерактивни упражнения.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body>
        <main className="min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}
