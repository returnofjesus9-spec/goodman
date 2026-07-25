type Testimonial = {
  id: number;
  author_name: string;
  author_business: string | null;
  quote: string;
};

export default function TestimonialsSection({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <section className="border-y border-teal/20 bg-teal/5 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">What clients say</p>
        <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">Trusted by small businesses</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-lg border-l-4 border-teal bg-white p-6 shadow-sm"
            >
              <p className="text-lg text-ink">&ldquo;{item.quote}&rdquo;</p>
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
