import type { Marked } from "./types";

/**
 * Deliver III: markedspotensial (uke 39).
 *
 * VIKTIG: tallene under er ikke fylt ut ennå med vilje. Metoden står klar,
 * men verdiene skal hentes fra oppgitte kilder før innlevering. Et tall
 * uten kilde er verdiløst i en forretningsmodell.
 */
export const marked: Marked = {
  storrelser: [
    {
      navn: "TAM",
      verdi: "—",
      forklaring:
        "Alle norske husstander i by med tilgang til kollektivtransport, ganget med en antatt pris per enhet.",
      kilde: "Må hentes: SSB, tabell over husholdninger etter sentralitet",
    },
    {
      navn: "SAM",
      verdi: "—",
      forklaring:
        "Husstander i Oslo og omegn der Ruter-data gir reell nytte, og som kjøper interiør i dette prissjiktet.",
      kilde: "Må hentes: SSB husholdninger i Oslo/Akershus + Ruters årsrapport",
    },
    {
      navn: "SOM",
      verdi: "—",
      forklaring:
        "Det vi realistisk kan selge de tre første årene gjennom nettbutikk og et fåtall forhandlere.",
      kilde: "Egen beregning basert på salgskapasitet, må dokumenteres",
    },
  ],
  konkurrenter: [
    {
      navn: "Google Nest Hub",
      posisjon: "Smartskjerm med assistent, video, foto og smarthusstyring. Billig og bredt distribuert.",
      vaarFordel:
        "Vi gjør en brøkdel av oppgavene, men uten rot og uten at produktet ser ut som en dings. Vi viser dessuten norske sanntidsdata bedre enn Google gjør.",
    },
    {
      navn: "Amazon Echo Show",
      posisjon: "Samme kategori, sterk på handel og stemmestyring. Svak norsk språkstøtte.",
      vaarFordel: "Bygget for norsk hverdag: Ruter, Yr og norsk språk fra første stund.",
    },
    {
      navn: "Skylight Calendar / familieskjermer",
      posisjon: "Digital familiekalender på vegg, populær i USA. Kalender som eneste funksjon.",
      vaarFordel: "Vi legger transport og vær på toppen av kalenderen, og gir den et uttrykk som tåler å henge fremme.",
    },
    {
      navn: "DIY: nettbrett eller Raspberry Pi på veggen",
      posisjon: "Gratis programvare, entusiastmarkedet. Krever at du bygger og vedlikeholder det selv.",
      vaarFordel: "Ferdig ut av esken, med ramme som ser ferdig ut. Målgruppa vår vil ikke skru.",
    },
    {
      navn: "Mobilen du allerede har",
      posisjon: "Det reelle alternativet for de aller fleste. Koster ingenting ekstra.",
      vaarFordel:
        "Fordelen vår er friksjon framfor funksjon: du slipper å låse opp og bytte app, informasjonen henger allerede på veggen.",
    },
  ],
  trender: [
    {
      tittel: "Åpne offentlige data er gratis å bygge på",
      beskrivelse:
        "Entur og Meteorologisk institutt tilbyr sanntidsdata åpent og uten lisenskostnad. Det som var en dyr integrasjon for ti år siden, er nå et API-kall.",
    },
    {
      tittel: "Ambient computing: teknologi som trer i bakgrunnen",
      beskrivelse:
        "Bevegelsen går fra skjermer som krever oppmerksomhet, til flater som gir informasjon i forbifarten. E-ink og lavstrømsskjermer har gjort dette mulig i hjemmet.",
    },
    {
      tittel: "Motreaksjon mot skjermrot",
      beskrivelse:
        "Varslingstretthet og bevisst mobilbruk er blitt allemannseie. En dedikert flate som gjør én ting rolig, treffer den stemningen.",
    },
    {
      tittel: "Flere eldre bor lenger hjemme",
      beskrivelse:
        "Pårørende ser etter enkle, verdige måter å holde kontakt og minne om ting på, uten at hjemmet blir en institusjon.",
    },
  ],
};
