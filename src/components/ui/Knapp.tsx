import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primær" | "sekundær";
};

export function Knapp({ href, children, variant = "primær" }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
        variant === "primær"
          ? "bg-[var(--color-skifer)] text-[var(--color-papir)] hover:bg-[var(--color-blekk)]"
          : "border border-[var(--color-kant)] bg-[var(--color-flate)] text-[var(--color-blekk)] hover:border-[var(--color-varmgraa)]",
      )}
    >
      {children}
    </Link>
  );
}
