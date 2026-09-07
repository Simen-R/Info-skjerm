import type { Teammedlem } from "./types";

/** Deliver IV: team (uke 40).
 *  Rollene under er fordelt etter malen fra emnet — bekreft fordelingen
 *  og fyll inn etternavn før innlevering. */
export const team: Teammedlem[] = [
  { navn: "Simen", rolle: "Produkt", ansvar: "Idé, brukerinnsikt og prototype" },
  { navn: "Sivert", rolle: "Teknologi", ansvar: "Utvikling og drift" },
  { navn: "Tinius", rolle: "Marked", ansvar: "Kundeinnsikt, marked og pitch" },
  { navn: "Jonas", rolle: "Økonomi", ansvar: "Kostnadsbilde, finansiering og budsjett" },
];
