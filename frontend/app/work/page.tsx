import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
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
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Our work</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">Real projects, real results</h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          A look at what we've built for small and medium businesses so far.
        </p>

        {items.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="rounded-lg border border-stone-200 bg-white p-6 transition hover:border-ink"
              >
                <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm text-stone-600">{item.summary}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-gold">Read case study →</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-stone-600">
            We're finishing up our first project — case studies will be posted here shortly. Message us on
            WhatsApp in the meantime and we can walk you through it directly.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="https://wa.me/919999999999" className="rounded-sm bg-ink px-6 py-3 text-center font-semibold text-white">
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
