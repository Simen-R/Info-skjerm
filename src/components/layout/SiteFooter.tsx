import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-kant)] py-10 text-sm text-[var(--color-dempet)]">
      <Container className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.navn} er et studentprosjekt, ikke et kommersielt produkt.
        </p>
        <p>{site.emne}</p>
      </Container>
    </footer>
  );
}
