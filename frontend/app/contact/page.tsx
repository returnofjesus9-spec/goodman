import ContactForm from '@/components/contact-form';
import SiteFooter from '@/components/site-footer';
import { Reveal } from '@/components/motion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Goodman Consulting',
  description: 'Get in touch about your next website, automation, or dashboard project.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 py-28 md:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-fade" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="rounded-sm border border-line bg-bg-surface p-8">
                <p className="label text-accent-light">Contact</p>
                <h1 className="mt-4 text-display-sm font-semibold text-ink">Talk to us about your next project</h1>
                <p className="mt-5 text-ink-secondary">Call or WhatsApp us directly for a quick conversation.</p>
                <div className="mt-7 space-y-3 text-sm">
                  <a href="https://wa.me/919777262734" className="block font-semibold text-ink transition-colors hover:text-accent-light">
                    WhatsApp: +91 97772 62734
                  </a>
                  <a href="tel:+919777262734" className="block font-semibold text-ink transition-colors hover:text-accent-light">
                    Call: +91 97772 62734
                  </a>
                  <a href="mailto:help@goodmanconsulting.in" className="block font-semibold text-ink transition-colors hover:text-accent-light">
                    Email: help@goodmanconsulting.in
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
