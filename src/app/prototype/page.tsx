import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Basen } from "@/components/prototype/Basen";
import { lagMetadata } from "@/lib/metadata";

export const metadata = lagMetadata(
  "Prototype",
  "Prøv BASEN med ekte sanntidsdata fra Entur og Meteorologisk institutt.",
);

export default function PrototypeSide() {
  return (
    <>
      <Hero
        merkelapp="MVP, presenteres uke 44"
        overskrift="Prøv skjermen"
        ingress="Dette er BASEN slik den ville sett ut på veggen. Avgangene og været er ekte sanntidsdata. Søk opp holdeplassen din og se den oppdatere seg."
      />

      <Section>
        <Basen />
      </Section>

      <Section
        overskrift="Hva prototypen beviser"
        ingress="Vi bygget den for å få svar på tre spørsmål vi trengte avklart tidlig."
        className="border-t border-[var(--color-kant)]"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <h3 className="font-medium">At dataene finnes</h3>
            <p className="mt-2 text-sm text-[var(--color-dempet)]">
              Avganger fra Entur og vær fra Meteorologisk institutt ligger i åpne API-er uten
              lisenskostnad. Hele datagrunnlaget produktet trenger, er gratis tilgjengelig.
            </p>
          </Card>
          <Card>
            <h3 className="font-medium">At det er lesbart på avstand</h3>
            <p className="mt-2 text-sm text-[var(--color-dempet)]">
              Bytt mellom A5, A4 og A3 og gå to skritt bak skjermen. Klarer du ikke lese
              avgangen, er formatet feil. Det vil vi finne ut nå, ikke etter at den er produsert.
            </p>
          </Card>
          <Card>
            <h3 className="font-medium">At mindre er nok</h3>
            <p className="mt-2 text-sm text-[var(--color-dempet)]">
              Tre visninger, ingen meny og ingen assistent. Det vi tester på folk, er om de
              savner noe, eller om det er nettopp derfor de vil ha den.
            </p>
          </Card>
        </div>
      </Section>

      <Section overskrift="Slik virker den" className="border-t border-[var(--color-kant)]">
        <Card>
          <ul className="space-y-3 text-sm text-[var(--color-dempet)]">
            <li>
              <span className="text-[var(--color-blekk)]">Avganger:</span> Enturs
              JourneyPlanner-API, samme nasjonale datagrunnlag som Ruter-appen bruker.
            </li>
            <li>
              <span className="text-[var(--color-blekk)]">Vær:</span> Locationforecast fra
              Meteorologisk institutt (Yr), hentet for koordinatene til holdeplassen du velger.
            </li>
            <li>
              <span className="text-[var(--color-blekk)]">Kalender og beskjeder:</span> demodata
              i denne versjonen. Det er neste integrasjon vi bygger.
            </li>
            <li>
              <span className="text-[var(--color-blekk)]">Faller en kilde ut,</span> viser
              skjermen demodata i stedet for en feilmelding. En prototype som skal
              demonstreres foran folk, må aldri stå tom.
            </li>
          </ul>
        </Card>
      </Section>
    </>
  );
}
