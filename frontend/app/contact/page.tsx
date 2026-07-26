import ContactForm from '@/components/contact-form';
import SiteFooter from '@/components/site-footer';
import SceneGrid from '@/components/scene-grid';
import { Reveal, TextReveal } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Goodman Consulting',
  description: 'Get in touch about your next website, automation, or dashboard project.',
};

const channels = [
  { label: 'WhatsApp', value: '+91 97772 62734', href: 'https://wa.me/919777262734' },
  { label: 'Call', value: '+91 97772 62734', href: 'tel:+919777262734' },
  { label: 'Email', value: 'help@goodmanconsulting.in', href: 'mailto:help@goodmanconsulting.in' },
];

export default function ContactPage() {
  return (
    <main>
      {/* SCENE 01 — HERO */}
      <section className="relative overflow-hidden bg-bg-void px-4 py-32 md:px-8 lg:px-12">
        <SceneGrid className="opacity-25" density="fine" fade="bottom" scanline={false} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="label text-accent-light">Contact</p>
          </Reveal>
          <h1 className="mt-6 max-w-2xl text-display-lg font-semibold text-ink text-balance">
            <TextReveal text="Talk to us about your next project." />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-secondary">
              Call or WhatsApp us directly for a quick conversation, or send the details below and
              we&rsquo;ll reply the same way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SCENE 02 — CHANNELS + FORM (split, not two stacked cards) */}
      <section className="relative border-t border-line bg-bg-deep px-4 py-24 md:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div>
              <p className="label text-ink-muted">Direct lines</p>
              <div className="mt-8 flex flex-col">
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="group flex items-baseline justify-between gap-4 border-t border-line py-6 last:border-b transition-colors hover:text-accent-light"
                  >
                    <span className="label text-ink-muted group-hover:text-accent-light">{channel.label}</span>
                    <span className="text-lg font-semibold text-ink transition-colors group-hover:text-accent-light">
                      {channel.value}
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-10 max-w-sm text-sm leading-relaxed text-ink-secondary">
                Messages go straight to the person doing the work — no account manager in between.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
