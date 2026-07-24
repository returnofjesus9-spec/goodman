import './globals.css';
import type { Metadata } from 'next';
import NavBar from '@/components/nav-bar';
import WhatsAppCta from '@/components/whatsapp-cta';

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
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <WhatsAppCta />
      </body>
    </html>
  );
}
