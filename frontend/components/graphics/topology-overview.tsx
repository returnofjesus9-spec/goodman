'use client';

import { useDiagramProgress } from '@/components/motion';
import { ScrollConnector, ScrollNode } from '@/components/graphics/motifs';
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
  const { ref, progress } = useDiagramProgress<SVGSVGElement>();
  const byKey = Object.fromEntries(nodes.map((n) => [n.key, n]));

  // Edges draw in sequence, each claiming a slice of the first 70% of scroll;
  // a node lights up once every edge touching it has landed, so the four
  // capabilities visibly "connect" to each other rather than fading in as a
  // group.
  const edgeSpan = 0.68 / edges.length;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto h-auto w-full max-w-md"
      role="img"
      aria-label="Mesh diagram showing websites, automation, dashboards, and custom systems as four interconnected capabilities"
    >
      <BlueprintFrame width={width} height={height} tickStep={36} caption="Capability mesh" figNumber="00" />

      {edges.map(([a, b], i) => {
        const start = i * edgeSpan;
        const end = start + edgeSpan * 0.85;
        return (
          <ScrollConnector
            key={`${a}-${b}`}
            progress={progress}
            start={start}
            end={end}
            d={`M ${byKey[a].x} ${byKey[a].y} L ${byKey[b].x} ${byKey[b].y}`}
            stroke="rgba(217,131,90,0.3)"
          />
        );
      })}

      {nodes.map((n) => {
        const touching = edges
          .map((e, i) => (e.includes(n.key) ? i : -1))
          .filter((i) => i >= 0);
        const lastEdge = Math.max(...touching);
        const at = lastEdge * edgeSpan + edgeSpan * 0.85;
        return (
          <ScrollNode key={n.key} progress={progress} at={at} x={n.x} y={n.y}>
            <circle
              cx={n.x}
              cy={n.y}
              r={7}
              fill="rgba(17,17,17,0.95)"
              stroke="rgba(217,131,90,0.8)"
              strokeWidth={1.4}
              className="animate-node-blink"
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
          </ScrollNode>
        );
      })}
    </svg>
  );
}
