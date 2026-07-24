import Link from 'next/link';
import SiteFooter from '@/components/site-footer';

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/case-studies/${slug}`, { cache: 'no-store' });

  if (!res.ok) {
    return (
      <main>
        <div className="mx-auto max-w-4xl px-4 py-16">Case study not found.</div>
        <SiteFooter />
      </main>
    );
  }

  const item = await res.json();
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-12">
        <Link href="/work" className="text-sm font-semibold text-stone-600">← Back to work</Link>
        <article className="mt-8 rounded-lg border border-stone-200 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Case study</p>
          <h1 className="mt-3 text-3xl font-semibold text-ink">{item.title}</h1>
          <p className="mt-6 text-stone-600">{item.content}</p>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
