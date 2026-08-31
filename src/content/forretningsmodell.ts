import type { BusinessModelCanvas, Finansieringskilde } from "./types";

/** Deliver II: Business Model Canvas (uke 38). Utkast som skal utfordres i gruppa. */
export const canvas: BusinessModelCanvas = {
  kundesegmenter: [
    "Barnefamilier i by med felles logistikk å holde styr på",
    "Kollektivpendlere som sjekker avganger flere ganger daglig",
    "Eldre som bor hjemme, og pårørende som vil sende en påminnelse",
    "Interiørbevisste som ikke vil ha synlig teknologi",
  ],
  verdilofter: [
    "Det du trenger å vite, uten å låse opp mobilen",
    "Gjør få ting, og gjør dem pent nok til å henge fremme",
    "Skreddersydd ved oppsett: dine holdeplasser, ditt sted, dine emner",
  ],
  kanaler: [
    "Egen nettbutikk (direkte til forbruker)",
    "Interiør- og designbutikker",
    "Instagram og TikTok, der produktet demonstrerer seg selv visuelt",
    "Gaveliste-sesong: jul og innflytting",
  ],
  kundeforhold: [
    "Selvbetjent oppsett via mobil, ferdig på under fem minutter",
    "Ingen konto nødvendig for grunnfunksjonene",
    "Programvareoppdateringer over nett",
  ],
  inntektsstrommer: [
    "Engangssalg av maskinvaren (A5 / A4 / A3)",
    "Frivillig abonnement for familiefunksjoner: delt kalender og beskjeder",
    "Salg av ekstra rammer og veggfester",
  ],
  noekkelressurser: [
    "Grensesnittdesignet, som i praksis er selve produktet",
    "Programvaren på skjermen og i oppsettappen",
    "Leverandøravtale på skjermpanel og ramme",
    "Åpne data fra Entur og Meteorologisk institutt (gratis, ingen lisenskostnad)",
  ],
  noekkelaktiviteter: [
    "Produkt- og grensesnittdesign",
    "Programvareutvikling og drift av datatjenestene",
    "Montering, pakking og logistikk",
    "Brukertesting i ekte hjem",
  ],
  noekkelpartnere: [
    "Skjerm- og elektronikkleverandør",
    "Rammeprodusent",
    "Entur og MET som datakilder",
    "Forhandlere innen interiør",
    "Inkubator (GründerGarasjen) for tidligfase",
  ],
  kostnadsstruktur: [
    "Komponenter og montering per enhet (BOM)",
    "Utviklingstid, den største kostnaden i starten",
    "Frakt, retur og kundestøtte",
    "Markedsføring og innholdsproduksjon",
    "Serverdrift for kalender og beskjeder",
  ],
};

/** Deliver V: finansieringskilder (uke 42). Utkast, og beløpene må underbygges. */
export const finansiering: Finansieringskilde[] = [
  {
    navn: "Egeninnsats",
    type: "egenkapital",
    status: "planlagt",
    kommentar: "Timer lagt ned av teamet gjennom emnet, og vår største investering i tidligfase.",
  },
  {
    navn: "Markedsavklaringstilskudd fra Innovasjon Norge",
    type: "tilskudd",
    status: "planlagt",
    kommentar: "Rettet mot å teste betalingsvilje hos de første kundene. Beløp må sjekkes mot gjeldende ordning.",
  },
  {
    navn: "StartOff / studentmidler ved OsloMet",
    type: "tilskudd",
    status: "planlagt",
    kommentar: "Undersøkes: hvilke ordninger studentprosjekter faktisk kvalifiserer til.",
  },
  {
    navn: "Forhåndssalg av første serie",
    type: "inntekt",
    status: "planlagt",
    kommentar: "Finansierer produksjonen samtidig som den beviser betalingsvilje.",
  },
];
