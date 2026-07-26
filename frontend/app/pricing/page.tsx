import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import TierScale from '@/components/graphics/tier-scale';
import { Magnetic, Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, clear tech consulting packages for websites, automation, and dashboards.',
  keywords: ['tech consulting pricing', 'website design cost India', 'automation consulting packages'],
  alternates: { canonical: '/pricing' },
};

type Tier = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export default async function PricingPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/pricing`, { cache: 'no-store' });
  const pricing: Tier[] = res.ok ? await res.json() : [];

  return (
    <main>
      {/* SCENE 01 — HERO */}
      <section className="relative overflow-hidden bg-bg-void px-4 py-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-40" density="regular" fade="bottom" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Simple packages</p>
          </Reveal>
          <h1 className="mt-6 max-w-2xl text-display-lg font-semibold text-ink text-balance">
            <TextReveal text="Choose a package that fits your stage." />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-secondary">
              No hidden fees, no confusing tiers — just clear pricing based on what your business
              needs right now.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCENE 02 — PACKAGES */}
      <section className="relative border-t border-line bg-bg-deep px-4 py-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {pricing.length ? (
            <>
              <Reveal className="mx-auto mb-24 max-w-2xl">
                <TierScale tiers={pricing.map((t) => ({ name: t.name }))} />
              </Reveal>
              <RevealGroup className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
              {pricing.map((tier) => (
                <RevealItem key={tier.id}>
                  <article className="flex h-full flex-col bg-bg-surface p-8 md:p-10">
                    <h2 className="text-lg font-semibold text-ink">{tier.name}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">{tier.description}</p>
                    <p className="mt-10 font-mono text-display-sm font-semibold text-ink">{tier.price}</p>
                    <Magnetic className="mt-7">
                      <a
                        href="https://wa.me/919777262734"
                        className="block rounded-sm border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
                      >
                        Get a quote
                      </a>
                    </Magnetic>
                  </article>
                </RevealItem>
              ))}
              </RevealGroup>
            </>
          ) : (
            <Reveal>
              <div className="border-t border-b border-line py-16">
                <p className="max-w-md text-lg leading-relaxed text-ink-secondary">
                  Pricing details are being updated — message us on WhatsApp and we&rsquo;ll share
                  current packages directly.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* SCENE 03 — TRUST NOTE */}
      <section className="relative border-t border-line bg-bg-surface px-4 py-20 md:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ink-secondary">
              Every package is billed directly and in the open — no retainers you didn&rsquo;t agree to.
            </p>
            <p className="label text-ink-muted">Registered MSME · UDYAM-OD-19-0172402</p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
