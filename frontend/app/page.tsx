import Link from 'next/link';
import SiteFooter from '@/components/site-footer';

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:px-8 lg:px-12 md:py-24">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Goodman Consulting</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
            Practical digital help for growing businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            Clear websites, simple automations, and useful dashboards — built for small and medium
            businesses that need real support without a large-firm price tag.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/919999999999"
              className="rounded-full bg-slate-900 px-6 py-3 text-center font-semibold text-white"
            >
              Chat on WhatsApp
            </a>
            <Link href="/work" className="rounded-full border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800">
              See our work
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/services" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
            <h2 className="text-lg font-semibold text-slate-900">Services</h2>
            <p className="mt-2 text-sm text-slate-600">Websites, automation, dashboards, and custom tools.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-slate-900">Explore services →</span>
          </Link>
          <Link href="/pricing" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
            <h2 className="text-lg font-semibold text-slate-900">Pricing</h2>
            <p className="mt-2 text-sm text-slate-600">Simple packages that fit wherever your business is at.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-slate-900">See packages →</span>
          </Link>
          <Link href="/work" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300">
            <h2 className="text-lg font-semibold text-slate-900">Our work</h2>
            <p className="mt-2 text-sm text-slate-600">Real projects for real businesses — see the results.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-slate-900">View case studies →</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Trusted by small businesses</p>
          <p className="mt-3 text-lg">Registered MSME • UDYAM-XX-XXXXXXX</p>
          <p className="mt-2 text-sm text-slate-300">Clear pricing • Direct communication • No agency overhead</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
