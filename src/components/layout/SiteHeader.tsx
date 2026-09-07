import Image from "next/image";
import Link from "next/link";
import { hovedmeny, logoMerke } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-kant)] bg-[var(--color-papir)]/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="shrink-0 rounded-sm">
          <Image
            src={logoMerke.src}
            alt={logoMerke.alt}
            width={logoMerke.bredde}
            height={logoMerke.hoyde}
            priority
            sizes="86px"
            className="h-9 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto text-sm">
          {hovedmeny.map((lenke) => (
            <Link
              key={lenke.href}
              href={lenke.href}
              className="whitespace-nowrap rounded-md px-3 py-1.5 text-[var(--color-dempet)] transition-colors hover:bg-[var(--color-flate)] hover:text-[var(--color-blekk)]"
            >
              {lenke.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
