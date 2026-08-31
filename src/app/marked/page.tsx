import { Hero } from "@/components/sections/Hero";
import { PunktGrid } from "@/components/sections/PunktGrid";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { lagMetadata } from "@/lib/metadata";
import { marked } from "@/content/marked";

export const metadata = lagMetadata("Marked", "Markedspotensial, konkurrenter og trender.");

export default function MarkedSide() {
  return (
    <>
      <Hero
        merkelapp="Deliver III: Markedspotensial"
        overskrift="Marked"
        ingress="Hvor stort er markedet, hvem konkurrerer vi mot, og hvorfor er timingen riktig nå?"
      />
      <Section overskrift="Markedsstørrelse">
        <div className="grid gap-4 sm:grid-cols-3">
          {marked.storrelser.map((str) => (
            <Card key={str.navn}>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-skifer)]">
                {str.navn}
              </p>
              <p className="mt-2 text-3xl font-semibold">{str.verdi}</p>
              <p className="mt-2 text-sm text-[var(--color-dempet)]">{str.forklaring}</p>
              {str.kilde && (
                <p className="mt-3 text-xs text-[var(--color-dempet)]">Kilde: {str.kilde}</p>
              )}
            </Card>
          ))}
        </div>
      </Section>
      <Section overskrift="Konkurrenter" className="border-t border-[var(--color-kant)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="text-[var(--color-dempet)]">
              <tr className="border-b border-[var(--color-kant)]">
                <th className="py-3 pr-4 font-medium">Aktør</th>
                <th className="py-3 pr-4 font-medium">Posisjon i dag</th>
                <th className="py-3 font-medium">Vår fordel</th>
              </tr>
            </thead>
            <tbody>
              {marked.konkurrenter.map((k) => (
                <tr key={k.navn} className="border-b border-[var(--color-kant)]">
                  <td className="py-3 pr-4 font-medium">{k.navn}</td>
                  <td className="py-3 pr-4 text-[var(--color-dempet)]">{k.posisjon}</td>
                  <td className="py-3 text-[var(--color-dempet)]">{k.vaarFordel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section overskrift="Trender" className="border-t border-[var(--color-kant)]">
        <PunktGrid punkter={marked.trender} />
      </Section>
    </>
  );
}
