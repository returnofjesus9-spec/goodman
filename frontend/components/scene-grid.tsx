export default function SceneGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 animate-grid-drift bg-grid bg-grid-fine opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px w-full animate-scanline bg-gradient-to-r from-transparent via-accent-light/70 to-transparent" />
    </div>
  );
}
