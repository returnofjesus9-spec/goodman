import { Reveal, RevealGroup, RevealItem } from '@/components/motion';

type Testimonial = {
  id: number;
  author_name: string;
  author_business: string | null;
  quote: string;
};

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <section className="border-t border-line bg-bg-deep px-4 py-24 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="label text-accent-light">What clients say</p>
          <h2 className="mt-4 max-w-xl text-display-sm font-semibold text-ink">Trusted by local businesses</h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <RevealItem key={item.id}>
              <blockquote className="relative h-full rounded-sm border border-line bg-bg-surface p-8">
                <span className="font-mono text-4xl leading-none text-accent">&ldquo;</span>
                <p className="-mt-2 text-lg leading-relaxed text-ink">{item.quote}</p>
                <footer className="mt-6 text-sm font-semibold text-ink-secondary">
                  {item.author_name}
                  {item.author_business ? <span className="font-normal text-ink-muted"> · {item.author_business}</span> : null}
                </footer>
              </blockquote>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
