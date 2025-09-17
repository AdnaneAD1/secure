import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { redirect } from 'next/navigation';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans'
});

export const metadata: Metadata = {
  title: 'SecureAcompte - Maintenance',
  description: 'Site en maintenance - Nous serons bientôt de retour',
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