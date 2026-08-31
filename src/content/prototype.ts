import type { Avgang, Holdeplass } from "@/lib/entur";
import type { Vaer } from "@/lib/met";

/**
 * Demodata for prototypen.
 *
 * Prototypen henter ekte sanntidsdata fra Entur og MET. Går et kall i
 * bakken, enten det er nettverket, rate limit eller et API som er nede,
 * faller skjermen tilbake på dette i stedet for å vise en feilmelding.
 * En prototype som skal demonstreres foran folk må aldri stå tom.
 */

export const standardHoldeplass = "Jernbanetorget";

export const demoHoldeplass: Holdeplass = {
  id: "demo",
  navn: "Jernbanetorget",
  sted: "Oslo",
  lat: 59.9114,
  lon: 10.75,
};

/** Bygger avganger som ligger noen minutter frem i tid fra «nå». */
export function demoAvganger(naa = new Date()): Avgang[] {
  const oppsett = [
    { linje: "17", destinasjon: "Grefsen stasjon", om: 4, forsinkelse: 2 },
    { linje: "18", destinasjon: "Ljabru", om: 7, forsinkelse: 0 },
    { linje: "19", destinasjon: "Majorstuen", om: 11, forsinkelse: 1 },
    { linje: "20", destinasjon: "Skøyen", om: 14, forsinkelse: 0 },
    { linje: "13", destinasjon: "Bekkestua", om: 18, forsinkelse: 0 },
    { linje: "12", destinasjon: "Disen", om: 22, forsinkelse: 3 },
  ];

  return oppsett.map((rad, i) => {
    const planlagt = new Date(naa.getTime() + rad.om * 60_000);
    const forventet = new Date(planlagt.getTime() + rad.forsinkelse * 60_000);
    return {
      id: `demo-${i}`,
      linje: rad.linje,
      transportmiddel: "tram",
      destinasjon: rad.destinasjon,
      planlagt: planlagt.toISOString(),
      forventet: forventet.toISOString(),
      sanntid: rad.forsinkelse > 0,
    };
  });
}

export const demoVaer: Vaer = {
  temperatur: 22,
  symbol: "partlycloudy_day",
  beskrivelse: "Delvis skyet",
  nedbor: 0,
  vind: 3,
  vindkast: 6,
  timer: [14, 15, 16, 17, 18, 19, 20].map((time, i) => ({
    tid: `2026-05-22T${String(time).padStart(2, "0")}:00:00Z`,
    temperatur: [22, 22, 23, 23, 22, 21, 20][i],
    symbol: i < 5 ? "fair_day" : i === 5 ? "cloudy" : "clearsky_night",
  })),
};

/** Familiens dag. I produktet synkes dette fra husstandens kalender. */
export type Avtale = {
  tid: string;
  hva: string;
  hvem: string;
};

export const demoKalender: Avtale[] = [
  { tid: "08:15", hva: "Levering i barnehagen", hvem: "Pappa" },
  { tid: "12:00", hva: "Tannlege", hvem: "Emma" },
  { tid: "16:30", hva: "Fotballtrening", hvem: "Emma" },
  { tid: "18:00", hva: "Middag hos mormor", hvem: "Alle" },
];

/** Beskjed sendt hjem fra mobilen. Legger seg øverst til den lukkes. */
export const demoBeskjed = {
  fra: "Datter",
  tekst: "Har du husket å ta medisinene dine i dag?",
  tid: "Nå",
};
