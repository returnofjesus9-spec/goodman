'use client';

import { DrawPath } from '@/components/motion';

const nodes = [
  { key: 'site', label: 'Website', sub: 'Client-facing', x: 90, y: 70 },
  { key: 'auto', label: 'Automation', sub: 'Background', x: 90, y: 210 },
  { key: 'dash', label: 'Dashboard', sub: 'Visibility', x: 90, y: 350 },
  { key: 'custom', label: 'Custom systems', sub: 'Internal', x: 90, y: 490 },
];

export default function ArchitectureDiagram() {
  const coreX = 560;
  const coreY = 280;

  return (
    <svg
      viewBox="0 0 760 560"
      className="h-auto w-full max-w-2xl"
      role="img"
      aria-label="Diagram showing the website, automation, dashboard, and custom systems each connecting into one operating core"
    >
      {/* faint coordinate ticks for technical texture */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          x2={760}
          y1={i * 80}
          y2={i * 80}
          stroke="rgba(255,255,255,0.035)"
          strokeWidth={1}
        />
      ))}

      {/* connectors */}
      {nodes.map((n) => (
        <DrawPath
          key={n.key}
          d={`M ${n.x + 150} ${n.y} C ${n.x + 260} ${n.y}, ${coreX - 180} ${coreY}, ${coreX - 90} ${coreY}`}
          fill="none"
          stroke="rgba(140,169,255,0.55)"
          strokeWidth={1.25}
          delay={0.15}
        />
      ))}

      {/* node cards */}
      {nodes.map((n, i) => (
        <g key={n.key}>
          <rect
            x={n.x}
            y={n.y - 26}
            width={150}
            height={52}
            rx={3}
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
