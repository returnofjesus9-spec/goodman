import SiteFooter from '@/components/site-footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — Goodman Consulting',
  description: 'Simple, clear packages for websites, automation, and dashboards.',
};

export default async function PricingPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/pricing`, { cache: 'no-store' });
  const pricing = res.ok ? await res.json() : [];

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Simple packages</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">Choose a package that fits your stage</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          No hidden fees, no confusing tiers — just clear pricing based on what your business needs right now.
        </p>

        {pricing.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricing.map((tier: any) => (
              <article key={tier.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{tier.name}</h2>
                <p className="mt-3 text-sm text-slate-600">{tier.description}</p>
                <p className="mt-6 text-3xl font-semibold text-slate-900">{tier.price}</p>
                <a
                  href="https://wa.me/919999999999"
                  className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                >
                  Get a quote
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-slate-600">
            Pricing details are being updated — message us on WhatsApp and we will share current packages directly.
          </p>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
