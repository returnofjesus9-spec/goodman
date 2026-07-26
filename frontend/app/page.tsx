import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import TestimonialsSection from '@/components/testimonials-section';
import { Counter, Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/motion';

type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  summary: string;
};

type Testimonial = {
  id: number;
  author_name: string;
  author_business: string | null;
  quote: string;
};

const capabilities = [
  {
    index: '01',
    title: 'Websites',
    description: 'Clear, fast sites built to convert visitors into conversations — no bloated templates.',
    href: '/services',
  },
  {
    index: '02',
    title: 'Automation',
    description: 'Lead capture, follow-ups, and reminders that run themselves in the background.',
    href: '/services',
  },
  {
    index: '03',
    title: 'Dashboards',
    description: 'Live, readable views of sales and leads — the numbers that actually matter.',
    href: '/services',
  },
  {
    index: '04',
    title: 'Custom systems',
    description: 'Internal tools shaped around how your team already operates.',
    href: '/services',
  },
];

const stats = [
  { value: 100, suffix: '%', label: 'Direct communication, no account managers' },
  { value: 4, suffix: '', label: 'Focused service lines, nothing scattered' },
  { value: 24, suffix: 'hr', label: 'Typical response time on WhatsApp' },
];

export default async function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  let caseStudies: CaseStudy[] = [];
  try {
    const res = await fetch(`${apiUrl}/api/case-studies`, { cache: 'no-store' });
    if (res.ok) caseStudies = await res.json();
  } catch {
    caseStudies = [];
  }

  let testimonials: Testimonial[] = [];
  try {
    const res = await fetch(`${apiUrl}/api/testimonials`, { cache: 'no-store' });
    if (res.ok) testimonials = await res.json();
  } catch {
    testimonials = [];
  }

  const recentWork = caseStudies.slice(0, 2);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-24 pt-28 md:px-8 md:pt-40 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label flex items-center gap-2 text-accent-light">
              <span className="h-1.5 w-1.5 bg-accent" />
              Goodman Consulting · Bhubaneswar
            </p>
          </Reveal>

          <h1 className="mt-6 max-w-4xl text-display-lg font-semibold text-ink text-balance">
            <TextReveal text="Practical digital infrastructure for growing businesses." />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-secondary">
              Clear websites, dependable automation, and dashboards that get used — engineered with
              the same discipline as a large firm, without the overhead or the noise.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/919777262734"
                className="group relative overflow-hidden rounded-sm bg-accent px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/work"
                className="rounded-sm border border-line px-7 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
              >
                See our work
              </Link>
            </div>
          </Reveal>

          {/* animated stat row */}
          <RevealGroup className="mt-20 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {stats.map((stat) => (
              <RevealItem key={stat.label}>
                <p className="font-mono text-4xl font-semibold text-ink">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 max-w-[22ch] text-sm text-ink-secondary">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-line px-4 py-24 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Capabilities</p>
            <h2 className="mt-4 max-w-2xl text-display-sm font-semibold text-ink">
              Four systems. One consistent way of working.
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => (
              <RevealItem key={cap.title}>
                <Link
                  href={cap.href}
                  className="group flex h-full flex-col justify-between bg-bg-surface p-7 transition-colors duration-300 hover:bg-bg-secondary"
                >
                  <span className="font-mono text-xs text-ink-muted">{cap.index}</span>
                  <div className="mt-10">
                    <h3 className="font-sans text-lg font-semibold text-ink">{cap.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{cap.description}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Explore →
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* RECENT WORK */}
      {recentWork.length ? (
        <section className="border-t border-line px-4 py-24 md:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="label text-accent-light">Recent work</p>
                  <h2 className="mt-4 max-w-xl text-display-sm font-semibold text-ink">Selected engagements</h2>
                </div>
                <Link href="/work" className="text-sm font-semibold text-ink-secondary transition-colors hover:text-ink">
                  View all work →
                </Link>
              </div>
            </Reveal>

            <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
              {recentWork.map((item) => (
                <RevealItem key={item.slug}>
                  <Link
                    href={`/work/${item.slug}`}
                    className="group block h-full rounded-sm border border-line bg-bg-surface p-8 transition-colors duration-300 hover:border-accent/40"
                  >
                    <h3 className="font-sans text-xl font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{item.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-light">
                      Read case study →
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}

      <TestimonialsSection items={testimonials} />

      {/* CTA */}
      <section className="border-t border-line px-4 py-24 md:px-8 lg:px-12">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-sm border border-line bg-bg-surface px-8 py-16 text-center">
            <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" />
            <div className="relative">
              <p className="label text-accent-light">Registered MSME · UDYAM-OD-19-0172402</p>
              <h2 className="mx-auto mt-5 max-w-2xl text-display-sm font-semibold text-ink">
                Clear pricing. Direct communication. No agency overhead.
              </h2>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="https://wa.me/919777262734"
                  className="rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  Chat on WhatsApp
                </a>
                <Link
                  href="/pricing"
                  className="rounded-sm border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
