import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import StageFlow from '@/components/graphics/stage-flow';
import { Parallax, Reveal, TextReveal } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Goodman Consulting',
  description: 'Who we are and why we work with small and medium businesses.',
};

export default function AboutPage() {
  return (
    <main>
      {/* SCENE 01 — HERO */}
      <section className="relative overflow-hidden bg-bg-void px-4 py-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-40" density="fine" fade="bottom" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-fade" />
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <p className="label text-accent-light">About</p>
          </Reveal>
          <h1 className="mt-6 text-display-lg font-semibold text-ink text-balance">
            <TextReveal text="Practical help, without the agency overhead." />
          </h1>
        </div>
      </section>

      {/* SCENE 02 — STORY (editorial column with a running marginal note) */}
      <section className="relative overflow-hidden border-t border-line bg-bg-deep px-4 py-28 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-radial-fade-sm opacity-30" />
        <div className="relative mx-auto grid max-w-3xl gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <Parallax range={20} className="hidden flex-col gap-2 font-mono text-xs text-ink-muted md:flex">
            <span>§01</span>
            <span className="text-ink-muted/60">Who we are</span>
          </Parallax>
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink-secondary">
            <Reveal>
              <p>
                Goodman Consulting works with small and medium businesses that need real digital
                support — a clear website, an automation that saves hours a week, a dashboard that
                actually gets used — without paying for a large agency&rsquo;s overhead.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                We keep things direct: one point of contact, clear pricing, and work built around
                how your business actually runs day to day.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="pt-6">
              <StageFlow stages={['You message us', 'We reply directly', 'Work ships weekly', 'You watch it launch']} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* SCENE 03 — CREDENTIAL (treated like a technical plate, not a card) */}
      <section className="relative border-t border-line bg-bg-surface px-4 py-20 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-sm border border-line bg-bg-raised px-8 py-10 md:px-12 md:py-14">
              <SceneGrid className="opacity-25" density="sparse" fade="none" />
              <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="label text-ink-muted">Registered business</p>
                  <p className="mt-4 font-mono text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    UDYAM-OD-19-0172402
                  </p>
                  <p className="mt-3 text-sm text-ink-secondary">Registered MSME · Bhubaneswar, Odisha</p>
                </div>
                <p className="label text-accent-light md:text-right">
                  Clear pricing
                  <br className="hidden md:block" /> Direct communication
                  <br className="hidden md:block" /> No agency overhead
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCENE 04 — CTA */}
      <section className="relative border-t border-line bg-bg-void px-4 py-16 md:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row">
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
      </section>

      <SiteFooter />
    </main>
  );
}
