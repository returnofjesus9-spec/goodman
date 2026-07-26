import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import TestimonialsSection from '@/components/testimonials-section';
import ArchitectureDiagram from '@/components/architecture-diagram';
import IndexRail from '@/components/graphics/index-rail';
import ProcessPipeline from '@/components/graphics/process-pipeline';
import DiagramScroller from '@/components/graphics/diagram-scroller';
import SceneGrid from '@/components/scene-grid';
import {
  Counter,
  Magnetic,
  Parallax,
  Reveal,
  RevealGroup,
  RevealItem,
  TextReveal,
} from '@/components/motion';

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
    description:
      'Clear, fast sites built to convert visitors into conversations — no bloated templates, no filler sections.',
    detail: 'Client-facing',
    href: '/services',
  },
  {
    index: '02',
    title: 'Automation',
    description: 'Lead capture, follow-ups, and reminders that run themselves in the background, every day.',
    detail: 'Background',
    href: '/services',
  },
  {
    index: '03',
    title: 'Dashboards',
    description: 'Live, readable views of sales and leads — the handful of numbers that actually matter.',
    detail: 'Visibility',
    href: '/services',
  },
  {
    index: '04',
    title: 'Custom systems',
    description: 'Internal tools shaped around how your team already operates, not the other way round.',
    detail: 'Internal',
    href: '/services',
  },
];

const stats = [
  { value: 100, suffix: '%', label: 'Direct communication, no account managers' },
  { value: 4, suffix: '', label: 'Focused service lines, nothing scattered' },
  { value: 24, suffix: 'hr', label: 'Typical response time on WhatsApp' },
];

const processSteps = [
  {
    index: '01',
    title: 'Discovery',
    description: 'We look at how the business actually runs before proposing anything — no template pitch.',
  },
  {
    index: '02',
    title: 'Build',
    description: 'Work ships in visible, working pieces. You see progress every week, not one big reveal.',
  },
  {
    index: '03',
    title: 'Launch',
    description: 'We go live directly with you watching it work — no handover document, no disappearing act.',
  },
  {
    index: '04',
    title: 'Support',
    description: 'One WhatsApp line to the person who built it. No ticket queue, no tiers.',
  },
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

  const recentWork = caseStudies.slice(0, 3);

  return (
    <main>
      {/* SCENE 01 — HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-bg-void px-4 pb-16 pt-28 md:px-8 lg:px-12">
        <SceneGrid density="regular" fade="bottom" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-radial-fade" />
        <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 animate-drift-slow rounded-full bg-accent/[0.06] blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="label flex items-center gap-2 text-accent-light">
              <span className="h-1.5 w-1.5 animate-pulse-slow bg-accent" />
              Goodman Consulting · Bhubaneswar
            </p>
          </Reveal>

          <h1 className="mt-8 max-w-5xl text-display-xl font-semibold text-ink">
            <TextReveal text="Practical infrastructure." />
            <br />
            <TextReveal text="Nothing you don't need." />
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-9 max-w-lg text-lg leading-relaxed text-ink-secondary">
              Clear websites, dependable automation, and dashboards that get used — engineered with
              the discipline of a large firm, without the overhead or the noise.
            </p>
          </Reveal>

          <Reveal delay={0.52}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <a
                  href="https://wa.me/919777262734"
                  className="block rounded-sm bg-accent px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  Chat on WhatsApp
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/work"
                  className="block rounded-sm border border-line px-7 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
                >
                  See our work
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* scroll indicator */}
        <Reveal delay={0.9} className="relative mx-auto mt-20 w-full max-w-6xl">
          <div className="flex items-center gap-3 text-ink-muted">
            <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
              <span className="h-1.5 w-1 animate-bounce rounded-full bg-accent-light" />
            </span>
            <span className="label">Scroll</span>
          </div>
        </Reveal>
      </section>

      {/* SCENE 02 — MISSION (centered statement) */}
      {/* Deliberately no grid here — this is the "airy" beat between the
          textured hero and the architectural diagram section below, just a
          faint glow so the page doesn't read as a hard cut to flat black. */}
      <section className="relative overflow-hidden border-t border-line bg-bg-deep px-4 py-20 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade-sm opacity-40" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="label text-accent-light">Philosophy</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-display-sm font-semibold leading-[1.15] text-ink">
              Most small businesses don&rsquo;t need more software.
              <span className="text-ink-muted"> They need the software they already paid for to actually get used.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCENE 03 — LARGE STATEMENT (split, editorial) */}
      <section className="relative overflow-hidden border-t border-line bg-bg-surface px-4 py-32 md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <Parallax range={24} className="hidden flex-col gap-2 font-mono text-xs text-ink-muted md:flex">
            <span>§01</span>
            <span className="text-ink-muted/60">Our standard</span>
          </Parallax>
          <Reveal>
            <p className="max-w-3xl text-display-md font-semibold leading-[1.05] text-ink text-balance">
              We ask one question before writing any code — will someone actually use this in six
              months, or does it just look good in a demo?
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCENE 04 — INTERACTIVE VISUAL (architecture) */}
      {/* The diagram is the compositional anchor of this section, not a
          side-by-side companion to the text — it gets its own wide measure,
          generous top/bottom air, and a soft sparse grid + light wash so it
          reads as a real instrument panel rather than a figure squeezed
          beside a paragraph. */}
      <section className="relative overflow-hidden border-t border-line bg-bg-deep px-4 py-32 md:px-8 lg:px-12 lg:py-40">
        <SceneGrid className="opacity-25" density="sparse" fade="both" />
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="label text-accent-light">How it connects</p>
            <h2 className="mt-4 text-display-sm font-semibold text-ink">One operating core. Four ways in.</h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ink-secondary">
              Each system we build feeds the same place — your business. A website that brings people
              in, automation that follows up without you, a dashboard that shows what&rsquo;s working,
              and custom tools where the rest doesn&rsquo;t fit. Separate pieces, one picture.
            </p>
          </Reveal>
        </div>
        <div className="relative mx-auto mt-20 max-w-4xl">
          <DiagramScroller width={760}>
            <ArchitectureDiagram />
          </DiagramScroller>
        </div>
      </section>

      {/* SCENE 05 — CAPABILITIES (alternating full-width rows) */}
      <section className="relative overflow-hidden border-t border-line bg-bg-surface px-4 py-24 md:px-8 lg:px-12">
        <SceneGrid className="opacity-20" density="sparse" fade="both" scanline={false} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Capabilities</p>
            <h2 className="mt-4 max-w-2xl text-display-sm font-semibold text-ink">
              Four systems. One consistent way of working.
            </h2>
          </Reveal>

          <div className="relative mt-20 flex flex-col pl-4 md:pl-8">
            <IndexRail count={capabilities.length} />
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title}>
                <Link
                  href={cap.href}
                  className={`group grid items-center gap-6 border-t border-line py-12 transition-colors hover:bg-bg-raised/40 md:grid-cols-[auto_1fr_auto] md:gap-12 ${
                    i % 2 === 1 ? 'md:text-right' : ''
                  }`}
                >
                  <span
                    className={`font-mono text-sm text-ink-muted md:row-span-2 ${i % 2 === 1 ? 'md:order-3' : ''}`}
                  >
                    {cap.index}
                  </span>
                  <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                    <h3 className="text-2xl font-semibold text-ink transition-colors group-hover:text-accent-light md:text-4xl">
                      {cap.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-secondary md:max-w-lg">
                      {cap.description}
                    </p>
                  </div>
                  <span
                    className={`label whitespace-nowrap text-ink-muted md:order-1 ${i % 2 === 1 ? '' : 'md:text-right'}`}
                  >
                    {cap.detail}
                  </span>
                </Link>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>
      </section>

      {/* SCENE 06 — MASSIVE STATS */}
      <section className="relative overflow-hidden border-t border-line bg-bg-raised px-4 py-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-60" density="sparse" fade="both" />
        <div className="relative mx-auto max-w-6xl">
          <RevealGroup className="grid grid-cols-1 place-items-center gap-16 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="flex flex-col items-center">
                <p className="font-mono text-display-stat-grid font-semibold text-ink">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-4 max-w-[24ch] text-sm text-ink-secondary">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SCENE 07 — PROCESS TIMELINE */}
      <section className="relative border-t border-line bg-bg-deep px-4 py-28 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">How we work</p>
            <h2 className="mt-4 max-w-xl text-display-sm font-semibold text-ink">
              Four stages. No surprises in between.
            </h2>
          </Reveal>

          <div className="mt-20">
            <DiagramScroller width={1040}>
              <ProcessPipeline steps={processSteps.map(({ index, title }) => ({ index, title }))} />
            </DiagramScroller>
          </div>

          <RevealGroup className="relative mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line lg:border-t-0 lg:pt-0 md:mt-10">
            {processSteps.map((step) => (
              <RevealItem key={step.index} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <span className="font-mono text-xs text-accent-light">{step.index}</span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{step.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SCENE 08 — CASE STUDIES */}
      {recentWork.length ? (
        <section className="relative border-t border-line bg-bg-surface px-4 py-28 md:px-8 lg:px-12">
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

            <div className="mt-16 flex flex-col">
              {recentWork.map((item, i) => (
                <Reveal key={item.slug}>
                  <Link
                    href={`/work/${item.slug}`}
                    className="group grid items-center gap-6 border-t border-line py-10 transition-colors hover:bg-bg-raised/40 md:grid-cols-[auto_1fr_auto]"
                  >
                    <span className="font-mono text-sm text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-ink transition-colors group-hover:text-accent-light md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-secondary">{item.summary}</p>
                    </div>
                    <span className="inline-flex text-sm font-semibold text-accent-light opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                      Read case study →
                    </span>
                  </Link>
                </Reveal>
              ))}
              <div className="border-t border-line" />
            </div>
          </div>
        </section>
      ) : null}

      <TestimonialsSection items={testimonials} />

      {/* SCENE 09 — CTA */}
      <section className="relative border-t border-line bg-bg-void px-4 py-28 md:px-8 lg:px-12">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-sm border border-line bg-bg-surface px-8 py-20 text-center">
            <SceneGrid className="opacity-30" density="fine" fade="none" />
            <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" />
            <div className="relative">
              <p className="label text-accent-light">Registered MSME · UDYAM-OD-19-0172402</p>
              <h2 className="mx-auto mt-5 max-w-2xl text-display-md font-semibold text-ink">
                Clear pricing. Direct communication.
              </h2>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <a
                    href="https://wa.me/919777262734"
                    className="block rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                  >
                    Chat on WhatsApp
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/pricing"
                    className="block rounded-sm border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
                  >
                    See pricing
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
