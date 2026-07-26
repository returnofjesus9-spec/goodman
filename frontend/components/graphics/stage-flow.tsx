'use client';

import { motion } from 'framer-motion';

/**
 * A single-line sequence read left to right — deliberately smaller and
 * plainer than ProcessPipeline/TopologyOverview, for framing a short
 * sequence inline near a heading rather than anchoring a whole section.
 */
export default function StageFlow({ stages }: { stages: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-3" role="img" aria-label={`Stages: ${stages.join(' to ')}`}>
      {stages.map((stage, i) => (
        <motion.div
          key={stage}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rotate-45 border border-accent-light/80 bg-accent-dim animate-node-blink" aria-hidden />
            <span className="label whitespace-nowrap text-ink-muted">{stage}</span>
          </span>
          {i < stages.length - 1 && (
            <svg width="36" height="8" viewBox="0 0 36 8" className="mx-2 shrink-0 text-ink-muted/40" aria-hidden>
              <line
                x1="0"
                y1="4"
                x2="30"
                y2="4"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 3"
                className="animate-dash-flow"
              />
              <path d="M28 1 L34 4 L28 7" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
