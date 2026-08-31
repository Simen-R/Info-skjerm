import type { Punkt } from "@/content/types";
import { Card } from "@/components/ui/Card";

/** Gjenbrukbart rutenett for problem, løsning, funksjoner og trender. */
export function PunktGrid({ punkter }: { punkter: Punkt[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {punkter.map((punkt) => (
        <Card key={punkt.tittel}>
          <h3 className="font-medium">{punkt.tittel}</h3>
          <p className="mt-2 text-sm text-[var(--color-dempet)]">{punkt.beskrivelse}</p>
        </Card>
      ))}
    </div>
  );
}
