import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — Goodman Consulting',
  description: 'Website design, business automation, dashboards, and custom software for growing businesses.',
};

const services = [
  {
    title: 'Website Design & Development',
    description:
      'Simple, clear websites that help customers understand your work and get in touch — built fast, and built to last.',
    points: ['Custom design, no cookie-cutter templates', 'Mobile-first and fast-loading', 'Easy for you to update later'],
  },
  {
    title: 'Business Automation',
    description: 'Forms, reminders, and follow-up steps that save hours every week by removing manual busywork.',
    points: ['Lead capture and follow-up automation', 'Reminders and scheduled notifications', 'Connects to the tools you already use'],
  },
  {
    title: 'Dashboards & Analytics',
    description: 'Basic reporting so you can see sales, leads, and routine performance without fuss.',
    points: ['Live view of sales and leads', 'Simple, readable charts', 'No data-science degree required'],
  },
  {
    title: 'Custom Software',
    description: 'Small tools and internal workflows built around how your team actually works, not the other way round.',
    points: ['Internal tools and admin panels', 'Workflow-specific, not off-the-shelf', 'Built to grow with your business'],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Services</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">What we can build for you</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Four focused services, each built to solve a specific problem for small and medium businesses.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-slate-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="https://wa.me/919999999999" className="rounded-full bg-slate-900 px-6 py-3 text-center font-semibold text-white">
            Chat on WhatsApp
          </a>
          <Link href="/pricing" className="rounded-full border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800">
            See pricing
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
