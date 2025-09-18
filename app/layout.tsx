import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans'
});

export const metadata: Metadata = {
  title: 'SecureAcompte',
  description: 'Sécurisez vos acomptes de travaux en toute confiance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={workSans.variable}>
      <body className={`${workSans.className} antialiased`}>{children}</body>
    </html>
  );
}