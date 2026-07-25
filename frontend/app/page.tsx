import Link from 'next/link';
import SiteFooter from '@/components/site-footer';
import TestimonialsSection from '@/components/testimonials-section';

type CaseStudy = {
  id: number;
  title: string;
  slug: string;
  summary: string;
};

type Testimonial = {
  id: number;
  author_name: string;
  author_business: string | null;
  quote: string;
};

export default async function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  let caseStudies: CaseStudy[] = [];
  try {
    const res = await fetch(`${apiUrl}/api/case-studies`, { cache: 'no-store' });
    if (res.ok) caseStudies = await res.json();
  } catch {
    caseStudies = [];
  }

  let testimonials: Testimonial[] = [];
  try {
    const res = await fetch(`${apiUrl}/api/testimonials`, { cache: 'no-store' });
    if (res.ok) testimonials = await res.json();
  } catch {
    testimonials = [];
  }

  const recentWork = caseStudies.slice(0, 2);

  return (
    <main>
      <section className="mx-auto flex max-w-6xl flex-col gap-14 px-4 pb-16 pt-16 md:px-8 lg:px-12 md:pt-24">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
            <span className="h-2 w-2 bg-gold" />
            Goodman Consulting · Bhubaneswar
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-ink md:text-7xl">
            Practical digital help for growing businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-600">
            Clear websites, simple automations, and useful dashboards — built for small and medium
            businesses that need real support without a large-firm price tag.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/919777262734"
              className="rounded-sm bg-ink px-6 py-3 text-center font-semibold text-white hover:bg-stone-800"
            >
              Chat on WhatsApp
            </a>
            <Link href="/work" className="rounded-sm border border-stone-300 px-6 py-3 text-center font-semibold text-ink hover:border-ink">
              See our work
            </Link>
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-3">
          <Link href="/services" className="bg-white p-6 transition hover:bg-stone-50">
            <h2 className="text-lg font-semibold text-ink">Services</h2>
            <p className="mt-2 text-sm text-stone-600">Websites, automation, dashboards, and custom tools.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-gold">Explore services →</span>
          </Link>
          <Link href="/pricing" className="bg-white p-6 transition hover:bg-stone-50">
            <h2 className="text-lg font-semibold text-ink">Pricing</h2>
            <p className="mt-2 text-sm text-stone-600">Simple packages that fit wherever your business is at.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-gold">See packages →</span>
          </Link>
          <Link href="/work" className="bg-white p-6 transition hover:bg-stone-50">
            <h2 className="text-lg font-semibold text-ink">Our work</h2>
            <p className="mt-2 text-sm text-stone-600">Real projects for real businesses — see the results.</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-gold">View case studies →</span>
          </Link>
        </div>

        {recentWork.length ? (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Recent work</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {recentWork.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="rounded-lg border border-stone-200 bg-white p-6 transition hover:border-ink"
                >
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-stone-600">{item.summary}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-gold">Read case study →</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Trusted by small businesses</p>
            <p className="mt-2 text-lg text-ink">Registered MSME · UDYAM-OD-19-0172402</p>
          </div>
          <p className="text-sm text-stone-600">Clear pricing · Direct communication · No agency overhead</p>
        </div>
      </section>

      <TestimonialsSection items={testimonials} />

      <SiteFooter />
    </main>
  );
}
