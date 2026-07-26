import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Goodman Consulting',
  description: 'Practical guides on websites, automation, and dashboards for small businesses.',
};

type BlogPost = {
  id: number;
  title: string;
  slug: string;
  summary: string;
};

export default async function BlogIndexPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  let items: BlogPost[] = [];

  try {
    const res = await fetch(`${apiUrl}/api/blog`, { cache: 'no-store' });
    if (res.ok) items = await res.json();
  } catch {
    items = [];
  }

  return (
    <main>
      <section className="relative overflow-hidden px-4 py-28 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Blog</p>
            <h1 className="mt-4 max-w-2xl text-display-sm font-semibold text-ink text-balance">
              Practical guides for growing businesses
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              Straightforward notes on websites, automation, and dashboards — no jargon.
            </p>
          </Reveal>

          {items.length ? (
            <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
              {items.map((item) => (
                <RevealItem key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group block h-full rounded-sm border border-line bg-bg-surface p-8 transition-colors duration-300 hover:border-accent/40"
                  >
                    <h2 className="font-sans text-xl font-semibold text-ink">{item.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{item.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-light">
                      Read article →
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-14 text-ink-secondary">
              We&apos;re writing our first set of guides on pricing, automation, and getting a site
              live fast — the first one lands soon.
            </p>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
