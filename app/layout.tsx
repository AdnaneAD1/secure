import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans'
});

export const metadata: Metadata = {
  title: 'Secure Acompte Travaux | La solution par AXIMOTRAVO',
  description: 'Secure Acompte Travaux est la solution innovante d’AXIMOTRAVO pour sécuriser les acomptes de travaux. Automatisez la gestion des paiements, sécurisez les transactions, et gagnez la confiance de vos clients.',
  keywords: [
    'acomptes travaux',
    'sécurisation paiements',
    'gestion acomptes',
    'sécuriser acompte client',
    'Secure Acompte',
    'solution AXIMOTRAVO',
    'sécurité des paiements BTP',
    'plateforme de gestion de paiements',
    'acompte chantier',
    'sécurité financière travaux'
  ],
  authors: [{ name: 'AXIMOTRAVO', url: 'https://secureacomptetravaux.com' }],
  creator: 'AXIMOTRAVO',
  publisher: 'AXIMOTRAVO',
  applicationName: 'Secure Acompte Travaux',
  robots: 'index, follow',
  metadataBase: new URL('https://secureacomptetravaux.com'),
  openGraph: {
    title: 'Secure Acompte Travaux | La solution sécurisée pour vos paiements BTP',
    description: 'La plateforme d’AXIMOTRAVO pour une gestion simplifiée, fiable et sécurisée des acomptes dans le secteur du bâtiment et des travaux.',
    url: 'https://secureacomptetravaux.com',
    siteName: 'Secure Acompte Travaux',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://secureacomptetravaux.com/img/preview.jpg', // Remplace par ton image de partage
        width: 1200,
        height: 630,
        alt: 'Illustration Secure Acompte Travaux'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Acompte Travaux | Par AXIMOTRAVO',
    description: 'Solution de sécurisation des acomptes dans le secteur des travaux. Simplifiez la gestion et gagnez en confiance.',
    images: ['https://secureacomptetravaux.com/img/preview.jpg']
  }
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