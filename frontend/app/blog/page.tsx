import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
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
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink md:text-5xl">Practical guides for growing businesses</h1>
        <p className="mt-4 max-w-2xl text-lg text-stone-600">
          Straightforward notes on websites, automation, and dashboards — no jargon.
        </p>

        {items.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-lg border border-stone-200 bg-white p-6 transition hover:border-ink"
              >
                <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm text-stone-600">{item.summary}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-gold">Read article →</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-stone-600">
            We're writing our first set of guides on pricing, automation, and getting a site live fast — the first
            one lands soon.
          </p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
