/**
 * Typene under er kontrakten mellom innhold og UI.
 * Alt tekstinnhold på nettsiden bor i `src/content/`, og komponentene
 * inneholder ingen hardkodet tekst. Skal du endre budskapet, endrer du
 * en fil her, ikke en komponent.
 */

export type Lenke = {
  label: string;
  href: string;
};

export type Punkt = {
  tittel: string;
  beskrivelse: string;
};

/** Deliver I: idé og verdiløfte */
export type Verdilofte = {
  problem: Punkt[];
  losning: Punkt[];
  /** Én setning: for [kunde] som [behov], er [produkt] et [kategori] som [nytte]. */
  paastand: string;
};

/** Deliver II: Business Model Canvas (Osterwalder, 9 byggeklosser) */
export type BusinessModelCanvas = {
  kundesegmenter: string[];
  verdilofter: string[];
  kanaler: string[];
  kundeforhold: string[];
  inntektsstrommer: string[];
  noekkelressurser: string[];
  noekkelaktiviteter: string[];
  noekkelpartnere: string[];
  kostnadsstruktur: string[];
};

/** Deliver III: markedspotensial */
export type Marked = {
  /** TAM/SAM/SOM med kilde, slik at tallene kan forsvares i innlevering. */
  storrelser: { navn: "TAM" | "SAM" | "SOM"; verdi: string; forklaring: string; kilde?: string }[];
  konkurrenter: { navn: string; posisjon: string; vaarFordel: string }[];
  trender: Punkt[];
};

/** Deliver IV: team */
export type Teammedlem = {
  navn: string;
  rolle: string;
  ansvar: string;
};

/** Deliver V: finansiering */
export type Finansieringskilde = {
  navn: string;
  type: "egenkapital" | "tilskudd" | "lån" | "inntekt" | "annet";
  belop?: string;
  status: "planlagt" | "søkt" | "innvilget";
  kommentar?: string;
};
