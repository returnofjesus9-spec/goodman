import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Goodman Consulting',
  description: 'Notes on websites, automation, and running a small business online.',
};

export default async function BlogPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/blog`, { cache: 'no-store' });
  const posts = res.ok ? await res.json() : [];

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">Notes and updates</h1>
        {posts.length ? (
          <div className="mt-8 space-y-5">
            {posts.map((post: any) => (
              <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
                <p className="mt-2 text-slate-600">{post.summary}</p>
                <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-slate-900">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-slate-600">New posts are on the way — check back soon.</p>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}
