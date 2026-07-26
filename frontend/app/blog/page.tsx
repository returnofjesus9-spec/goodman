import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import { Reveal, TextReveal } from '@/components/motion';
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
      {/* SCENE 01 — HERO */}
      <section className="relative overflow-hidden px-4 py-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Blog</p>
          </Reveal>
          <h1 className="mt-6 max-w-2xl text-display-lg font-semibold text-ink text-balance">
            <TextReveal text="Practical guides for growing businesses." />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-secondary">
              Straightforward notes on websites, automation, and dashboards — no jargon.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCENE 02 — ARTICLES (editorial numbered rows) */}
      <section className="relative border-t border-line px-4 py-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {items.length ? (
            <div className="flex flex-col">
              {items.map((item, i) => (
                <Reveal key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group grid items-center gap-6 border-t border-line py-12 transition-colors last:border-b hover:bg-bg-surface/40 md:grid-cols-[auto_1fr_auto]"
                  >
                    <span className="font-mono text-sm text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h2 className="text-2xl font-semibold text-ink transition-colors group-hover:text-accent-light md:text-3xl">
                        {item.title}
                      </h2>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-secondary">{item.summary}</p>
                    </div>
                    <span className="hidden text-sm font-semibold text-accent-light opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:inline-flex">
                      Read article →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="border-t border-b border-line py-16">
                <p className="max-w-md text-lg leading-relaxed text-ink-secondary">
                  We&rsquo;re writing our first set of guides on pricing, automation, and getting a
                  site live fast — the first one lands soon.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
