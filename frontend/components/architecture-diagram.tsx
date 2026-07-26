'use client';

import { motion } from 'framer-motion';
import { DrawPath } from '@/components/motion';

const nodes = [
  { key: 'site', label: 'Website', sub: 'Client-facing', x: 90, y: 70 },
  { key: 'auto', label: 'Automation', sub: 'Background', x: 90, y: 210 },
  { key: 'dash', label: 'Dashboard', sub: 'Visibility', x: 90, y: 350 },
  { key: 'custom', label: 'Custom systems', sub: 'Internal', x: 90, y: 490 },
];

/** Point at t along a cubic bezier — used to sample the connector paths so the
 * traveling signal dot follows the exact curve DrawPath draws, not an approximation. */
function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number) {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

export default function ArchitectureDiagram() {
  const coreX = 560;
  const coreY = 280;
  const coreOuterR = 70;

  // Tick spacing is derived from the diagram's own geometry (the 140px gap between
  // node rows) rather than an arbitrary value — every node row and the core's
  // vertical center land exactly on a tick, so the grid reads as this diagram's
  // real coordinate system instead of generic graph-paper texture.
  const tickStep = 70;
  const tickCount = Math.round(560 / tickStep) + 1;

  const spokeSpread = 16; // degrees between each connector's port on the core ring

  // Each connector's full geometry — path control points, the point where it
  // meets the ring, and the port tick just outside it — computed once and shared
  // by the connector line, the ring port, and the traveling signal dot, so the
  // three stay perfectly in sync instead of drifting apart under separate math.
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

  const sampleTimes = Array.from({ length: 17 }, (_, s) => s / 16);
  const corners: [number, number][] = [
    [20, 20],
    [740, 20],
    [20, 540],
    [740, 540],
  ];

  return (
    <svg
      viewBox="0 0 760 560"
      width={760}
      height={560}
      preserveAspectRatio="xMidYMid meet"
      className="h-auto w-full max-w-2xl"
      style={{ aspectRatio: '760 / 560' }}
      role="img"
      aria-label="Diagram showing the website, automation, dashboard, and custom systems each connecting into one operating core"
    >
      {/* coordinate ticks, aligned to the node rows and core center */}
      {Array.from({ length: tickCount }).map((_, i) => (
        <line
          key={i}
          x1={0}
          x2={760}
          y1={i * tickStep}
          y2={i * tickStep}
          stroke="rgba(255,255,255,0.035)"
          strokeWidth={1}
        />
      ))}

      {/* blueprint registration marks — corner crosshairs, a real drafting convention */}
      {corners.map(([cx, cy], idx) => (
        <g key={idx} stroke="rgba(255,255,255,0.16)" strokeWidth={1}>
          <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} />
          <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} />
        </g>
      ))}

      {/* figure caption + scale readout, values pulled from the diagram's real geometry */}
      <text x={20} y={550} fill="rgba(255,255,255,0.22)" fontSize="9" letterSpacing="0.14em" fontFamily="var(--font-mono)" style={{ textTransform: 'uppercase' }}>
        Fig. 01 — System topology
      </text>
      <text x={740} y={550} textAnchor="end" fill="rgba(255,255,255,0.22)" fontSize="9" letterSpacing="0.14em" fontFamily="var(--font-mono)" style={{ textTransform: 'uppercase' }}>
        Grid {tickStep}px
      </text>

      {/* connectors — each terminates precisely on the core ring's edge, at its
          own port point around the ring, instead of converging on one shared
          point short of it */}
      {spokes.map((s) => (
        <DrawPath
          key={s.key}
          d={`M ${s.p0x} ${s.p0y} C ${s.p1x} ${s.p1y}, ${s.p2x} ${s.p2y}, ${s.p3x} ${s.p3y}`}
          fill="none"
          stroke="rgba(140,169,255,0.55)"
          strokeWidth={1.25}
          delay={0.15 + s.i * 0.08}
        />
      ))}

      {/* ring ports — a short pin where each connector actually terminates,
          reading as a real socket rather than a line fading into a circle */}
      {spokes.map((s) => (
        <line
          key={`${s.key}-port`}
          x1={s.p3x}
          y1={s.p3y}
          x2={s.portX}
          y2={s.portY}
          stroke="rgba(140,169,255,0.75)"
          strokeWidth={1.25}
        />
      ))}

      {/* traveling signal — a small pulse riding each connector's exact path,
          asynchronous per node, reading as live data flow rather than a static
          wiring diagram */}
      {spokes.map((s) => {
        const cxs = sampleTimes.map((t) => bezierPoint(t, s.p0x, s.p1x, s.p2x, s.p3x));
        const cys = sampleTimes.map((t) => bezierPoint(t, s.p0y, s.p1y, s.p2y, s.p3y));
        return (
          <motion.circle
            key={`${s.key}-pulse`}
            r={2}
            fill="#8CA9FF"
            initial={{ opacity: 0 }}
            animate={{ cx: cxs, cy: cys, opacity: [0, 1, 1, 0] }}
            transition={{
              cx: { duration: 2.4, ease: 'linear', repeat: Infinity, repeatDelay: 2.4 + s.i * 0.4, delay: 1.2 + s.i * 0.5 },
              cy: { duration: 2.4, ease: 'linear', repeat: Infinity, repeatDelay: 2.4 + s.i * 0.4, delay: 1.2 + s.i * 0.5 },
              opacity: {
                duration: 2.4,
                times: [0, 0.1, 0.85, 1],
                repeat: Infinity,
                repeatDelay: 2.4 + s.i * 0.4,
                delay: 1.2 + s.i * 0.5,
              },
            }}
          />
        );
      })}

      {/* node cards */}
      {nodes.map((n, i) => (
        <g key={n.key}>
          <rect
            x={n.x}
            y={n.y - 26}
            width={150}
            height={52}
            rx={2}
            fill="rgba(17,17,17,0.9)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1}
          />
          <text x={n.x + 16} y={n.y - 4} fill="#FFFFFF" fontSize="13" fontWeight={600} fontFamily="var(--font-sans)">
            {n.label}
          </text>
          <text
            x={n.x + 16}
            y={n.y + 15}
            fill="#666666"
            fontSize="9.5"
            letterSpacing="0.14em"
            fontFamily="var(--font-mono)"
            style={{ textTransform: 'uppercase' }}
          >
            {n.sub}
          </text>
          <circle cx={n.x + 150} cy={n.y} r={2.5} fill="#4F7FFF" />
        </g>
      ))}

      {/* core node */}
      <g>
        <circle cx={coreX} cy={coreY} r={70} fill="rgba(79,127,255,0.06)" stroke="rgba(79,127,255,0.35)" strokeWidth={1} />
        <circle cx={coreX} cy={coreY} r={44} fill="rgba(17,17,17,0.95)" stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
        <text x={coreX} y={coreY - 4} textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight={600} fontFamily="var(--font-sans)">
          Your
        </text>
        <text x={coreX} y={coreY + 14} textAnchor="middle" fill="#FFFFFF" fontSize="12.5" fontWeight={600} fontFamily="var(--font-sans)">
          business
        </text>
      </g>
    </svg>
  );
}
