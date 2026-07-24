import Link from 'next/link';

const links = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Goodman Consulting</p>
            <p className="mt-2">UDYAM-XX-XXXXXXX • Registered MSME</p>
            <p className="mt-2">hello@goodmanconsulting.com • +91 99999 99999</p>
          </div>
          <nav className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm font-medium text-slate-600 md:justify-end">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-slate-900">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
