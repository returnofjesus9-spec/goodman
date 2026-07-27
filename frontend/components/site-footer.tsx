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

                {/* Follow us section for social links (place to add more later) */}
                <div className="mt-4">
                  <p className="label">Follow us</p>
                  <div className="mt-2 flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/good.manconsulting/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram (opens in a new tab)"
                      className="flex items-center gap-2 w-fit transition-colors hover:text-ink"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-ink-secondary"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 4.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 6.5zM18.7 6.6a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z" />
                        <circle cx="12" cy="13" r="2.6" fill="currentColor" />
                      </svg>
                      <span className="text-sm">Instagram</span>
                    </a>
                  </div>
                </div>
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
