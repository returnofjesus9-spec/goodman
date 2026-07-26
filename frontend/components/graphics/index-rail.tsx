'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function RailDot({ progress, pos }: { progress: MotionValue<number>; pos: number }) {
  const opacity = useTransform(progress, [Math.max(0, pos - 0.14), pos, Math.min(1, pos + 0.14)], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [Math.max(0, pos - 0.14), pos], [1, 1.7]);
  return (
    <motion.span
      style={{ opacity, scale, top: `${pos * 100}%` }}
      className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light"
    />
  );
}

/**
 * A vertical index line that tracks scroll progress through its parent's
 * height — the fill and node glow move with the reader instead of animating
 * once on entry, so it reads as a live position indicator rather than a
 * decoration. Meant to sit absolutely inside a `relative` wrapper the same
 * height as the list it indexes.
 */
export default function IndexRail({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-y-0 left-0 hidden w-px md:block" aria-hidden>
      <div className="absolute inset-y-0 left-0 w-px bg-line" />
      <motion.div style={{ scaleY }} className="absolute inset-y-0 left-0 w-px origin-top bg-accent-light/70" />
      {Array.from({ length: count }).map((_, i) => (
        <RailDot key={i} progress={scrollYProgress} pos={count === 1 ? 0 : i / (count - 1)} />
      ))}
    </div>
  );
}
