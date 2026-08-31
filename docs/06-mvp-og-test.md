# MVP og testing

> Presenteres uke 44 (man 26.10.2026) for GründerGarasjen.
> Bygget i `src/app/prototype/` og `src/components/prototype/`.

## Status

Prototypen kjører og ligger på `/prototype`. Den henter **ekte sanntidsdata**:

- **Avganger:** Enturs JourneyPlanner-API — samme nasjonale datagrunnlag som Ruter-appen.
- **Vær:** Locationforecast fra Meteorologisk institutt, for koordinatene til valgt holdeplass.
- **Kalender og beskjeder:** demodata. Neste integrasjon.

Faller en kilde ut, bytter serveren inn demodata for den delen. En prototype som
skal demonstreres foran folk, må aldri stå tom.

## Hva MVP-en skal bevise

| Spørsmål | Hvordan prototypen svarer |
| --- | --- |
| Finnes dataene vi trenger, gratis? | Ja — begge API-ene er åpne og uten lisenskostnad. Bevist i praksis. |
| Er det lesbart på avstand? | Bytt mellom A5, A4 og A3 og gå to skritt bak. |
| Er mindre nok? | Tre visninger, ingen meny, ingen assistent. Savner folk noe? |

## Omfang

Med i MVP:
- Avganger i sanntid fra valgt holdeplass
- Vær med timesvarsel
- Familiens dag (demodata)
- Beskjed hjemmefra (demodata)
- Hvilemodus
- Tre rammestørrelser

Bevisst utelatt:
- Ekte kalenderintegrasjon (Google/Apple)
- Oppsettapp for mobil
- Faktisk maskinvare — vi tester grensesnittet, ikke panelet

## Testopplegg

| Hvem tester | Oppgave de får | Hva vi ser etter |
| --- | --- | --- |
| 5 personer i målgruppa | «Når går neste trikk?» — fra to meters avstand | Tid til svar. Over 3 sekunder er for tregt. |
| 3 husstander | Prototypen på en skjerm i gangen i en uke | Ser de på den? Nevner de den uoppfordret? |
| 5 personer | «Hva ville du betalt for dette?» — etter å ha sett den | Betalingsvilje og hvilken funksjon de begrunner den med |

## Funn

| Funn | Hva vi endret |
| --- | --- |
|  |  |
