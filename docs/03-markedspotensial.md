# Deliver III — Markedspotensialet

> Frist: uke 39 (man 21.9.2026). Pensum: Lyons kap. 4; Neely & Leonardi 2022.
> Speiles i `src/content/marked.ts`.

## Markedsstørrelse

**Tallene er ikke fylt ut ennå — med vilje.** Metoden står klar, men verdiene
skal hentes fra oppgitte kilder før innlevering. Et tall uten kilde er verdiløst
i en forretningsmodell, og enda verre i en sensur.

| Nivå | Verdi | Hvordan vi kommer frem til det | Kilde som må hentes |
| --- | --- | --- | --- |
| TAM | — | Alle norske husstander i by med kollektivtilbud × antatt pris per enhet | SSB: husholdninger etter sentralitet |
| SAM | — | Husstander i Oslo/Akershus der Ruter-data gir reell nytte, og som kjøper interiør i dette prissjiktet | SSB husholdninger + Ruters årsrapport |
| SOM | — | Det vi realistisk selger de tre første årene via nettbutikk og et fåtall forhandlere | Egen beregning, må dokumenteres |

Antatt pris per enhet er den andre variabelen vi mangler. Den henger sammen med
BOM-kostnaden i Deliver II — de to må regnes ut sammen.

## Kunden vs. brukeren

De er ofte ikke den samme personen, og det har konsekvenser for hvordan vi
selger:

- I barnefamilien kjøper én forelder, mens hele husstanden bruker.
- I eldresegmentet er det ofte **den pårørende som kjøper** og forelderen som
  bruker. Da må kjøpsargumentet handle om trygghet, ikke om avgangstider.
- Som gave er kjøperen en helt tredje person som aldri ser skjermen i bruk.

## Konkurrenter

| Aktør | Posisjon i dag | Vår fordel |
| --- | --- | --- |
| Google Nest Hub | Smartskjerm med assistent, video, foto og smarthusstyring. Billig og bredt distribuert. | Vi gjør en brøkdel av oppgavene, men uten rot og uten at den ser ut som en dings. Bedre norske sanntidsdata. |
| Amazon Echo Show | Samme kategori, sterk på handel og stemmestyring. Svak norsk språkstøtte. | Bygget for norsk hverdag: Ruter, Yr og norsk språk fra første stund. |
| Skylight Calendar o.l. | Digital familiekalender på vegg, populær i USA. Kalender som eneste funksjon. | Transport og vær på toppen av kalenderen — og et uttrykk som tåler å henge fremme. |
| DIY: nettbrett eller Raspberry Pi | Gratis programvare, entusiastmarkedet. Krever at du bygger og vedlikeholder det selv. | Ferdig ut av esken, med ramme som ser ferdig ut. Målgruppa vår vil ikke skru. |
| Mobilen du allerede har | Det reelle alternativet for de aller fleste. Koster ingenting ekstra. | Vi konkurrerer ikke på funksjon, men på friksjon: null opplåsing, null appbytte. |

**Den ærlige konkurrentanalysen:** den siste raden er den farligste. De fleste
har allerede en gratis løsning i lomma. Hele forretningsidéen hviler på at
friksjonen ved å ta den opp er stor nok, ofte nok, til at folk betaler for å
slippe den. Det er antakelsen som må testes hardest.

## Porters fem krefter — kort

- **Nye aktører:** lav terskel på programvaresiden, høyere på maskinvare og distribusjon.
- **Leverandørmakt:** vi er avhengige av panelleverandør. Datakildene er derimot gratis og offentlige.
- **Kundemakt:** høy — dette er et «nice to have»-kjøp som lett utsettes.
- **Substitutter:** mobilen. Se over.
- **Rivalisering:** Google og Amazon kan legge seg på pris når som helst. Derfor konkurrerer vi ikke på pris eller funksjonsomfang, men på uttrykk og enkelhet.

## Trender og timing

1. **Åpne offentlige data er gratis å bygge på.** Entur og MET tilbyr
   sanntidsdata åpent og uten lisenskostnad. Det som var en dyr integrasjon for
   ti år siden, er nå et API-kall — noe prototypen vår beviser i praksis.
2. **Ambient computing.** Bevegelsen går fra skjermer som krever oppmerksomhet,
   til flater som gir informasjon i forbifarten.
3. **Motreaksjon mot skjermrot.** Varslingstretthet og bevisst mobilbruk er blitt
   allemannseie.
4. **Flere eldre bor lenger hjemme.** Pårørende ser etter enkle, verdige måter å
   holde kontakt og minne om ting på.
