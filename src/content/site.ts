import type { Lenke } from "./types";

export const site = {
  navn: "BASEN",
  tagline: "Informasjonen du trenger, i en ramme du faktisk vil ha på veggen",
  beskrivelse:
    "BASEN er en informasjonsskjerm i A-format som viser neste avgang, været og familiens dag. Resten av tiden henger den på veggen som et bilde.",
  emne: "DATA3300 Entreprenørskap i praksis, OsloMet høst 2026",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const hovedmeny: Lenke[] = [
  { label: "Produkt", href: "/produkt" },
  { label: "Marked", href: "/marked" },
  { label: "Forretningsmodell", href: "/forretningsmodell" },
  { label: "Team", href: "/team" },
  { label: "Prototype", href: "/prototype" },
];
