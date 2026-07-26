import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work — Goodman Consulting',
  description: 'Real projects for real small and medium businesses.',
};

type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  summary: string;
};

export default async function WorkIndexPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  let items: CaseStudy[] = [];

  try {
    const res = await fetch(`${apiUrl}/api/case-studies`, { cache: 'no-store' });
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
            <p className="label text-accent-light">Our work</p>
            <h1 className="mt-4 max-w-2xl text-display-sm font-semibold text-ink text-balance">
              Real projects, real results
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              A look at what we&apos;ve built for small and medium businesses so far.
            </p>
          </Reveal>

          {items.length ? (
            <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
              {items.map((item) => (
                <RevealItem key={item.slug}>
                  <Link
                    href={`/work/${item.slug}`}
                    className="group block h-full rounded-sm border border-line bg-bg-surface p-8 transition-colors duration-300 hover:border-accent/40"
                  >
                    <h2 className="font-sans text-xl font-semibold text-ink">{item.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{item.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-light">
                      Read case study →
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-14 text-ink-secondary">
              Our first project is wrapping up — check back this month. In the meantime, message us
              on WhatsApp and we&apos;ll walk you through it directly.
            </p>
          )}

          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/919777262734"
                className="rounded-sm bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
