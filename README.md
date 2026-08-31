# BASEN

Prosjektside for **DATA3300 Entreprenørskap i praksis** (OsloMet, høst 2026).

BASEN er en informasjonsskjerm i A-format som viser neste avgang, været og
familiens dag — og ellers henger på veggen som et bilde. Nettsiden viser frem
idéen, forretningsmodellen og en fungerende prototype.

## Kom i gang

```bash
npm install
npm run dev      # http://localhost:3000
```

Andre kommandoer:

```bash
npm run build      # produksjonsbygg — kjør denne før du pusher
npm run typecheck  # typesjekk uten å bygge
npm run lint
```

## Slik henger prosjektet sammen

```
docs/                  Fagteksten bak innleveringene (Deliver I–V + refleksjon)
public/images/         Produktbilder
src/
  app/                 Ruter (Next.js App Router)
    page.tsx             Forsiden
    produkt/             Idé og verdiløfte
    marked/              Markedspotensial
    forretningsmodell/   Business Model Canvas + finansiering
    team/                Teamet
    prototype/           Den kjørende prototypen
    api/skjerm/          Alt skjermen trenger i ett kall
    api/holdeplasser/    Søk etter holdeplass
  components/
    layout/            Header og footer
    sections/          Store sidebyggeklosser (Hero, PunktGrid, CanvasGrid)
    ui/                Små primitiver (Container, Section, Card, Knapp, Badge)
    prototype/         Selve skjermen — ramme, sider, kontrollpanel
  content/             ALT tekstinnhold, som typede TS-filer
  lib/                 entur.ts, met.ts, cn, metadata
```

**Den viktigste regelen:** tekst hører hjemme i `src/content/`, ikke i
komponentene. Skal du endre hva siden sier, endrer du en innholdsfil. Skal du
endre hvordan den ser ut, endrer du en komponent.

Fagteksten skrives ferdig i `docs/` først, og kortversjonen flyttes derfra inn i
`src/content/`. Se [docs/README.md](docs/README.md) for frister.

## Prototypen

`/prototype` kjører på ekte sanntidsdata:

- **Avganger:** [Enturs JourneyPlanner-API](https://developer.entur.org) — samme
  nasjonale datagrunnlag som Ruter-appen. Ingen nøkkel, men krever en
  `ET-Client-Name`-header.
- **Vær:** [Locationforecast fra Meteorologisk institutt](https://api.met.no) —
  ingen nøkkel, men krever en identifiserende `User-Agent`.

Begge kalles kun fra server (`src/lib/`), aldri fra nettleseren. Svarer en av
dem ikke, bytter serveren inn demodata fra `src/content/prototype.ts` for
akkurat den delen — prototypen skal aldri stå tom foran et publikum.

## Deploy

Hostes på Vercel. Koble GitHub-repoet til Vercel én gang — deretter bygges
`main` automatisk ved hver push, og pull requests får sin egen forhåndsvisning.

Sett `NEXT_PUBLIC_SITE_URL` til produksjonsdomenet i Vercel-prosjektet når det
er klart (brukes til delingsdata/OG-tagger).

## Det som gjenstår

- Ekte navn på teamet i `src/content/team.ts`
- Tall med kilde i `src/content/marked.ts` (TAM/SAM/SOM)
- BOM og prissetting — se de åpne spørsmålene i `docs/02-business-model-canvas.md`
