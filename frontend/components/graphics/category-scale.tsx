'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { useDiagramProgress } from '@/components/motion';

/**
 * Per-category pictorial glyphs for the pricing scale. Each category reads as
 * a small line-drawing of the thing being sold rather than an abstract bar —
 * a browser window for Website, a chain of connected nodes for Automation, a
 * cluster of widget tiles for Dashboards, a response pulse for Support — and
 * each one gets structurally denser (not just taller) from tier 01 to 03, so
 * the shape itself communicates "more" the same way the old bar height did.
 * Falls back to a plain ascending glyph for any category we don't recognize.
 */

const STROKE = 'rgba(217,131,90,0.75)';
const STROKE_DIM = 'rgba(217,131,90,0.4)';
const FILL_DIM = 'rgba(217,131,90,0.16)';

function WebsiteGlyph({ level }: { level: number }) {
  return (
    <svg viewBox="0 0 56 44" className="h-full w-auto" aria-hidden>
      <rect x={2} y={2} width={52} height={40} rx={2} fill="none" stroke={STROKE} strokeWidth={1.25} />
      <line x1={2} y1={10} x2={54} y2={10} stroke={STROKE_DIM} strokeWidth={1} />
      <circle cx={6} cy={6} r={1.1} fill={STROKE} />
      <circle cx={10} cy={6} r={1.1} fill={STROKE} />
      <circle cx={14} cy={6} r={1.1} fill={STROKE} />

      {level === 0 && (
        <>
          <line x1={10} y1={20} x2={34} y2={20} stroke={STROKE} strokeWidth={1.5} />
          <line x1={10} y1={27} x2={46} y2={27} stroke={STROKE_DIM} strokeWidth={1} />
          <line x1={10} y1={32} x2={40} y2={32} stroke={STROKE_DIM} strokeWidth={1} />
        </>
      )}

      {level === 1 && (
        <>
          <rect x={6} y={14} width={12} height={5} rx={1} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={20} y={14} width={12} height={5} rx={1} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={34} y={14} width={16} height={5} rx={1} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={6} y={23} width={20} height={13} rx={1} fill="none" stroke={STROKE} strokeWidth={1} />
          <rect x={29} y={23} width={21} height={13} rx={1} fill="none" stroke={STROKE_DIM} strokeWidth={1} />
        </>
      )}

      {level === 2 && (
        <>
          <rect x={6} y={14} width={11} height={22} rx={1} fill="none" stroke={STROKE} strokeWidth={1} />
          <line x1={9} y1={19} x2={14} y2={19} stroke={STROKE_DIM} strokeWidth={0.75} />
          <line x1={9} y1={24} x2={14} y2={24} stroke={STROKE_DIM} strokeWidth={0.75} />
          <line x1={9} y1={29} x2={14} y2={29} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={21} y={14} width={13} height={10} rx={1} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={37} y={14} width={13} height={10} rx={1} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={21} y={27} width={29} height={9} rx={1} fill="none" stroke={STROKE} strokeWidth={1} />
        </>
      )}
    </svg>
  );
}

function AutomationGlyph({ level }: { level: number }) {
  return (
    <svg viewBox="0 0 56 44" className="h-full w-auto" aria-hidden>
      {level === 0 && (
        <>
          <line x1={2} y1={22} x2={20} y2={22} stroke={STROKE_DIM} strokeWidth={1.25} />
          <circle cx={28} cy={22} r={6} fill={FILL_DIM} stroke={STROKE} strokeWidth={1.25} />
          <line x1={34} y1={22} x2={52} y2={22} stroke={STROKE_DIM} strokeWidth={1.25} />
          <circle cx={52} cy={22} r={1.4} fill={STROKE} />
          <circle cx={2} cy={22} r={1.4} fill={STROKE_DIM} />
        </>
      )}

      {level === 1 && (
        <>
          <line x1={9} y1={22} x2={22} y2={22} stroke={STROKE_DIM} strokeWidth={1.25} />
          <line x1={34} y1={22} x2={47} y2={22} stroke={STROKE_DIM} strokeWidth={1.25} />
          <circle cx={5} cy={22} r={1.4} fill={STROKE_DIM} />
          <circle cx={28} cy={22} r={5.5} fill={FILL_DIM} stroke={STROKE} strokeWidth={1.25} />
          <circle cx={9} cy={22} r={4.5} fill={FILL_DIM} stroke={STROKE} strokeWidth={1.1} />
          <circle cx={47} cy={22} r={4.5} fill={FILL_DIM} stroke={STROKE} strokeWidth={1.1} />
          <circle cx={51} cy={22} r={1.4} fill={STROKE} />
        </>
      )}

      {level === 2 && (
        <>
          <circle cx={7} cy={22} r={5} fill={FILL_DIM} stroke={STROKE} strokeWidth={1.25} />
          <line x1={12} y1={20} x2={40} y2={9} stroke={STROKE_DIM} strokeWidth={1} />
          <line x1={12} y1={22} x2={40} y2={22} stroke={STROKE_DIM} strokeWidth={1} />
          <line x1={12} y1={24} x2={40} y2={35} stroke={STROKE_DIM} strokeWidth={1} />
          <circle cx={44} cy={9} r={4} fill={FILL_DIM} stroke={STROKE} strokeWidth={1} />
          <circle cx={44} cy={22} r={4} fill={FILL_DIM} stroke={STROKE} strokeWidth={1} />
          <circle cx={44} cy={35} r={4} fill={FILL_DIM} stroke={STROKE} strokeWidth={1} />
          <circle cx={49} cy={9} r={1.1} fill={STROKE} />
          <circle cx={49} cy={22} r={1.1} fill={STROKE} />
          <circle cx={49} cy={35} r={1.1} fill={STROKE} />
        </>
      )}
    </svg>
  );
}

function DashboardsGlyph({ level }: { level: number }) {
  return (
    <svg viewBox="0 0 56 44" className="h-full w-auto" aria-hidden>
      {level === 0 && (
        <>
          <rect x={8} y={6} width={40} height={32} rx={2} fill="none" stroke={STROKE} strokeWidth={1.25} />
          <rect x={15} y={26} width={5} height={6} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={23} y={20} width={5} height={12} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.75} />
          <rect x={31} y={14} width={5} height={18} fill={FILL_DIM} stroke={STROKE} strokeWidth={0.75} />
        </>
      )}

      {level === 1 && (
        <>
          <rect x={3} y={8} width={24} height={28} rx={2} fill="none" stroke={STROKE} strokeWidth={1.1} />
          <rect x={8} y={26} width={4} height={6} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.6} />
          <rect x={14} y={20} width={4} height={12} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.6} />
          <rect x={20} y={14} width={4} height={18} fill={FILL_DIM} stroke={STROKE} strokeWidth={0.6} />
          <rect x={30} y={8} width={23} height={28} rx={2} fill="none" stroke={STROKE_DIM} strokeWidth={1.1} />
          <polyline points="34,30 39,20 44,26 49,12" fill="none" stroke={STROKE} strokeWidth={1.25} />
        </>
      )}

      {level === 2 && (
        <>
          <rect x={2} y={4} width={17} height={17} rx={2} fill="none" stroke={STROKE} strokeWidth={1} />
          <rect x={6} y={14} width={3} height={5} fill={FILL_DIM} stroke={STROKE_DIM} strokeWidth={0.5} />
          <rect x={11} y={10} width={3} height={9} fill={FILL_DIM} stroke={STROKE} strokeWidth={0.5} />
          <rect x={21} y={4} width={17} height={17} rx={2} fill="none" stroke={STROKE} strokeWidth={1} />
          <polyline points="25,17 29,10 33,14 36,7" fill="none" stroke={STROKE} strokeWidth={1.1} />
          <rect x={40} y={4} width={14} height={17} rx={2} fill="none" stroke={STROKE_DIM} strokeWidth={1} />
          <path d="M 47 8 A 5 5 0 1 1 42.4 15.5" fill="none" stroke={STROKE} strokeWidth={1.25} />
          <rect x={2} y={24} width={52} height={12} rx={2} fill="none" stroke={STROKE_DIM} strokeWidth={1} />
          <line x1={6} y1={30} x2={50} y2={30} stroke={STROKE_DIM} strokeWidth={0.6} strokeDasharray="2 2" />
        </>
      )}
    </svg>
  );
}

function SupportGlyph({ level }: { level: number }) {
  const paths = [
    'M 2 22 L 16 22 L 20 12 L 24 22 L 52 22',
    'M 2 22 L 10 22 L 13 10 L 17 22 L 28 22 L 32 32 L 36 14 L 40 22 L 52 22',
    'M 2 22 L 7 22 L 9 8 L 12 22 L 18 22 L 21 32 L 25 12 L 28 22 L 33 22 L 36 30 L 39 16 L 42 22 L 52 22',
  ];
  return (
    <svg viewBox="0 0 56 44" className="h-full w-auto" aria-hidden>
      <line x1={2} y1={22} x2={52} y2={22} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      <path d={paths[level]} fill="none" stroke={STROKE} strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
      {level === 0 && <circle cx={52} cy={22} r={1.4} fill={STROKE_DIM} />}
      {level === 1 && <circle cx={52} cy={22} r={1.6} fill={STROKE} />}
      {level === 2 && (
        <path d="M 51 16 L 52.6 19.6 L 56 20 L 53.5 22.5 L 54.1 26 L 51 24.3 L 47.9 26 L 48.5 22.5 L 46 20 L 49.4 19.6 Z" fill={STROKE} transform="translate(-3,0)" />
      )}
    </svg>
  );
}

function GenericGlyph({ level }: { level: number }) {
  const w = 10 + level * 10;
  return (
    <svg viewBox="0 0 56 44" className="h-full w-auto" aria-hidden>
      <rect x={28 - w / 2} y={44 - (14 + level * 10)} width={w} height={14 + level * 10} fill={FILL_DIM} stroke={STROKE} strokeWidth={1.25} rx={1.5} />
    </svg>
  );
}

function glyphFor(category: string) {
  const key = category.toLowerCase();
  if (key.includes('website') || key.includes('packages')) return WebsiteGlyph;
  if (key.includes('automat')) return AutomationGlyph;
  if (key.includes('dashboard')) return DashboardsGlyph;
  if (key.includes('support')) return SupportGlyph;
  return GenericGlyph;
}

function GlyphColumn({
  Glyph,
  progress,
  start,
  end,
  targetHeight,
  level,
  name,
}: {
  Glyph: (props: { level: number }) => React.ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
  targetHeight: number;
  level: number;
  name: string;
}) {
  const heightPct = useTransform(progress, [start, end], [0, targetHeight]);
  const height = useTransform(heightPct, (v) => `${v}%`);
  const opacity = useTransform(progress, [start, Math.min(start + 0.03, end)], [0, 1]);
  const capOpacity = useTransform(progress, [end, Math.min(end + 0.04, 1)], [0, 1]);
  return (
    <motion.div style={{ height, opacity }} className="relative flex w-full items-end justify-center" aria-hidden>
      <Glyph level={level} />
      <motion.span
        style={{ opacity: capOpacity }}
        className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-light animate-node-blink"
      />
      <span className="sr-only">{name}</span>
    </motion.div>
  );
}

export default function CategoryScale({ category, tiers }: { category: string; tiers: { name: string }[] }) {
  const { ref, progress } = useDiagramProgress<HTMLDivElement>();
  const Glyph = glyphFor(category);
  const heights = tiers.map((_, i) => 34 + i * (66 / Math.max(tiers.length - 1, 1)));
  const span = 0.75 / Math.max(tiers.length, 1);
  const levelFor = (i: number) => Math.round((i / Math.max(tiers.length - 1, 1)) * 2);

  return (
    <div
      ref={ref}
      className="flex items-end gap-6 border-b border-line pb-0 sm:gap-10"
      role="img"
      aria-label={`${category} scale across tiers: ${tiers.map((t) => t.name).join(', ')}`}
    >
      {tiers.map((tier, i) => {
        const start = i * span;
        const end = start + span * 0.85;
        return (
          <div key={tier.name} className="flex flex-1 flex-col items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-ink-muted">{`0${i + 1}`}</span>
            <div className="relative flex h-24 w-full items-end justify-center">
              <GlyphColumn
                Glyph={Glyph}
                progress={progress}
                start={start}
                end={end}
                targetHeight={heights[i]}
                level={levelFor(i)}
                name={tier.name}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
