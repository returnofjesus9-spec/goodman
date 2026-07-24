import ContactForm from '@/components/contact-form';
import SiteFooter from '@/components/site-footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Goodman Consulting',
  description: 'Get in touch about your next website, automation, or dashboard project.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Talk to us about your next project</h1>
            <p className="mt-4 text-slate-600">Call or WhatsApp us directly for a quick conversation.</p>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <a href="https://wa.me/919999999999" className="block font-semibold text-slate-900">WhatsApp: +91 99999 99999</a>
              <a href="tel:+919999999999" className="block font-semibold text-slate-900">Call: +91 99999 99999</a>
              <a href="mailto:hello@goodmanconsulting.com" className="block font-semibold text-slate-900">
                Email: hello@goodmanconsulting.com
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
