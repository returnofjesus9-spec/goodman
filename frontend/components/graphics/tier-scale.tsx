'use client';

import { motion } from 'framer-motion';

/**
 * A row of ascending bars, one per pricing tier, each capped with a small
 * node — reads as a capacity/scale readout (like a systems load chart)
 * rather than a bar chart of numbers, since the tiers here are named, not
 * quantitative. Bar heights are relative scale only, not literal data.
 */
export default function TierScale({ tiers }: { tiers: { name: string }[] }) {
  const heights = tiers.map((_, i) => 34 + i * (66 / Math.max(tiers.length - 1, 1)));

  return (
    <div
      className="flex items-end gap-6 border-b border-line pb-0 sm:gap-10"
      role="img"
      aria-label={`Ascending scale across tiers: ${tiers.map((t) => t.name).join(', ')}`}
    >
      {tiers.map((tier, i) => (
        <div key={tier.name} className="flex flex-1 flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-label text-ink-muted">{`0${i + 1}`}</span>
          <div className="relative flex h-24 w-full items-end justify-center">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: `${heights[i]}%`, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="w-2 rounded-t-sm bg-gradient-to-t from-accent-dim to-accent-light/70"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
