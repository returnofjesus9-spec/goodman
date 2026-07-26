'use client';

import { motion } from 'framer-motion';
import { useDiagramProgress } from '@/components/motion';
import { ScrollConnector, ScrollNode, ScrollAmbient } from '@/components/graphics/motifs';
import BlueprintFrame from '@/components/graphics/blueprint-frame';

const nodes = [
  { key: 'site', label: 'Website', sub: 'Client-facing', x: 90, y: 70 },
  { key: 'auto', label: 'Automation', sub: 'Background', x: 90, y: 210 },
  { key: 'dash', label: 'Dashboard', sub: 'Visibility', x: 90, y: 350 },
  { key: 'custom', label: 'Custom systems', sub: 'Internal', x: 90, y: 490 },
];

/** Point at t along a cubic bezier — used to sample the connector paths so the
 * traveling signal dot follows the exact curve the connector draws, not an approximation. */
function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

/**
 * The site's primary system diagram — four inputs feeding one core. Assembly is
 * driven entirely by `progress`, the shared scroll clock from useDiagramProgress:
 * each connector strokes on in its own slice of the scroll, its node lights up
 * the instant its line lands, the core powers on last once every spoke has
 * connected, and only then does the live signal traffic begin. Reading the
 * diagram and scrolling through it are the same action.
 */
export default function ArchitectureDiagram() {
  const { ref, progress } = useDiagramProgress<SVGSVGElement>();

  const coreX = 560;
  const coreY = 280;
  const coreOuterR = 70;
  const spokeSpread = 16;

  const spokes = nodes.map((n, i) => {
    const angleDeg = 180 + (i - (nodes.length - 1) / 2) * spokeSpread;
    const angleRad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const endX = coreX + coreOuterR * cos;
    const endY = coreY + coreOuterR * sin;
    return {
      key: n.key,
      i,
      p0x: n.x + 150,
      p0y: n.y,
      p1x: n.x + 260,
      p1y: n.y,
      p2x: endX - 110,
      p2y: endY,
      p3x: endX,
      p3y: endY,
      portX: coreX + (coreOuterR + 9) * cos,
      portY: coreY + (coreOuterR + 9) * sin,
    };
  });

  // Each spoke claims its own slice of the 0→0.72 range so they draw in
  // sequence, top to bottom, rather than all at once. The core (0.76) and
  // live traffic (0.9) only arrive once every spoke has actually connected.
  const spokeSpan = 0.72 / spokes.length;
  const coreAt = 0.8;
  const liveAt = 0.94;

  const sampleTimes = Array.from({ length: 17 }, (_, s) => s / 16);

  return (
    <svg
      ref={ref}
      viewBox="0 0 760 560"
      width={760}
      height={560}
      preserveAspectRatio="xMidYMid meet"
      className="h-auto w-full max-w-2xl"
      style={{ aspectRatio: '760 / 560' }}
      role="img"
      aria-label="Diagram showing the website, automation, dashboard, and custom systems each connecting into one operating core"
    >
      <BlueprintFrame width={760} height={560} tickStep={70} caption="System topology" figNumber="01" />

      {spokes.map((s) => {
        const start = s.i * spokeSpan;
        const end = start + spokeSpan * 0.85;
        return (
          <ScrollConnector
            key={s.key}
            progress={progress}
            start={start}
            end={end}
            d={`M ${s.p0x} ${s.p0y} C ${s.p1x} ${s.p1y}, ${s.p2x} ${s.p2y}, ${s.p3x} ${s.p3y}`}
            stroke="rgba(217,131,90,0.55)"
          />
        );
      })}

      {/* ring ports — pinned sockets, lit the same moment their connector lands */}
      {spokes.map((s) => {
        const at = s.i * spokeSpan + spokeSpan * 0.85;
        return (
          <ScrollNode key={`${s.key}-port`} progress={progress} at={at} x={s.portX} y={s.portY}>
            <line x1={s.p3x} y1={s.p3y} x2={s.portX} y2={s.portY} stroke="rgba(217,131,90,0.75)" strokeWidth={1.25} />
          </ScrollNode>
        );
      })}

      {/* live signal traffic — only begins riding the connectors once the whole core is online */}
      <ScrollAmbient progress={progress} reveal={liveAt}>
        {spokes.map((s) => {
          const cxs = sampleTimes.map((t) => bezierPoint(t, s.p0x, s.p1x, s.p2x, s.p3x));
          const cys = sampleTimes.map((t) => bezierPoint(t, s.p0y, s.p1y, s.p2y, s.p3y));
          return (
            <motion.circle
              key={`${s.key}-pulse`}
              r={2}
              fill="#D9835A"
              initial={{ opacity: 0 }}
              animate={{ cx: cxs, cy: cys, opacity: [0, 1, 1, 0] }}
              transition={{
                cx: { duration: 2.4, ease: 'linear', repeat: Infinity, repeatDelay: 2.4 + s.i * 0.4, delay: s.i * 0.5 },
                cy: { duration: 2.4, ease: 'linear', repeat: Infinity, repeatDelay: 2.4 + s.i * 0.4, delay: s.i * 0.5 },
                opacity: {
                  duration: 2.4,
                  times: [0, 0.1, 0.85, 1],
                  repeat: Infinity,
                  repeatDelay: 2.4 + s.i * 0.4,
                  delay: s.i * 0.5,
                },
              }}
            />
          );
        })}
      </ScrollAmbient>

      {/* node cards — each lights up the instant its own connector reaches the core */}
      {nodes.map((n, i) => {
        const at = i * spokeSpan + spokeSpan * 0.7;
        return (
          <ScrollNode key={n.key} progress={progress} at={at} x={n.x + 75} y={n.y}>
            <rect x={n.x} y={n.y - 26} width={150} height={52} rx={2} fill="rgba(17,17,17,0.9)" stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
            <text x={n.x + 16} y={n.y - 4} fill="#FFFFFF" fontSize="13" fontWeight={600} fontFamily="var(--font-sans)">
              {n.label}
            </text>
            <text x={n.x + 16} y={n.y + 15} fill="#666666" fontSize="9.5" letterSpacing="0.14em" fontFamily="var(--font-mono)" style={{ textTransform: 'uppercase' }}>
              {n.sub}
            </text>
            <circle cx={n.x + 150} cy={n.y} r={2.5} fill="#AE5330" />
          </ScrollNode>
        );
      })}

      {/* core — powers on last, once every spoke is connected */}
      <ScrollNode progress={progress} at={coreAt} x={coreX} y={coreY}>
        <circle cx={coreX} cy={coreY} r={70} fill="rgba(174,83,48,0.06)" stroke="rgba(174,83,48,0.35)" strokeWidth={1} />
        <circle cx={coreX} cy={coreY} r={44} fill="rgba(17,17,17,0.95)" stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
        <text x={coreX} y={coreY - 4} textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight={600} fontFamily="var(--font-sans)">
          Your
        </text>
        <text x={coreX} y={coreY + 14} textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight={600} fontFamily="var(--font-sans)">
          business
        </text>
      </ScrollNode>
    </svg>
  );
}
