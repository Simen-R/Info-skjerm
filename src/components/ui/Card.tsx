import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-kort)] border border-[var(--color-kant)] bg-[var(--color-flate)] p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
