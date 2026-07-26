import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import StageFlow from '@/components/graphics/stage-flow';
import { Reveal, TextReveal } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work',
  description: 'Real tech consulting projects for real local businesses — websites, automation, and dashboards.',
  keywords: ['tech consulting case studies', 'client work Goodman Consulting', 'small business software projects'],
  alternates: { canonical: '/work' },
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
      {/* SCENE 01 — HERO */}
      <section className="relative overflow-hidden bg-bg-void px-4 py-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-40" density="sparse" fade="bottom" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Our work</p>
          </Reveal>
          <h1 className="mt-6 max-w-3xl text-display-lg font-semibold text-ink">
            <TextReveal text="Real projects, real results." />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-secondary">
              A look at what we&rsquo;ve built for small and medium businesses so far.
            </p>
          </Reveal>
          <Reveal delay={0.5} className="mt-12">
            <StageFlow stages={['Brief', 'Build', 'Launch', 'Live']} />
          </Reveal>
        </div>
      </section>

      {/* SCENE 02 — CASE STUDIES (editorial numbered rows) */}
      <section className="relative border-t border-line bg-bg-deep px-4 py-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {items.length ? (
            <div className="flex flex-col">
              {items.map((item, i) => (
                <Reveal key={item.slug}>
                  <Link
                    href={`/work/${item.slug}`}
                    className="group grid items-center gap-6 border-t border-line py-12 transition-colors last:border-b hover:bg-bg-raised/40 md:grid-cols-[auto_1fr_auto]"
                  >
                    <span className="font-mono text-sm text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h2 className="text-2xl font-semibold text-ink transition-colors group-hover:text-accent-light md:text-3xl">
                        {item.title}
                      </h2>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-secondary">{item.summary}</p>
                    </div>
                    <span className="inline-flex text-sm font-semibold text-accent-light opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                      Read case study →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="border-t border-b border-line py-16">
                <p className="max-w-md text-lg leading-relaxed text-ink-secondary">
                  Our first project is wrapping up — check back this month. In the meantime, message
                  us on WhatsApp and we&rsquo;ll walk you through it directly.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* SCENE 03 — CTA */}
      <section className="relative border-t border-line bg-bg-surface px-4 py-20 md:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-6xl text-center">
            <a
              href="https://wa.me/919777262734"
              className="inline-block rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
