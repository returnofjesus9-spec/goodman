import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work — Goodman Consulting',
  description: 'Selected case studies from businesses we have helped with websites, automation, and dashboards.',
};

export default async function WorkPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/case-studies`, { cache: 'no-store' });
  const caseStudies = res.ok ? await res.json() : [];

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Recent work</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">Selected case studies</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          A look at some of the projects we have delivered for small and medium businesses.
        </p>

        {caseStudies.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {caseStudies.map((item: any) => (
              <article key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{item.summary}</p>
                <Link href={`/work/${item.slug}`} className="mt-4 inline-flex text-sm font-semibold text-slate-900">
                  Read the story →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-slate-600">Case studies are coming soon — get in touch to see examples in the meantime.</p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
