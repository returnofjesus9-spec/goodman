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
  metadataBase: new URL('https://goodmanconsulting.in'),
  title: {
    default: 'Goodman Consulting — Tech Consulting for Local Businesses in Bhubaneswar',
    template: '%s — Goodman Consulting',
  },
  description:
    'Tech consulting for local businesses: websites, automation, and dashboards built and supported by a Bhubaneswar-based consultancy. Practical software, no bloat.',
  keywords: [
    'tech consulting',
    'IT consulting for small business',
    'tech consultant Bhubaneswar',
    'tech consultancy Odisha',
    'website design for local businesses',
    'business automation consulting',
    'custom dashboards India',
  ],
  authors: [{ name: 'Goodman Consulting' }],
  category: 'Technology Consulting',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    siteName: 'Goodman Consulting',
    title: 'Goodman Consulting — Tech Consulting for Local Businesses in Bhubaneswar',
    description:
      'Tech consulting for local businesses: websites, automation, and dashboards built and supported by a Bhubaneswar-based consultancy.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://goodmanconsulting.in',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Goodman Consulting' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goodman Consulting — Tech Consulting for Local Businesses in Bhubaneswar',
    description:
      'Tech consulting for local businesses: websites, automation, and dashboards built and supported by a Bhubaneswar-based consultancy.',
    images: ['/og-image.svg'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Goodman Consulting',
  description:
    'Tech consulting for local businesses: websites, automation, and dashboards.',
  url: 'https://goodmanconsulting.in',
  image: 'https://goodmanconsulting.in/og-image.svg',
  telephone: '+91-97772-62734',
  email: 'help@goodmanconsulting.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bhubaneswar',
    addressRegion: 'Odisha',
    addressCountry: 'IN',
  },
  areaServed: 'IN',
  priceRange: '₹₹',
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
