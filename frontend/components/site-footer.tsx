import Link from 'next/link';
import { Reveal } from '@/components/motion';

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
    <footer className="relative border-t border-line bg-bg-deep">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 lg:px-12">
        <Reveal>
          <div className="grid gap-12 border-b border-line pb-12 md:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <p className="font-sans text-lg font-semibold tracking-tight text-ink">Goodman Consulting</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-secondary">
                Practical websites, automation, and dashboards for small and medium businesses —
                built with the discipline of an enterprise engineering team.
              </p>
              <p className="label mt-6">UDYAM-OD-19-0172402 · Registered MSME</p>
            </div>

            <div>
              <p className="label">Navigate</p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="w-fit text-sm text-ink-secondary transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="label">Contact</p>
              <div className="mt-4 flex flex-col gap-2.5 text-sm text-ink-secondary">
                <a href="mailto:help@goodmanconsulting.in" className="w-fit transition-colors hover:text-ink">
                  help@goodmanconsulting.in
                </a>
                <a href="tel:+919777262734" className="w-fit transition-colors hover:text-ink">
                  +91 97772 62734
                </a>
                <a href="https://wa.me/919777262734" className="w-fit transition-colors hover:text-ink">
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/good.manconsulting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit transition-colors hover:text-ink"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3 pt-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Goodman Consulting. All rights reserved.</p>
          <p className="font-mono uppercase tracking-label">Bhubaneswar, Odisha</p>
        </div>
      </div>
    </footer>
  );
}
