import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import NavBar from '@/components/nav-bar';
import WhatsAppCta from '@/components/whatsapp-cta';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Goodman Consulting',
  description: 'Affordable web design, automation and analytics support for growing businesses.',
  openGraph: {
    title: 'Goodman Consulting',
    description: 'Affordable web design, automation and analytics support for growing businesses.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${heading.variable}`}>
      <body>
        <NavBar />
        {children}
        <WhatsAppCta />
      </body>
    </html>
  );
}
