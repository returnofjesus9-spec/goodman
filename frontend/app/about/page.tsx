import SiteFooter from '@/components/site-footer';
import { Reveal } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Goodman Consulting',
  description: 'Who we are and why we work with small and medium businesses.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 py-28 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-fade" />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <p className="label text-accent-light">About</p>
            <h1 className="mt-4 text-display-sm font-semibold text-ink text-balance">
              Practical help, without the agency overhead
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-secondary">
              <p>
                Goodman Consulting works with small and medium businesses that need real digital
                support — a clear website, an automation that saves hours a week, a dashboard that
                actually gets used — without paying for a large agency&apos;s overhead.
              </p>
              <p>
                We keep things direct: one point of contact, clear pricing, and work built around
                how your business actually runs day to day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 rounded-sm border border-line bg-bg-surface p-6">
              <p className="label text-ink-muted">Registered business</p>
              <p className="mt-3 font-sans text-lg font-semibold text-ink">
                Registered MSME · UDYAM-OD-19-0172402
              </p>
              <p className="mt-2 text-sm text-ink-secondary">
                Clear pricing · Direct communication · No agency overhead
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/919777262734"
                className="rounded-sm bg-accent px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Chat on WhatsApp
              </a>
              <a
                href="/contact"
                className="rounded-sm border border-line px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-light"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
