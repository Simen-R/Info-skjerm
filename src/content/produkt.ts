import type { Punkt, Verdilofte } from "./types";

/** Deliver I: idé og verdiløfte (uke 37). */
export const verdilofte: Verdilofte = {
  paastand:
    "For folk med en travel hverdag er BASEN en informasjonsskjerm i A-format som viser neste avgang, været og familiens dag. Resten av tiden henger den på veggen som et bilde. Der en smartskjerm prøver å dekke alt, gjør BASEN noen få ting og gjør dem pent.",
  problem: [
    {
      tittel: "Informasjonen ligger tre steg unna",
      beskrivelse:
        "Du står i gangen med jakka på. Ruter-appen for avgangen, Yr for om du trenger paraply, kalenderen for hvem som henter. Det blir tre apper og tre opplåsinger for informasjon som uansett er utdatert om ti minutter.",
    },
    {
      tittel: "Smartskjermene gjør for mye",
      beskrivelse:
        "Google Nest Hub og liknende skal være assistent, fotoramme, TV, handleliste og høyttaler samtidig. Resultatet er et rotete grensesnitt med menyer, forslag og funksjoner som feiler, når du egentlig bare ville se én ting.",
    },
    {
      tittel: "Teknologi som ikke kler hjemmet",
      beskrivelse:
        "En plastdings med blått lys i gangen er ikke noe folk vil ha stående fremme. Derfor havner den på kjøkkenbenken, snudd bort, eller den blir aldri kjøpt.",
    },
  ],
  losning: [
    {
      tittel: "Få oppgaver, gjort ordentlig",
      beskrivelse:
        "Transport, vær, kalender og beskjeder. Det finnes ingen assistent, ingen reklame og ingen menyer å gå seg vill i. Alt skal kunne leses på to sekunder fra to meters avstand.",
    },
    {
      tittel: "Ser ut som et bilde",
      beskrivelse:
        "A3, A4 eller A5 i ramme. Når ingen ser på den, hviler den som rolig grafikk med klokke og temperatur, og den kan henge i gangen ved siden av de andre bildene.",
    },
    {
      tittel: "Skreddersydd ved oppsett",
      beskrivelse:
        "Du velger holdeplassene dine, stedet ditt og emnene dine én gang. Etterpå trenger du aldri røre den igjen.",
    },
  ],
};

/** Nøkkelfunksjoner. Speiles i prototypen på /prototype. */
export const funksjoner: Punkt[] = [
  {
    tittel: "Sanntid fra kollektivtrafikken",
    beskrivelse:
      "Neste avganger fra holdeplassene du faktisk bruker, med forsinkelser i sanntid. Bygget på Enturs åpne nasjonale API, samme datagrunnlag som Ruter-appen bruker.",
  },
  {
    tittel: "Vær fra Yr",
    beskrivelse:
      "Temperatur, nedbør, vind og timesvarsel for adressen din, hentet fra Meteorologisk institutt.",
  },
  {
    tittel: "Familiens kalender",
    beskrivelse:
      "Dagens avtaler for hele husstanden på ett sted, synket fra kalenderen dere allerede bruker.",
  },
  {
    tittel: "Beskjeder hjem",
    beskrivelse:
      "Familien kan sende en kort beskjed rett til skjermen fra mobilen. Den legger seg øverst til noen lukker den.",
  },
  {
    tittel: "Hvilemodus",
    beskrivelse:
      "Står den urørt, faller den tilbake til rolig grafikk med klokke, dato og temperatur. Den skal kunne henge i en stue uten å ta oppmerksomhet.",
  },
  {
    tittel: "Tre størrelser og tre rammer",
    beskrivelse:
      "A5 til nattbordet, A4 til gangen og A3 til stueveggen, i svart, lys eik eller mørk eik. Formatene er standard, så rammen passer inn der bilder allerede henger.",
  },
];

/** Hvorfor BASEN er noe annet enn en smartskjerm. Brukes på produktsiden. */
export const avgrensning = {
  gjor: [
    "Viser avganger, vær, kalender og beskjeder",
    "Henger på veggen som et bilde",
    "Settes opp én gang, av hvem som helst",
  ],
  gjorIkke: [
    "Ingen stemmeassistent",
    "Ingen kamera eller mikrofon",
    "Ingen app-butikk eller reklame",
  ],
};
