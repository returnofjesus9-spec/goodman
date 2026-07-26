'use client';

import { DrawPath } from '@/components/motion';

const common = {
  fill: 'none',
  stroke: 'rgba(217,131,90,0.85)',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 md:h-28 md:w-28" aria-hidden>
      <rect x={0.5} y={0.5} width={119} height={119} rx={2} fill="rgba(17,17,17,0.6)" stroke="rgba(255,255,255,0.1)" />
      {children}
    </svg>
  );
}

/** Browser window with a rising bar — website design & development */
export function WebsiteGlyph() {
  return (
    <Frame>
      <DrawPath d="M20 34 H100" {...common} />
      <DrawPath d="M20 24 Q20 20 24 20 H96 Q100 20 100 24 V96 Q100 100 96 100 H24 Q20 100 20 96 Z" {...common} delay={0.1} />
      <circle cx={27} cy={27} r={1.6} fill="rgba(217,131,90,0.85)" />
      <circle cx={33} cy={27} r={1.6} fill="rgba(217,131,90,0.5)" />
      <DrawPath d="M32 84 V60 M50 84 V50 M68 84 V66 M86 84 V42" {...common} strokeWidth={2} delay={0.3} />
    </Frame>
  );
}

/** Looping arrow — automation running on its own */
export function AutomationGlyph() {
  return (
    <Frame>
      <DrawPath
        d="M60 26 A34 34 0 1 1 27.5 51"
        {...common}
        delay={0.1}
      />
      <DrawPath d="M18 42 L27.5 51 L37 40" {...common} delay={0.5} />
      <circle cx={60} cy={26} r={2.2} fill="rgba(217,131,90,0.85)" />
    </Frame>
  );
}

/** Simple readable bars — dashboards & analytics */
export function DashboardGlyph() {
  return (
    <Frame>
      <DrawPath d="M26 90 H94" {...common} />
      <DrawPath d="M38 90 V66" {...common} strokeWidth={2} delay={0.15} />
      <DrawPath d="M58 90 V44" {...common} strokeWidth={2} delay={0.3} />
      <DrawPath d="M78 90 V56" {...common} strokeWidth={2} delay={0.45} />
      <DrawPath d="M34 60 L54 40 L74 50 L92 30" {...common} delay={0.7} stroke="rgba(174,83,48,0.9)" />
    </Frame>
  );
}

/** Connected nodes shaped around a workflow — custom software */
export function CustomGlyph() {
  return (
    <Frame>
      <DrawPath d="M32 34 L60 60 L88 34 M60 60 V90 M32 90 L60 60 L88 90" {...common} delay={0.15} />
      <circle cx={32} cy={34} r={4} fill="rgba(17,17,17,1)" stroke="rgba(217,131,90,0.85)" strokeWidth={1.4} />
      <circle cx={88} cy={34} r={4} fill="rgba(17,17,17,1)" stroke="rgba(217,131,90,0.85)" strokeWidth={1.4} />
      <circle cx={32} cy={90} r={4} fill="rgba(17,17,17,1)" stroke="rgba(217,131,90,0.85)" strokeWidth={1.4} />
      <circle cx={88} cy={90} r={4} fill="rgba(17,17,17,1)" stroke="rgba(217,131,90,0.85)" strokeWidth={1.4} />
      <circle cx={60} cy={60} r={5} fill="rgba(174,83,48,0.9)" />
    </Frame>
  );
}
