import { Hero } from "@/components/sections/Hero";
import { CanvasGrid } from "@/components/sections/CanvasGrid";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { lagMetadata } from "@/lib/metadata";
import { canvas, finansiering } from "@/content/forretningsmodell";

export const metadata = lagMetadata(
  "Forretningsmodell",
  "Business Model Canvas og planlagte finansieringskilder.",
);

export default function ForretningsmodellSide() {
  return (
    <>
      <Hero
        merkelapp="Deliver II og V"
        overskrift="Forretningsmodell"
        ingress="Hvordan vi skaper, leverer og henter ut verdi, satt opp som Business Model Canvas."
      />
      <Section overskrift="Business Model Canvas">
        <CanvasGrid canvas={canvas} />
      </Section>
      <Section
        overskrift="Finansiering"
        ingress="Hvordan vi tenker å finansiere de første fasene."
        className="border-t border-[var(--color-kant)]"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {finansiering.map((kilde) => (
            <Card key={kilde.navn}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-medium">{kilde.navn}</h3>
                <span className="text-xs text-[var(--color-dempet)]">{kilde.status}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-dempet)]">
                {kilde.type}
                {kilde.belop ? `, ${kilde.belop}` : ""}
              </p>
              {kilde.kommentar && (
                <p className="mt-2 text-sm text-[var(--color-dempet)]">{kilde.kommentar}</p>
              )}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
