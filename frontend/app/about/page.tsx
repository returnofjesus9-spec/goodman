import SiteFooter from '@/components/site-footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Goodman Consulting',
  description: 'Who we are and why we work with small and medium businesses.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">About</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
          Practical help, without the agency overhead
        </h1>

        <div className="mt-8 space-y-5 text-lg text-slate-600">
          <p>
            Goodman Consulting works with small and medium businesses that need real digital
            support — a clear website, an automation that saves hours a week, a dashboard that
            actually gets used — without paying for a large agency's overhead.
          </p>
          <p>
            We keep things direct: one point of contact, clear pricing, and work built around how
            your business actually runs day to day.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Registered business</p>
          <p className="mt-3 text-lg">Registered MSME • UDYAM-XX-XXXXXXX</p>
          <p className="mt-2 text-sm text-slate-300">Clear pricing • Direct communication • No agency overhead</p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="https://wa.me/919999999999" className="rounded-full bg-slate-900 px-6 py-3 text-center font-semibold text-white">
            Chat on WhatsApp
          </a>
          <a href="/contact" className="rounded-full border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800">
            Get in touch
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
