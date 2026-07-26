type Density = 'fine' | 'regular' | 'sparse';
type Fade = 'both' | 'top' | 'bottom' | 'none';

const SIZE_CLASS: Record<Density, string> = {
  fine: 'bg-grid-fine',
  regular: 'bg-grid',
  sparse: 'bg-grid-sparse',
};

const DRIFT_CLASS: Record<Density, string> = {
  fine: 'animate-grid-drift-fine',
  regular: 'animate-grid-drift',
  sparse: 'animate-grid-drift-sparse',
};

// Soft edges instead of a hard rectangle cut — this is what actually reads as
// "fading in and out" rather than a grid that just switches on and off between
// sections.
const MASK: Record<Fade, string> = {
  both: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
  top: 'linear-gradient(to bottom, transparent 0%, black 30%, black 100%)',
  bottom: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
  none: 'none',
};

/**
 * Per-section background texture. Deliberately varied rather than a single
 * site-wide sheet: density changes the grid's scale, fade softens its edges
 * into the section above/below, and sections can skip it entirely by simply
 * not rendering this component — that variation is what gives the page a
 * natural rhythm instead of one uniform grid running the full height of it.
 */
export default function SceneGrid({
  className = '',
  density = 'regular',
  fade = 'both',
  scanline = true,
}: {
  className?: string;
  density?: Density;
  fade?: Fade;
  scanline?: boolean;
}) {
  const maskImage = MASK[fade];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className={`absolute inset-0 ${DRIFT_CLASS[density]} ${SIZE_CLASS[density]} opacity-70`}
        style={
          maskImage !== 'none'
            ? { WebkitMaskImage: maskImage, maskImage, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }
            : undefined
        }
      />
      {scanline && (
        <div className="absolute inset-x-0 top-0 h-px w-full animate-scanline bg-gradient-to-r from-transparent via-accent-light/70 to-transparent" />
      )}
    </div>
  );
}
