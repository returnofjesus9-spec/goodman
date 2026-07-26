'use client';

import { DrawPath } from '@/components/motion';
import BlueprintFrame from '@/components/graphics/blueprint-frame';

const width = 460;
const height = 360;

const nodes = [
  { key: 'web', label: 'Websites', x: 90, y: 80 },
  { key: 'auto', label: 'Automation', x: 370, y: 80 },
  { key: 'dash', label: 'Dashboards', x: 90, y: 280 },
  { key: 'custom', label: 'Custom systems', x: 370, y: 280 },
];

// Every pair connected — a mesh, not a hub-and-spoke — to read as four peer
// capabilities that reinforce each other rather than four branches off one
// center (that framing already belongs to the homepage architecture diagram).
const edges: [string, string][] = [
  ['web', 'auto'],
  ['web', 'dash'],
  ['web', 'custom'],
  ['auto', 'dash'],
  ['auto', 'custom'],
  ['dash', 'custom'],
];

export default function TopologyOverview() {
  const byKey = Object.fromEntries(nodes.map((n) => [n.key, n]));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto h-auto w-full max-w-md"
      role="img"
      aria-label="Mesh diagram showing websites, automation, dashboards, and custom systems as four interconnected capabilities"
    >
      <BlueprintFrame width={width} height={height} tickStep={36} caption="Capability mesh" figNumber="00" />

      {edges.map(([a, b], i) => (
        <DrawPath
          key={`${a}-${b}`}
          d={`M ${byKey[a].x} ${byKey[a].y} L ${byKey[b].x} ${byKey[b].y}`}
          stroke="rgba(140,169,255,0.28)"
          strokeWidth={1}
          strokeLinecap="round"
          delay={0.1 + i * 0.06}
        />
      ))}

      {nodes.map((n, i) => (
        <g key={n.key}>
          <circle
            cx={n.x}
            cy={n.y}
            r={7}
            fill="rgba(17,17,17,0.95)"
            stroke="rgba(140,169,255,0.8)"
            strokeWidth={1.4}
            className="animate-node-blink"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <text
            x={n.x}
            y={n.y + (n.y < height / 2 ? -16 : 24)}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11.5"
            fontWeight={600}
            fontFamily="var(--font-sans)"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
