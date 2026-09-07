import type { Bilde, Lenke } from "./types";

// Vercel setter gjerne variabelen til tom streng når feltet står tomt i
// prosjektinnstillingene, og `??` fanger ikke tom streng. Da havner "" i
// `new URL()` i layout.tsx og bygget faller. Derfor plukker vi første
// verdi som faktisk inneholder noe.
function finnSideUrl(): string {
  const oppgitt = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  // Et domene uten protokoll er også ugyldig for `new URL()`.
  if (oppgitt) return /^https?:\/\//.test(oppgitt) ? oppgitt : `https://${oppgitt}`;

  // Vercel eksponerer domenet uten protokoll på server ved preview-bygg.
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const site = {
  navn: "BASEN",
  tagline: "Informasjonen du trenger, i en ramme du faktisk vil ha på veggen",
  beskrivelse:
    "BASEN er en informasjonsskjerm i A-format som viser neste avgang, været og familiens dag. Resten av tiden henger den på veggen som et bilde.",
  emne: "DATA3300 Entreprenørskap i praksis, OsloMet høst 2026",
  url: finnSideUrl(),
} as const;

/** Logoen: navnet skåret i tre, i den rammen produktet selv skal henge i. */
export const logo: Bilde = {
  src: "/images/basen-logo.jpg",
  alt: "BASEN-logoen: navnet skåret i tre i en treramme på veggen",
  bredde: 1060,
  hoyde: 470,
};

/** Tettere utsnitt av samme logo, til den lille plassen i headeren. */
export const logoMerke: Bilde = {
  src: "/images/basen-merke.jpg",
  // Kort alt-tekst: bildet er lenketeksten hjem, ikke en illustrasjon.
  alt: "BASEN",
  bredde: 480,
  hoyde: 202,
};

export const hovedmeny: Lenke[] = [
  { label: "Produkt", href: "/produkt" },
  { label: "Marked", href: "/marked" },
  { label: "Forretningsmodell", href: "/forretningsmodell" },
  { label: "Team", href: "/team" },
  { label: "Prototype", href: "/prototype" },
];
