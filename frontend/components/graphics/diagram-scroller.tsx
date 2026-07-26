'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Wraps a fixed-viewBox SVG diagram so it is never scaled down below its
 * designed size. Below `md`, "shrink to fit" is what was making every label
 * across the site's diagrams unreadable (see mobile audit item B): instead,
 * the diagram keeps its native pixel width and the wrapper scrolls
 * horizontally, the same way the audit's own recommendation (item 8)
 * describes. The wrapper also bleeds past the page's `px-4` gutter on mobile
 * (item C9) so the diagram gets more usable width than the prose beside it,
 * not the same padding.
 *
 * At `md` and above the diagram already has enough room to render at full
 * size within the layout, so scrolling is disabled and the gutter bleed is
 * cancelled — this component only changes behaviour on narrow viewports.
 */
export default function DiagramScroller({
  children,
  width,
  className = '',
}: {
  children: React.ReactNode;
  /** Native pixel width of the diagram's viewBox — the minimum width the scroll track should offer. */
  width: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 4);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className={`relative min-w-0 ${className}`}>
      <div
        ref={trackRef}
        className="-mx-4 overflow-x-auto px-4 pb-1 md:mx-0 md:overflow-visible md:px-0 md:pb-0"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin' }}
      >
        <div style={{ minWidth: width }}>{children}</div>
      </div>
      {scrollable ? (
        <p
          className="pointer-events-none mt-2 text-right text-[10px] uppercase tracking-[0.14em] text-ink-muted md:hidden"
          aria-hidden
        >
          Scroll for more →
        </p>
      ) : null}
    </div>
  );
}
