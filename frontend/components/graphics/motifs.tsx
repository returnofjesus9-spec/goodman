'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

/**
 * Shared vocabulary for every scroll-synced technical diagram (ArchitectureDiagram,
 * TopologyOverview, ProcessPipeline). Each diagram computes its own geometry, but
 * draws its connectors, nodes, and traveling signal from these three primitives so
 * the *behavior* of "assembling" reads identically everywhere: a line stroking on
 * as you scroll, a node lighting up the instant its connector lands, a pulse that
 * starts riding the line once the diagram has finished forming. Same motion
 * language, same easing, same order of operations — every site diagram is read
 * as one instrument, not four separate illustrations that happen to share colors.
 */

/** A connector that strokes on as `progress` sweeps through [start, end]. */
export function ScrollConnector({
  progress,
  start,
  end,
  d,
  stroke = 'rgba(140,169,255,0.5)',
  strokeWidth = 1.25,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  d: string;
  stroke?: string;
  strokeWidth?: number;
}) {
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, Math.min(start + 0.03, end)], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
}

/**
 * A node that arrives "powered off" and switches on — scale + glow ramping up —
 * right as the connector feeding it finishes drawing. `at` is the progress value
 * (0–1) at which the node should be fully lit.
 */
export function ScrollNode({
  progress,
  at,
  children,
  x,
  y,
}: {
  progress: MotionValue<number>;
  at: number;
  children: React.ReactNode;
  x: number;
  y: number;
}) {
  const scale = useTransform(progress, [Math.max(0, at - 0.08), at], [0.7, 1]);
  const opacity = useTransform(progress, [Math.max(0, at - 0.1), at], [0, 1]);
  return (
    <motion.g style={{ scale, opacity, transformOrigin: `${x}px ${y}px` }}>{children}</motion.g>
  );
}

/**
 * Ambient "live" state a diagram settles into once fully assembled — traveling
 * pulses, blinking ports — gated so it only starts once `progress` has crossed
 * `reveal`. Keeps the CSS keyframe loops already defined in tailwind.config.ts
 * (animate-node-blink, dash-flow) but silent until the diagram has earned them.
 */
export function ScrollAmbient({
  progress,
  reveal,
  children,
}: {
  progress: MotionValue<number>;
  reveal: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [Math.max(0, reveal - 0.06), reveal], [0, 1]);
  return <motion.g style={{ opacity }}>{children}</motion.g>;
}
