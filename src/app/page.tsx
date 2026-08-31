import { Hero } from "@/components/sections/Hero";
import { PunktGrid } from "@/components/sections/PunktGrid";
import { Produktbilde } from "@/components/sections/Produktbilde";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Knapp } from "@/components/ui/Knapp";
import { site } from "@/content/site";
import { verdilofte } from "@/content/produkt";

export default function Forside() {
  return (
    <>
      <Hero
        merkelapp={site.emne}
        overskrift={site.tagline}
        ingress={site.beskrivelse}
        primaer={{ label: "Prøv prototypen", href: "/prototype" }}
        sekundaer={{ label: "Les om produktet", href: "/produkt" }}
      />

      <div className="py-14">
        <Produktbilde
          src="/images/basen-dashbord.png"
          alt="BASEN i tre rammestørrelser som viser avganger og vær"
          bildetekst="BASEN i A3, A4 og A5. Avganger til venstre, været til høyre og en beskjed hjemmefra øverst."
          prioritet
        />
      </div>

      <Section
        overskrift="Problemet"
        ingress="Et lite problem, men et som gjentar seg hver eneste morgen."
        className="border-t border-[var(--color-kant)]"
      >
        <PunktGrid punkter={verdilofte.problem} />
      </Section>

      <Section
        overskrift="Løsningen"
        ingress="En skjerm som gjør få ting, og som du gjerne henger i gangen."
        className="border-t border-[var(--color-kant)]"
      >
        <PunktGrid punkter={verdilofte.losning} />
      </Section>

      <div className="border-t border-[var(--color-kant)] py-16">
        <Produktbilde
          src="/images/basen-hvilemodus.png"
          alt="BASEN i hvilemodus med klokke, dato og temperatur"
          bildetekst="Hvilemodus. Når ingen ser på den, er den et bilde med klokke og temperatur."
        />
      </div>

      <Section className="border-t border-[var(--color-kant)]">
        <Card className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Se den med ekte data</h2>
            <p className="mt-2 max-w-lg text-sm text-[var(--color-dempet)]">
              Prototypen kjører på sanntid fra Entur og Meteorologisk institutt. Søk opp din
              holdeplass og se skjermen oppdatere seg.
            </p>
          </div>
          <Knapp href="/prototype">Prøv prototypen</Knapp>
        </Card>
      </Section>
    </>
  );
}
