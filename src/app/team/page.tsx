import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { lagMetadata } from "@/lib/metadata";
import { team } from "@/content/team";

export const metadata = lagMetadata("Team", "Hvem vi er og hvem som gjør hva.");

export default function TeamSide() {
  return (
    <>
      <Hero
        merkelapp="Deliver IV: Team"
        overskrift="Teamet"
        ingress="Hvem vi er, og hva hver enkelt har ansvar for."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((medlem, i) => (
            <Card key={`${medlem.navn}-${i}`}>
              <h3 className="font-medium">{medlem.navn}</h3>
              <p className="mt-1 text-sm text-[var(--color-skifer)]">{medlem.rolle}</p>
              <p className="mt-3 text-sm text-[var(--color-dempet)]">{medlem.ansvar}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
