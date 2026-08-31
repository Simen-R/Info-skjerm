/** Felles formatering for skjermen. Alltid norsk tid, uansett hvor
 *  nettleseren står. Skjermen henger tross alt i Oslo. */

const OSLO = "Europe/Oslo";

export const klokkeslett = new Intl.DateTimeFormat("nb-NO", {
  timeZone: OSLO,
  hour: "2-digit",
  minute: "2-digit",
});

export const timeIDognet = new Intl.DateTimeFormat("nb-NO", {
  timeZone: OSLO,
  hour: "numeric",
});

export const dato = new Intl.DateTimeFormat("nb-NO", {
  timeZone: OSLO,
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** Minutter til avgang, avrundet ned og aldri negativ. */
export function minutterTil(isoTid: string, naa: Date): number {
  return Math.max(0, Math.floor((new Date(isoTid).getTime() - naa.getTime()) / 60_000));
}

/** «Nå» de første minuttet, ellers «om 6 min». */
export function nedtelling(isoTid: string, naa: Date): string {
  const minutter = minutterTil(isoTid, naa);
  return minutter < 1 ? "nå" : `${minutter} min`;
}

/** Store forbokstaver kun der norsk faktisk bruker dem. */
export function storForbokstav(tekst: string): string {
  return tekst.charAt(0).toUpperCase() + tekst.slice(1);
}
