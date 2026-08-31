"use client";

import { useEffect, useRef, useState } from "react";

/** Designflaten skjermsidene tegnes på. Alt inni måles i disse pikslene
 *  og skaleres samlet, slik at proporsjonene holder seg i alle rammestørrelser. */
export const DESIGN = { bredde: 420, hoyde: 594 } as const;

export type Storrelse = "A5" | "A4" | "A3";

/** Maksbredder på nettsiden. Forholdet mellom dem speiler A-formatene. */
export const STORRELSER: Record<Storrelse, { maksBredde: number; maal: string }> = {
  A5: { maksBredde: 210, maal: "14,8 × 21 cm" },
  A4: { maksBredde: 300, maal: "21 × 29,7 cm" },
  A3: { maksBredde: 420, maal: "29,7 × 42 cm" },
};

/**
 * Rammematerialene kunden kan velge mellom.
 *
 * Treverket er tegnet med CSS: en grunngradient for dybde, og en tett
 * repeterende gradient på tvers som antyder årringer. Det er en tilnærming,
 * og i produktbildene brukes ekte foto, men den er god nok til at man kan
 * ta et valg, og den koster ingenting i lastetid.
 */
export const MATERIALER = {
  svart: {
    navn: "Svart",
    prove: "linear-gradient(145deg, #2a2a2a 0%, #101010 60%, #1c1c1c 100%)",
    flate: "linear-gradient(145deg, #262626 0%, #0f0f0f 45%, #1b1b1b 100%)",
    innerkant: "inset 0 0 0 1px rgba(255,255,255,0.09)",
  },
  "lys-eik": {
    navn: "Lys eik",
    prove: "linear-gradient(150deg, #e6c79c 0%, #cfa871 55%, #dfbe8d 100%)",
    flate: [
      "repeating-linear-gradient(94deg, rgba(122,84,44,0.13) 0 1px, rgba(122,84,44,0) 1px 6px)",
      "repeating-linear-gradient(94deg, rgba(255,240,220,0.10) 0 1px, rgba(255,240,220,0) 1px 13px)",
      "linear-gradient(150deg, #e7c99f 0%, #cea86f 50%, #ddbb88 100%)",
    ].join(", "),
    innerkant: "inset 0 0 0 1px rgba(94,64,32,0.28)",
  },
  "mork-eik": {
    navn: "Mørk eik",
    prove: "linear-gradient(150deg, #5d3d22 0%, #382110 55%, #4b2f1a 100%)",
    flate: [
      "repeating-linear-gradient(94deg, rgba(14,6,1,0.30) 0 1px, rgba(14,6,1,0) 1px 6px)",
      "repeating-linear-gradient(94deg, rgba(233,197,155,0.11) 0 1px, rgba(233,197,155,0) 1px 13px)",
      "linear-gradient(150deg, #5c3c21 0%, #341e0e 50%, #492d18 100%)",
    ].join(", "),
    innerkant: "inset 0 0 0 1px rgba(255,222,185,0.13)",
  },
} as const;

export type Materiale = keyof typeof MATERIALER;

export const MATERIALLISTE = Object.keys(MATERIALER) as Materiale[];

/** Rammen rundt skjermen, slik produktet faktisk henger på veggen. */
export function Ramme({
  storrelse,
  materiale,
  children,
}: {
  storrelse: Storrelse;
  materiale: Materiale;
  children: React.ReactNode;
}) {
  const maalRef = useRef<HTMLDivElement>(null);
  const [tilgjengelig, setTilgjengelig] = useState(0);

  useEffect(() => {
    const element = maalRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([oppslag]) =>
      setTilgjengelig(oppslag.contentRect.width),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const maks = STORRELSER[storrelse].maksBredde;
  const bredde = Math.min(tilgjengelig || maks, maks);
  const skala = bredde / DESIGN.bredde;
  const hoyde = DESIGN.hoyde * skala;
  const kant = Math.max(8, 14 * skala);
  const valgt = MATERIALER[materiale];

  return (
    <div ref={maalRef} className="flex w-full justify-center">
      <div
        className="rounded-[3px] transition-all duration-300"
        style={{
          padding: kant,
          background: valgt.flate,
          boxShadow: `${valgt.innerkant}, 0 18px 40px -12px rgba(34,41,47,0.45)`,
        }}
      >
        <div
          className="relative overflow-hidden bg-[#efeae3] shadow-[inset_0_1px_4px_rgba(0,0,0,0.35)]"
          style={{ width: bredde, height: hoyde }}
        >
          <div
            style={{
              width: DESIGN.bredde,
              height: DESIGN.hoyde,
              transform: `scale(${skala})`,
              transformOrigin: "top left",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
