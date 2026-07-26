import SiteFooter from '@/components/site-footer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion';
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
      <section className="relative overflow-hidden px-4 py-28 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Simple packages</p>
            <h1 className="mt-4 max-w-2xl text-display-sm font-semibold text-ink text-balance">
              Choose a package that fits your stage
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              No hidden fees, no confusing tiers — just clear pricing based on what your business
              needs right now.
            </p>
          </Reveal>

          {pricing.length ? (
            <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
              {pricing.map((tier: any) => (
                <RevealItem key={tier.id}>
                  <article className="flex h-full flex-col rounded-sm border border-line bg-bg-surface p-7">
                    <h2 className="font-sans text-xl font-semibold text-ink">{tier.name}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">{tier.description}</p>
                    <p className="mt-6 font-mono text-3xl font-semibold text-ink">{tier.price}</p>
                    <a
                      href="https://wa.me/919777262734"
                      className="mt-6 inline-flex justify-center rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                    >
                      Get a quote
                    </a>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="mt-14 text-ink-secondary">
              Pricing details are being updated — message us on WhatsApp and we will share current
              packages directly.
            </p>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
