import { NextResponse } from "next/server";
import { hentAvganger, sokHoldeplasser } from "@/lib/entur";
import { hentVaer } from "@/lib/met";
import { demoAvganger, demoHoldeplass, demoVaer, standardHoldeplass } from "@/content/prototype";

/**
 * GET /api/skjerm?stopp=<NSR-id>&navn=<visningsnavn>&lat=&lon=
 *
 * Alt skjermen trenger i ett kall. Feiler en av kildene, byttes bare den
 * delen ut med demodata. Skjermen viser aldri en tom rute.
 */
export async function GET(request: Request) {
  const parametre = new URL(request.url).searchParams;
  let stopp = parametre.get("stopp");
  let navn = parametre.get("navn") ?? "";
  let lat = Number(parametre.get("lat"));
  let lon = Number(parametre.get("lon"));

  // Uten valgt holdeplass slår vi opp standarden i stedet for å hardkode en id.
  if (!stopp) {
    try {
      const treff = await sokHoldeplasser(standardHoldeplass);
      if (treff[0]) {
        stopp = treff[0].id;
        navn = treff[0].navn;
        lat = treff[0].lat;
        lon = treff[0].lon;
      }
    } catch (feil) {
      console.error("Oppslag av standardholdeplass feilet:", feil);
    }
  }

  if (!Number.isFinite(lat) || !Number.isFinite(lon) || (lat === 0 && lon === 0)) {
    lat = demoHoldeplass.lat;
    lon = demoHoldeplass.lon;
  }

  const [avgangerSvar, vaerSvar] = await Promise.allSettled([
    stopp ? hentAvganger(stopp) : Promise.reject(new Error("Ingen holdeplass")),
    hentVaer(lat, lon),
  ]);

  const avgangerOk = avgangerSvar.status === "fulfilled";
  const vaerOk = vaerSvar.status === "fulfilled";

  if (!avgangerOk) console.error("Avganger feilet:", avgangerSvar.reason);
  if (!vaerOk) console.error("Vær feilet:", vaerSvar.reason);

  return NextResponse.json(
    {
      holdeplass: avgangerOk ? avgangerSvar.value.holdeplass || navn : demoHoldeplass.navn,
      avganger: avgangerOk ? avgangerSvar.value.avganger : demoAvganger(),
      vaer: vaerOk ? vaerSvar.value : demoVaer,
      kilder: {
        avganger: avgangerOk ? "live" : "demo",
        vaer: vaerOk ? "live" : "demo",
      },
      hentet: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
