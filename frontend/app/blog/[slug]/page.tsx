import Link from 'next/link';
import type { Metadata } from 'next';
import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import { Reveal, TextReveal } from '@/components/motion';

const SITE_URL = 'https://goodmanconsulting.in';

async function getPost(slug: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/blog/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPost(slug);
  if (!item) return { title: 'Blog post not found' };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getPost(slug);

  if (!item) {
    return (
      <main>
        <div className="mx-auto max-w-4xl px-4 py-28 text-ink-secondary">
          <Link href="/blog" className="text-sm font-semibold text-ink-secondary transition-colors hover:text-ink">
            ← Back to blog
          </Link>
          <p className="mt-8">Blog post not found.</p>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.summary,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: item.created_at,
    dateModified: item.updated_at,
    author: { '@type': 'Organization', name: 'Goodman Consulting' },
    publisher: { '@type': 'Organization', name: 'Goodman Consulting' },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {/* SCENE 01 — TITLE */}
      <section className="relative overflow-hidden bg-bg-void px-4 pb-16 pt-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-25" density="fine" fade="bottom" scanline={false} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-fade" />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <Link href="/blog" className="text-sm font-semibold text-ink-secondary transition-colors hover:text-ink">
              ← Back to blog
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="label mt-8 text-accent-light">Article</p>
          </Reveal>
          <h1 className="mt-5 text-display-md font-semibold text-ink text-balance">
            <TextReveal text={item.title} />
          </h1>
        </div>
      </section>

      {/* SCENE 02 — ARTICLE (editorial column, no card) */}
      <section className="relative border-t border-line bg-bg-deep px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal delay={0.1}>
            <article className="whitespace-pre-line text-lg leading-relaxed text-ink-secondary">
              {item.content}
            </article>
          </Reveal>
        </div>
      </section>

      {/* SCENE 03 — CTA */}
      <section className="relative border-t border-line bg-bg-surface px-4 py-24 md:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-lg font-semibold text-ink">Have a project like this in mind?</p>
            <a
              href="https://wa.me/919777262734"
              className="inline-block shrink-0 rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
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
