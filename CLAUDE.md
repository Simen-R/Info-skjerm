# CLAUDE.md

Prosjektside for DATA3300 Entreprenørskap i praksis (OsloMet, H2026).
Produktet heter **BASEN** — en informasjonsskjerm i A-format som henger på
veggen som et bilde og viser avganger, vær, kalender og beskjeder.

Next.js (App Router) + TypeScript + Tailwind v4, hostet på Vercel.

## Arbeidsregler

- **Tekst bor i `src/content/`.** Komponenter skal ikke inneholde hardkodet
  brødtekst. Endrer du budskapet, endrer du en innholdsfil.
- **Typene i `src/content/types.ts` er kontrakten.** Endrer du formen på
  innholdet, endrer du typen først.
- **Fagteksten skrives i `docs/` først.** Nettsiden viser kortversjonen.
  Nettsiden og innleveringen skal aldri si to forskjellige ting.
- **Eksterne API-er kalles kun fra server** (`src/lib/entur.ts`,
  `src/lib/met.ts`), aldri fra nettleseren — de krever identifiserende headere
  som ikke hører hjemme i klienten.
- **Prototypen skal aldri stå tom.** Faller en datakilde ut, byttes den delen
  ut med demodata fra `src/content/prototype.ts`. Den skal kunne demonstreres
  foran folk uten nett.
- **Ikke dikt opp tall.** Markedstall uten kilde skal stå som `—` med kilden
  som mangler notert. Det er verre å levere et oppdiktet tall enn et tomt felt.
- Norsk (bokmål) i all UI-tekst og alle kommentarer. Kodeidentifikatorer er
  også norske der det gir bedre lesbarhet — vær konsekvent med filen du er i.
- Æ/ø/å unngås i mappe- og filnavn (`kjoreplan`, `noekkelressurser`) for å
  slippe trøbbel med URL-er og verktøy.

## Designtokens

Paletten ligger i `@theme` i `src/app/globals.css` og er hentet fra produktet:
papir (`--color-papir`), varmgrå, blåskifer, himmelblå. Skal uttrykket endres,
endres det der — ikke i enkeltkomponenter.

## Før du sier deg ferdig

```bash
npm run typecheck && npm run lint && npm run build
```

Merk: `npm run build` feiler med EPERM hvis en `npm run dev` kjører samtidig —
de deler `.next`. Stopp dev-serveren først.

## Kontekst om emnet

Innleveringene heter Deliver I–V og er kartlagt i `docs/README.md` med frister.
Gruppeinnlevering 20.11.2026, individuelt refleksjonsnotat 27.11.2026.
