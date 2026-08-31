import { Section } from "@/components/ui/Section";
import { Knapp } from "@/components/ui/Knapp";

export default function IkkeFunnet() {
  return (
    <Section overskrift="Fant ikke siden" ingress="Lenken finnes ikke, eller siden er ikke laget ennå.">
      <Knapp href="/">Til forsiden</Knapp>
    </Section>
  );
}
