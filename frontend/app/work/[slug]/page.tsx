import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import { Reveal } from '@/components/motion';

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/case-studies/${slug}`, { cache: 'no-store' });

  if (!res.ok) {
    return (
      <main>
        <div className="mx-auto max-w-4xl px-4 py-28 text-ink-secondary">Case study not found.</div>
        <SiteFooter />
      </main>
    );
  }

  const item = await res.json();
  return (
    <main>
      <div className="relative overflow-hidden px-4 py-28 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-radial-fade" />
        <div className="relative mx-auto max-w-4xl">
          <Link href="/work" className="text-sm font-semibold text-ink-secondary transition-colors hover:text-ink">
            ← Back to work
          </Link>
          <Reveal delay={0.1}>
            <article className="mt-8 rounded-sm border border-line bg-bg-surface p-8 md:p-12">
              <p className="label text-accent-light">Case study</p>
              <h1 className="mt-4 text-display-sm font-semibold text-ink">{item.title}</h1>
              <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-secondary">{item.content}</p>
            </article>
          </Reveal>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
