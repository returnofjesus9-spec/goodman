import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import CategoryScale from '@/components/graphics/category-scale';
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
  features?: string | null;
  ideal_for?: string | null;
  timeline?: string | null;
};

type Group = {
  category: string;
  tiers: Tier[];
};

// Tier names are seeded as "Category · Label" (e.g. "Automation · Starter").
// This splits on the middle dot so the page can render one section per
// category. Anything without a "·" falls back into a single "Packages" group.
function groupPricing(pricing: Tier[]): Group[] {
  const groups = new Map<string, Tier[]>();
  for (const tier of pricing) {
    const [category, label] = tier.name.includes('·')
      ? tier.name.split('·').map((s) => s.trim())
      : ['Packages', tier.name];
    const bucket = groups.get(category) ?? [];
    bucket.push({ ...tier, name: label });
    groups.set(category, bucket);
  }
  return Array.from(groups.entries()).map(([category, tiers]) => ({ category, tiers }));
}

export default async function PricingPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const res = await fetch(`${apiUrl}/api/pricing`, { cache: 'no-store' });
  const pricing: Tier[] = res.ok ? await res.json() : [];
  const groups = groupPricing(pricing);

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

      {/* SCENE 02 — ESTIMATE DISCLAIMER */}
      <section className="relative border-t border-line bg-bg-void px-4 py-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-sm border border-line bg-bg-surface/60 px-6 py-6 sm:px-10 sm:py-8">
              <p className="label text-accent-light">A spectrum, not a fixed price list</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary">
                The figures below are rough estimates showing the typical range for each kind of
                project — actual cost depends on scope, number of pages, integrations, and
                timeline. For a number that fits your business specifically,{' '}
                
                <a  href="https://wa.me/919777262734"
                  className="font-semibold text-ink underline decoration-line underline-offset-4 hover:text-accent-light"
                >
                  contact us for a quote
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCENE 03 — PACKAGES BY CATEGORY */}
      <section className="relative border-t border-line bg-bg-deep px-4 py-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {groups.length ? (
            <div className="space-y-24">
              {groups.map((group) => (
                <div key={group.category}>
                  <Reveal>
                    <h2 className="text-xl font-semibold text-ink">{group.category}</h2>
                  </Reveal>
                  <Reveal className="mx-auto mb-16 mt-10 max-w-2xl">
                    <CategoryScale category={group.category} tiers={group.tiers.map((t) => ({ name: t.name }))} />
                  </Reveal>
                  <RevealGroup
                    className={`grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 ${
                      group.tiers.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                    }`}
                  >
                    {group.tiers.map((tier, i) => {
                      const isBestValue = group.tiers.length === 3 && i === 1;
                      const featureList = (tier.features ?? '')
                        .split('\n')
                        .map((f) => f.trim())
                        .filter(Boolean);
                      return (
                        <RevealItem key={tier.id}>
                          <article className={`relative flex h-full flex-col bg-bg-surface p-8 md:p-10 ${isBestValue ? 'ring-1 ring-inset ring-accent' : ''}`}>
                            {isBestValue && (
                              <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-label text-white">
                                Best Value
                              </span>
                            )}
                            <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                              {tier.description}
                            </p>
                            {tier.ideal_for && (
                              <p className="mt-3 label text-accent-light">Ideal for {tier.ideal_for}</p>
                            )}
                            {featureList.length > 0 && (
                              <ul className="mt-5 flex-1 space-y-2">
                                {featureList.map((f) => (
                                  <li key={f} className="flex items-start gap-2 text-sm text-ink-secondary">
                                    <span className="mt-0.5 text-accent-light">✓</span>
                                    <span>{f}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            <p className="mt-10 font-mono text-display-sm font-semibold text-ink">
                              {tier.price}
                            </p>
                            <p className="mt-1 label text-ink-muted">Estimate</p>
                            {tier.timeline && (
                              <p className="mt-1 text-xs text-ink-secondary">Delivery: {tier.timeline}</p>
                            )}
                            <Magnetic className="mt-7">
                              <a href="https://wa.me/919777262734"
                                className="block rounded-sm border border-line px-5 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
                              >
                                Get a quote
                              </a>
                            </Magnetic>
                          </article>
                        </RevealItem>
                      );
                    })}
                  </RevealGroup>
                </div>
              ))}
            </div>
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

      {/* SCENE 04 — TRUST NOTE */}
      <section className="relative border-t border-line bg-bg-surface px-4 py-20 md:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ink-secondary">
              Every price above is a starting estimate, not a final bill — every package is billed
              directly and in the open, with the exact number confirmed before any work begins.
            </p>
            <p className="label text-ink-muted">Registered MSME · UDYAM-OD-19-0172402</p>
          </div>
        </Reveal>
      </section>

      {/* SCENE 05 — FAQ */}
      <section className="relative border-t border-line bg-bg-void px-4 py-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="label text-accent-light">Common questions</p>
            <h2 className="mt-4 text-2xl font-semibold text-ink">Pricing, in plain terms</h2>
          </Reveal>
          <div className="mt-12 space-y-8">
            {faqs.map((faq) => (
              <Reveal key={faq.q}>
                <div className="border-b border-line pb-8">
                  <h3 className="text-base font-semibold text-ink">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE 06 — CTA */}
      <section className="relative border-t border-line bg-bg-deep px-4 py-24 md:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 rounded-sm border border-line bg-bg-surface px-8 py-12 sm:px-12 sm:py-16">
            <p className="label text-accent-light">Not sure which package fits?</p>
            <h2 className="max-w-lg text-2xl font-semibold text-ink sm:text-3xl">
              Book a free consultation and get a quote built around your business.
            </h2>
            <Magnetic>
              <a
                href="https://wa.me/919777262734"
                className="inline-block rounded-sm bg-accent px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Book a free consultation
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}

const faqs = [
  {
    q: 'Are these prices final?',
    a: 'No — they\u2019re starting estimates based on typical projects at each tier. Your exact price is confirmed upfront, before any work begins, based on your specific scope.',
  },
  {
    q: 'What are the payment terms?',
    a: 'Projects are billed in milestones — typically a deposit to begin, with the remainder split across delivery checkpoints. Ongoing support packages are billed monthly.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most Starter-level work wraps in 1\u20132 weeks, Growth-level packages in 3\u20135 weeks, and larger Scale/Enterprise builds in 6\u201310 weeks, depending on scope and how quickly feedback comes back.',
  },
  {
    q: 'Can I upgrade to a higher package later?',
    a: 'Yes. Many clients start with a smaller package and add automations, dashboards, or support later. We\u2019ll credit relevant work already done where it applies.',
  },
  {
    q: 'What if I need a redesign instead of a new build?',
    a: 'Redesigns are scoped the same way as new builds, based on how much of the existing site, automation, or dashboard is being reworked \u2014 contact us for a specific quote.',
  },
  {
    q: 'What support is included after launch?',
    a: 'Every package includes a short post-launch support window. For ongoing help beyond that, our monthly Support packages cover monitoring, updates, and priority fixes.',
  },
];
