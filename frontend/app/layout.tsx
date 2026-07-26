import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Work_Sans, JetBrains_Mono } from 'next/font/google';
import NavBar from '@/components/nav-bar';

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});
const sans = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Goodman Consulting',
  description: 'Affordable web design, automation and analytics support for growing businesses.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Goodman Consulting',
    description: 'Affordable web design, automation and analytics support for growing businesses.',
    type: 'website',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Goodman Consulting' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goodman Consulting',
    description: 'Affordable web design, automation and analytics support for growing businesses.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
