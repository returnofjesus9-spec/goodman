'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { useDiagramProgress } from '@/components/motion';

function TierBar({
  progress,
  start,
  end,
  targetHeight,
  name,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  targetHeight: number;
  name: string;
}) {
  const heightPct = useTransform(progress, [start, end], [0, targetHeight]);
  const height = useTransform(heightPct, (v) => `${v}%`);
  const opacity = useTransform(progress, [start, Math.min(start + 0.03, end)], [0, 1]);
  const capOpacity = useTransform(progress, [end, Math.min(end + 0.04, 1)], [0, 1]);
  return (
    <motion.div
      style={{ height, opacity }}
      className="relative w-2 rounded-t-sm bg-gradient-to-t from-accent-dim to-accent-light/70"
      aria-hidden
    >
      <motion.span
        style={{ opacity: capOpacity }}
        className="absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-light animate-node-blink"
      />
      <span className="sr-only">{name}</span>
    </motion.div>
  );
}

/**
 * A row of ascending bars, one per pricing tier, each capped with a small
 * node — reads as a capacity/scale readout (like a systems load chart)
 * rather than a bar chart of numbers, since the tiers here are named, not
 * quantitative. Bar heights are relative scale only, not literal data.
 * Growth is tied to the same scroll clock as the site's other diagrams: bars
 * rise in sequence as the reader scrolls past, and each cap node lights once
 * its bar reaches full height — read left to right as ascending capability,
 * not four things arriving at once.
 */
export default function TierScale({ tiers }: { tiers: { name: string }[] }) {
  const { ref, progress } = useDiagramProgress<HTMLDivElement>();
  const heights = tiers.map((_, i) => 34 + i * (66 / Math.max(tiers.length - 1, 1)));
  const span = 0.75 / Math.max(tiers.length, 1);

  return (
    <div
      ref={ref}
      className="flex items-end gap-6 border-b border-line pb-0 sm:gap-10"
      role="img"
      aria-label={`Ascending scale across tiers: ${tiers.map((t) => t.name).join(', ')}`}
    >
      {tiers.map((tier, i) => {
        const start = i * span;
        const end = start + span * 0.85;
        return (
          <div key={tier.name} className="flex flex-1 flex-col items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-ink-muted">{`0${i + 1}`}</span>
            <div className="relative flex h-24 w-full items-end justify-center">
              <TierBar progress={progress} start={start} end={end} targetHeight={heights[i]} name={tier.name} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
