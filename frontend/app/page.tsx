import Link from 'next/link';
import ContactForm from '@/components/contact-form';

const services = [
  {
    title: 'Website Design & Development',
    description: 'Simple, clear websites that help customers understand your work and get in touch.',
  },
  {
    title: 'Business Automation',
    description: 'Forms, reminders, and follow-up steps that save hours every week.',
  },
  {
    title: 'Dashboards & Analytics',
    description: 'Basic reporting so you can see sales, leads, and routine performance without fuss.',
  },
  {
    title: 'Custom Software',
    description: 'Small tools and internal workflows built around how your team actually works.',
  },
];

export default async function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const [caseStudiesRes, pricingRes] = await Promise.all([
    fetch(`${apiUrl}/api/case-studies`, { cache: 'no-store' }),
    fetch(`${apiUrl}/api/pricing`, { cache: 'no-store' }),
  ]);
  const caseStudies = caseStudiesRes.ok ? await caseStudiesRes.json() : [];
  const pricing = pricingRes.ok ? await pricingRes.json() : [];

  return (
    <main>
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:px-8 lg:px-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Goodman Consulting</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
            Practical digital help for growing businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">
            We build clear websites, simple automations, and useful dashboards for small and medium businesses that need support without paying for a large firm.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="https://wa.me/919999999999" className="rounded-full bg-slate-900 px-6 py-3 text-center font-semibold text-white">
              Chat on WhatsApp
            </a>
            <a href="#work" className="rounded-full border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800">
              See our work
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Recent work</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Selected case studies</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {caseStudies.map((item: any) => (
            <article key={item.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.summary}</p>
              <Link href={`/work/${item.slug}`} className="mt-4 inline-flex text-sm font-semibold text-slate-900">
                Read the story →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Trusted by small businesses</p>
          <p className="mt-3 text-lg">Udyam/MSME registration: UDYAM-XX-XXXXXXX</p>
          <p className="mt-2 text-sm text-slate-300">Registered MSME • Clear pricing • Direct communication</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Simple packages</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Choose a package that fits your stage</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {pricing.map((tier: any) => (
            <article key={tier.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{tier.name}</h3>
              <p className="mt-3 text-sm text-slate-600">{tier.description}</p>
              <p className="mt-6 text-3xl font-semibold text-slate-900">{tier.price}</p>
              <a href="#contact" className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                Get a quote
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Talk to us about your next project</h2>
            <p className="mt-4 text-slate-600">Call or WhatsApp us directly for a quick conversation.</p>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <a href="https://wa.me/919999999999" className="block font-semibold text-slate-900">WhatsApp: +91 99999 99999</a>
              <a href="tel:+919999999999" className="block font-semibold text-slate-900">Call: +91 99999 99999</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:px-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Goodman Consulting</p>
          <p className="mt-2">UDYAM-XX-XXXXXXX • Registered MSME</p>
          <p className="mt-2">hello@goodmanconsulting.com • +91 99999 99999</p>
        </div>
      </footer>
    </main>
  );
}
