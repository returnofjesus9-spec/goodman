/**
 * Shared drafting-plate background for the diagram components in this folder:
 * faint coordinate ticks, four corner registration crosshairs, and a
 * figure caption + scale readout in the bottom corners. Rendering this once
 * here (rather than copy-pasted per diagram, as it originally was in
 * ArchitectureDiagram) keeps every technical visual on the site reading as
 * one consistent instrument, not a set of unrelated illustrations.
 */
export default function BlueprintFrame({
  width,
  height,
  tickStep = 40,
  caption,
  figNumber,
}: {
  width: number;
  height: number;
  tickStep?: number;
  caption: string;
  figNumber: string;
}) {
  const cols = Math.round(width / tickStep) + 1;
  const rows = Math.round(height / tickStep) + 1;
  const corners: [number, number][] = [
    [16, 16],
    [width - 16, 16],
    [16, height - 16],
    [width - 16, height - 16],
  ];

  return (
    <g aria-hidden>
      {Array.from({ length: cols }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * tickStep}
          x2={i * tickStep}
          y1={0}
          y2={height}
          stroke="rgba(255,255,255,0.045)"
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: rows }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          x2={width}
          y1={i * tickStep}
          y2={i * tickStep}
          stroke="rgba(255,255,255,0.045)"
          strokeWidth={1}
        />
      ))}

      {corners.map(([cx, cy], idx) => (
        <g key={idx} stroke="rgba(255,255,255,0.14)" strokeWidth={1}>
          <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} />
          <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} />
        </g>
      ))}

      <text
        x={16}
        y={height - 10}
        fill="rgba(255,255,255,0.22)"
        fontSize="9"
        letterSpacing="0.14em"
        fontFamily="var(--font-mono)"
        style={{ textTransform: 'uppercase' }}
      >
        {`Fig. ${figNumber} — ${caption}`}
      </text>
      <text
        x={width - 16}
        y={height - 10}
        textAnchor="end"
        fill="rgba(255,255,255,0.22)"
        fontSize="9"
        letterSpacing="0.14em"
        fontFamily="var(--font-mono)"
        style={{ textTransform: 'uppercase' }}
      >
        {`Grid ${tickStep}px`}
      </text>
    </g>
  );
}
