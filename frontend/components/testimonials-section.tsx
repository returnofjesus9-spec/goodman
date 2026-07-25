type Testimonial = {
  id: number;
  author_name: string;
  author_business: string | null;
  quote: string;
};

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <section className="border-y border-stone-200 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rust-dark">What clients say</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-ink md:text-4xl">Trusted by small businesses</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <blockquote key={item.id} className="rounded border-l-4 border-navy bg-paper p-6">
              <span className="font-heading text-4xl leading-none text-rust">&ldquo;</span>
              <p className="-mt-2 text-lg text-ink">{item.quote}</p>
              <footer className="mt-4 text-sm font-semibold text-stone-600">
                {item.author_name}
                {item.author_business ? <span className="font-normal text-stone-500"> · {item.author_business}</span> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
