import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Goodman Consulting',
  description: 'Website design, business automation, dashboards, and custom software for growing businesses.',
};

const services = [
  {
    index: '01',
    title: 'Website Design & Development',
    description:
      'Simple, clear websites that help customers understand your work and get in touch — built fast, and built to last.',
    points: ['Custom design, no cookie-cutter templates', 'Mobile-first and fast-loading', 'Easy for you to update later'],
  },
  {
    index: '02',
    title: 'Business Automation',
    description: 'Forms, reminders, and follow-up steps that save hours every week by removing manual busywork.',
    points: ['Lead capture and follow-up automation', 'Reminders and scheduled notifications', 'Connects to the tools you already use'],
  },
  {
    index: '03',
    title: 'Dashboards & Analytics',
    description: 'Basic reporting so you can see sales, leads, and routine performance without fuss.',
    points: ['Live view of sales and leads', 'Simple, readable charts', 'No data-science degree required'],
  },
  {
    index: '04',
    title: 'Custom Software',
    description: 'Small tools and internal workflows built around how your team actually works, not the other way round.',
    points: ['Internal tools and admin panels', 'Workflow-specific, not off-the-shelf', 'Built to grow with your business'],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 py-28 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Services</p>
            <h1 className="mt-4 max-w-2xl text-display-sm font-semibold text-ink text-balance">
              What we can build for you
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-secondary">
              Four focused services, each built to solve a specific problem for small and medium
              businesses.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
            {services.map((service) => (
              <RevealItem key={service.title}>
                <article className="h-full bg-bg-surface p-8">
                  <span className="font-mono text-xs text-ink-muted">{service.index}</span>
                  <h2 className="mt-6 font-sans text-xl font-semibold text-ink">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{service.description}</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-ink-secondary">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/919777262734"
                className="rounded-sm bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/pricing"
                className="rounded-sm border border-line px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
              >
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
