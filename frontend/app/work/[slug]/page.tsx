import Link from 'next/link';

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/case-studies/${params.slug}`, { cache: 'no-store' });

  if (!res.ok) {
    return <main className="mx-auto max-w-4xl px-4 py-16">Case study not found.</main>;
  }

  const item = await res.json();
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-12">
      <Link href="/" className="text-sm font-semibold text-slate-700">← Back home</Link>
      <article className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Case study</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{item.title}</h1>
        <p className="mt-6 text-slate-600">{item.content}</p>
      </article>
    </main>
  );
}
