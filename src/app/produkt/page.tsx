import { Hero } from "@/components/sections/Hero";
import { PunktGrid } from "@/components/sections/PunktGrid";
import { Produktbilde } from "@/components/sections/Produktbilde";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { lagMetadata } from "@/lib/metadata";
import { avgrensning, funksjoner, verdilofte } from "@/content/produkt";

export const metadata = lagMetadata(
  "Produkt",
  "Idé, verdiløfte og funksjonene i BASEN, informasjonsskjermen som henger som et bilde.",
);

export default function ProduktSide() {
  return (
    <>
      <Hero
        merkelapp="Deliver I: Idé og verdiløfte"
        overskrift="Produktet"
        ingress="Hva BASEN er, hvem den er for, og hvorfor den gjør mindre enn konkurrentene med vilje."
      />

      <Section overskrift="Verdiløftet">
        <Card>
          <p className="text-lg leading-relaxed">{verdilofte.paastand}</p>
        </Card>
      </Section>

      <Section
        overskrift="Funksjoner"
        ingress="Det skjermen faktisk gjør, og ikke noe mer."
        className="border-t border-[var(--color-kant)]"
      >
        <PunktGrid punkter={funksjoner} />
      </Section>

      <Section
        overskrift="Det vi har valgt bort"
        ingress="Avgrensningen er bevisst, og den er en del av produktet."
        className="border-t border-[var(--color-kant)]"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-skifer)]">
              BASEN gjør
            </h3>
            <ul className="space-y-2 text-sm">
              {avgrensning.gjor.map((punkt) => (
                <li key={punkt} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  {punkt}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-[var(--color-papir)]">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-dempet)]">
              BASEN gjør ikke
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-dempet)]">
              {avgrensning.gjorIkke.map((punkt) => (
                <li key={punkt} className="flex gap-2">
                  <span aria-hidden>✕</span>
                  {punkt}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <div className="border-t border-[var(--color-kant)] py-16">
        <Produktbilde
          src="/images/basen-hvilemodus.png"
          alt="BASEN i hvilemodus i tre størrelser"
          bildetekst="Tre standardformater: A5 til nattbordet, A4 til gangen, A3 til stueveggen."
        />
      </div>
    </>
  );
}
