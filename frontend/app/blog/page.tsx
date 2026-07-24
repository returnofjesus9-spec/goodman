import Link from 'next/link';

export default async function BlogPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/blog`, { cache: 'no-store' });
  const posts = res.ok ? await res.json() : [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-12">
      <Link href="/" className="text-sm font-semibold text-slate-700">← Back home</Link>
      <h1 className="mt-6 text-3xl font-semibold text-slate-900">Blog</h1>
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
    </main>
  );
}
