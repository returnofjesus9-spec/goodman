'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

/** Word-by-word mask reveal for headlines */
export function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.045, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.4,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // A fixed '-80px' margin here previously excluded an 80px band on every
  // edge of the viewport before counting as "in view". On a short mobile
  // screen that band can eat a large share of the visible area, so a stat
  // could land in the excluded zone and never cross the trigger threshold —
  // permanently stuck at its initial 0. Triggering as soon as any part of
  // the element is on screen removes that dead zone.
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(
    () =>
      spring.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
        }
      }),
    [spring, prefix, suffix]
  );

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/** Magnetic hover wrapper for buttons */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
  }

  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-smooth ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

/** Drifts children vertically as the viewport passes over them — cheap, GPU-only parallax. */
export function Parallax({
  children,
  className,
  range = 60,
}: {
  children: React.ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Wipes a panel into view with a hard edge, like a shutter opening — for full-bleed panels/images. */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: 'bottom' | 'left' | 'right';
}) {
  const hidden =
    from === 'left' ? 'inset(0 100% 0 0)' : from === 'right' ? 'inset(0 0 0 100%)' : 'inset(0 0 100% 0)';
  return (
    <motion.div
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Traces an SVG path stroke-on as it scrolls into view — for schematic/architecture diagrams. */
type DrawPathProps = {
  d: string;
  delay?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  className?: string;
};

export function DrawPath({ delay = 0, ...rest }: DrawPathProps) {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.path
      ref={ref}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ duration: 1.4, delay, ease: EASE }}
      {...rest}
    />
  );
}

/**
 * Tracks how far a diagram has scrolled through a fixed "reading window" of the
 * viewport (from just entering at the bottom to settled a quarter of the way
 * down) and returns that as a 0→1 MotionValue. This is the shared clock every
 * technical diagram on the site reads from: connectors, node illumination, and
 * signal travel all derive their state from the same value, so a diagram
 * assembles in step with the reader's scroll instead of auto-playing once on
 * entry. Unlike ScrollScene, nothing is pinned — the diagram just scrolls
 * normally while quietly finishing its assembly as it passes through view.
 */
export function useDiagramProgress<T extends HTMLElement | SVGSVGElement>() {
  const ref = useRef<T>(null);

  // On short mobile viewports (especially with dynamic browser chrome in
  // mobile Safari/Chrome), the default ['start 0.92', 'start 0.3'] window
  // compresses into a much smaller scroll distance than on desktop, so the
  // diagram's scroll-linked assembly finishes drawing abruptly. Widening the
  // window on short viewports keeps the reveal gradual everywhere.
  const [compactViewport, setCompactViewport] = useState(false);
  useEffect(() => {
    const check = () => setCompactViewport(window.innerHeight < 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll(
    compactViewport
      ? { target: ref as unknown as React.RefObject<HTMLElement>, offset: ['start 0.98', 'start 0.15'] }
      : { target: ref as unknown as React.RefObject<HTMLElement>, offset: ['start 0.92', 'start 0.3'] }
  );
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  return { ref, progress };
}

/**
 * Pins its content in the viewport while the user scrolls through a tall track,
 * and reports 0→1 progress through that track — the base for sticky, scroll-driven scenes.
 */
export function ScrollScene({
  children,
  className,
  trackClassName,
  heightVh = 260,
}: {
  children: (progress: ReturnType<typeof useScroll>['scrollYProgress']) => React.ReactNode;
  className?: string;
  trackClassName?: string;
  heightVh?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <div ref={ref} className={trackClassName} style={{ height: `${heightVh}vh`, position: 'relative' }}>
      <div className={`sticky top-0 h-screen overflow-hidden ${className ?? ''}`}>
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
