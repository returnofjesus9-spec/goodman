import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import TopologyOverview from '@/components/graphics/topology-overview';
import DiagramScroller from '@/components/graphics/diagram-scroller';
import { ClipReveal, Magnetic, Reveal, TextReveal } from '@/components/motion';
import { AutomationGlyph, CustomGlyph, DashboardGlyph, WebsiteGlyph } from '@/components/service-glyphs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Goodman Consulting',
  description: 'Website design, business automation, dashboards, and custom software for growing businesses.',
};

const services = [
  {
    index: '01',
    title: 'Websites',
    longTitle: 'Website design & development',
    description:
      'Simple, clear websites that help customers understand your work and get in touch — built fast, and built to last.',
    points: ['Custom design, no cookie-cutter templates', 'Mobile-first and fast-loading', 'Easy for you to update later'],
    Glyph: WebsiteGlyph,
  },
  {
    index: '02',
    title: 'Automation',
    longTitle: 'Business automation',
    description: 'Forms, reminders, and follow-up steps that save hours every week by removing manual busywork.',
    points: ['Lead capture and follow-up automation', 'Reminders and scheduled notifications', 'Connects to the tools you already use'],
    Glyph: AutomationGlyph,
  },
  {
    index: '03',
    title: 'Dashboards',
    longTitle: 'Dashboards & analytics',
    description: 'Basic reporting so you can see sales, leads, and routine performance without fuss.',
    points: ['Live view of sales and leads', 'Simple, readable charts', 'No data-science degree required'],
    Glyph: DashboardGlyph,
  },
  {
    index: '04',
    title: 'Custom software',
    longTitle: 'Custom software',
    description: 'Small tools and internal workflows built around how your team actually works, not the other way round.',
    points: ['Internal tools and admin panels', 'Workflow-specific, not off-the-shelf', 'Built to grow with your business'],
    Glyph: CustomGlyph,
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* SCENE 01 — HERO */}
      <section className="relative overflow-hidden px-4 py-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-40" density="regular" fade="bottom" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-fade" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="label text-accent-light">Services · 04</p>
            </Reveal>
            <h1 className="mt-6 max-w-3xl text-display-lg font-semibold text-ink">
              <TextReveal text="What we can build for you." />
            </h1>
            <Reveal delay={0.35}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-secondary">
                Four focused services, each built to solve one specific problem for small and medium
                businesses — not a menu of everything.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="min-w-0">
            <DiagramScroller width={460}>
              <TopologyOverview />
            </DiagramScroller>
          </Reveal>
        </div>
      </section>

      {/* SCENE 02 — SERVICES (alternating rows, each with its own glyph) */}
      <section className="relative border-t border-line px-4 py-4 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col">
          {services.map(({ Glyph, ...service }, i) => (
            <Reveal key={service.title}>
              <article className="grid items-center gap-10 border-t border-line py-16 last:border-b md:grid-cols-[auto_1fr_auto] md:gap-14">
                <div className={i % 2 === 1 ? 'md:order-3' : ''}>
                  <Glyph />
                </div>

                <div>
                  <span className="font-mono text-xs text-ink-muted">{service.index}</span>
                  <h2 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">{service.title}</h2>
                  <p className="mt-2 text-sm font-medium text-ink-muted">{service.longTitle}</p>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-secondary">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2.5 text-sm text-ink-secondary">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  className={`hidden font-mono text-[10px] uppercase tracking-label text-ink-muted md:block ${
                    i % 2 === 1 ? 'md:order-1' : ''
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} / 04
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SCENE 03 — CTA */}
      <section className="relative border-t border-line px-4 py-28 md:px-8 lg:px-12">
        <ClipReveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-sm border border-line bg-bg-surface px-8 py-16 text-center">
            <SceneGrid className="opacity-30" density="fine" fade="none" />
            <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" />
            <div className="relative">
              <p className="label text-accent-light">Ready when you are</p>
              <h2 className="mx-auto mt-5 max-w-xl text-display-sm font-semibold text-ink">
                Tell us the problem. We&rsquo;ll tell you which of these solves it.
              </h2>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
        </ClipReveal>
      </section>

      <SiteFooter />
    </main>
  );
}
