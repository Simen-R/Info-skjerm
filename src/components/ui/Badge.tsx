export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-kant)] bg-[var(--color-flate)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-dempet)]">
      {children}
    </span>
  );
}
