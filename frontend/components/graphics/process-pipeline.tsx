'use client';

import { motion } from 'framer-motion';
import { DrawPath } from '@/components/motion';
import BlueprintFrame from '@/components/graphics/blueprint-frame';

/** Point at t along the pipeline's single cubic path — used to place each
 * node exactly on the line instead of eyeballing coordinates that could
 * drift out of alignment if the curve ever changes. */
function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

export default function ProcessPipeline({ steps }: { steps: { index: string; title: string }[] }) {
  const width = 1040;
  const height = 150;
  const y = 92;
  const pad = 60;
  const p0 = pad;
  const p3 = width - pad;
  // A gentle single bow rather than a straight line — reads as one continuous
  // run rather than a ruler, while every node still sits exactly on it.
  const p1x = p0 + (p3 - p0) * 0.32;
  const p2x = p0 + (p3 - p0) * 0.68;
  const bow = 16;

  const nodePositions = steps.map((_, i) => (steps.length === 1 ? 0 : i / (steps.length - 1)));
  const sampleTimes = Array.from({ length: 25 }, (_, s) => s / 24);
  const cxs = sampleTimes.map((t) => bezierPoint(t, p0, p1x, p2x, p3));
  const cys = sampleTimes.map((t) => bezierPoint(t, y, y - bow, y + bow, y));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Pipeline diagram of ${steps.length} stages: ${steps.map((s) => s.title).join(', ')}`}
    >
      <BlueprintFrame width={width} height={height} tickStep={40} caption="Delivery pipeline" figNumber="02" />

      <DrawPath
        d={`M ${p0} ${y} C ${p1x} ${y - bow}, ${p2x} ${y + bow}, ${p3} ${y}`}
        fill="none"
        stroke="rgba(140,169,255,0.45)"
        strokeWidth={1.25}
        delay={0.1}
      />

      {/* traveling signal riding the exact curve, continuous once drawn in */}
      <motion.circle
        r={2.4}
        fill="#8CA9FF"
        initial={{ opacity: 0 }}
        animate={{ cx: cxs, cy: cys, opacity: [0, 1, 1, 0] }}
        transition={{
          cx: { duration: 3.2, ease: 'linear', repeat: Infinity, repeatDelay: 1.4, delay: 1.6 },
          cy: { duration: 3.2, ease: 'linear', repeat: Infinity, repeatDelay: 1.4, delay: 1.6 },
          opacity: { duration: 3.2, times: [0, 0.06, 0.92, 1], repeat: Infinity, repeatDelay: 1.4, delay: 1.6 },
        }}
      />

      {steps.map((step, i) => {
        const t = nodePositions[i];
        const cx = bezierPoint(t, p0, p1x, p2x, p3);
        const cy = bezierPoint(t, y, y - bow, y + bow, y);
        return (
          <motion.g
            key={step.index}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle cx={cx} cy={cy} r={13} fill="rgba(17,17,17,0.95)" stroke="rgba(140,169,255,0.55)" strokeWidth={1.25} />
            <text x={cx} y={cy + 4} textAnchor="middle" fill="#8CA9FF" fontSize="10" fontFamily="var(--font-mono)">
              {step.index}
            </text>
            <text
              x={cx}
              y={cy + 34}
              textAnchor="middle"
              fill="#A3A3A3"
              fontSize="11"
              fontWeight={600}
              fontFamily="var(--font-sans)"
            >
              {step.title}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
