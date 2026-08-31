import type { BusinessModelCanvas } from "@/content/types";
import { Card } from "@/components/ui/Card";

const rekkefolge: { nokkel: keyof BusinessModelCanvas; tittel: string; bredde: string }[] = [
  { nokkel: "noekkelpartnere", tittel: "Nøkkelpartnere", bredde: "lg:col-span-2 lg:row-span-2" },
  { nokkel: "noekkelaktiviteter", tittel: "Nøkkelaktiviteter", bredde: "lg:col-span-2" },
  { nokkel: "verdilofter", tittel: "Verdiløfter", bredde: "lg:col-span-2 lg:row-span-2" },
  { nokkel: "kundeforhold", tittel: "Kundeforhold", bredde: "lg:col-span-2" },
  { nokkel: "kundesegmenter", tittel: "Kundesegmenter", bredde: "lg:col-span-2 lg:row-span-2" },
  { nokkel: "noekkelressurser", tittel: "Nøkkelressurser", bredde: "lg:col-span-2" },
  { nokkel: "kanaler", tittel: "Kanaler", bredde: "lg:col-span-2" },
  { nokkel: "kostnadsstruktur", tittel: "Kostnadsstruktur", bredde: "lg:col-span-5" },
  { nokkel: "inntektsstrommer", tittel: "Inntektsstrømmer", bredde: "lg:col-span-5" },
];

/** Business Model Canvas i klassisk 9-felts oppsett på store skjermer,
 *  stablet i én kolonne på mobil. */
export function CanvasGrid({ canvas }: { canvas: BusinessModelCanvas }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-10">
      {rekkefolge.map((felt) => (
        <Card key={felt.nokkel} className={`p-5 ${felt.bredde}`}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-skifer)]">
            {felt.tittel}
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-[var(--color-dempet)] marker:text-[var(--color-varmgraa)]">
            {canvas[felt.nokkel].map((linje) => (
              <li key={linje}>{linje}</li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
