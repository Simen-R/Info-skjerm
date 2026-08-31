/**
 * Meteorologisk institutt (Yr), Locationforecast 2.0.
 * Åpent API uten nøkkel, men krever en identifiserende User-Agent.
 * Kalles kun fra server.
 */

const BRUKERAGENT = "BASEN-studentprosjekt-OsloMet/0.1 (DATA3300)";
const LOCATIONFORECAST = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

export type Time = {
  tid: string;
  temperatur: number;
  symbol: string;
};

export type Vaer = {
  temperatur: number;
  symbol: string;
  beskrivelse: string;
  nedbor: number;
  vind: number;
  vindkast: number | null;
  timer: Time[];
};

type MetSvar = {
  properties?: {
    timeseries?: {
      time?: string;
      data?: {
        instant?: {
          details?: {
            air_temperature?: number;
            wind_speed?: number;
            wind_speed_of_gust?: number;
          };
        };
        next_1_hours?: {
          summary?: { symbol_code?: string };
          details?: { precipitation_amount?: number };
        };
      };
    }[];
  };
};

/** MET-symbolkoder → norsk tekst. Varianten (_day/_night) er strippet først. */
const SYMBOLTEKST: Record<string, string> = {
  clearsky: "Klarvær",
  fair: "Lettskyet",
  partlycloudy: "Delvis skyet",
  cloudy: "Skyet",
  fog: "Tåke",
  lightrain: "Lett regn",
  rain: "Regn",
  heavyrain: "Kraftig regn",
  lightrainshowers: "Lette regnbyger",
  rainshowers: "Regnbyger",
  heavyrainshowers: "Kraftige regnbyger",
  sleet: "Sludd",
  lightsleet: "Lett sludd",
  heavysleet: "Kraftig sludd",
  sleetshowers: "Sluddbyger",
  snow: "Snø",
  lightsnow: "Lett snø",
  heavysnow: "Kraftig snø",
  snowshowers: "Snøbyger",
  lightsnowshowers: "Lette snøbyger",
  heavysnowshowers: "Kraftige snøbyger",
};

/** Fjerner _day/_night/_polartwilight og eventuell tordenvariant. */
export function symbolBasis(symbol: string): string {
  return symbol.replace(/_(day|night|polartwilight)$/, "").replace(/_?and_thunder$/, "");
}

export function symbolTekst(symbol: string): string {
  const basis = symbolBasis(symbol);
  const tekst = SYMBOLTEKST[basis];
  if (!tekst) return "Ukjent";
  return symbol.includes("thunder") ? `${tekst} og torden` : tekst;
}

/** Enkelt emoji-oppslag. Holder for prototypen; produktet får egne ikoner. */
export function symbolEmoji(symbol: string): string {
  const basis = symbolBasis(symbol);
  const natt = symbol.endsWith("_night");
  if (basis === "clearsky") return natt ? "🌙" : "☀️";
  if (basis === "fair") return natt ? "🌙" : "🌤️";
  if (basis === "partlycloudy") return natt ? "☁️" : "⛅";
  if (basis === "cloudy") return "☁️";
  if (basis === "fog") return "🌫️";
  if (basis.includes("thunder")) return "⛈️";
  if (basis.includes("snow")) return "🌨️";
  if (basis.includes("sleet")) return "🌧️";
  if (basis.includes("rain")) return "🌧️";
  return "☁️";
}

export async function hentVaer(lat: number, lon: number): Promise<Vaer> {
  // MET krever avrundede koordinater (maks 4 desimaler) for å kunne cache.
  const url = `${LOCATIONFORECAST}?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`;
  const svar = await fetch(url, {
    headers: { "User-Agent": BRUKERAGENT },
    next: { revalidate: 900 },
  });
  if (!svar.ok) throw new Error(`MET svarte ${svar.status}`);

  const data = (await svar.json()) as MetSvar;
  const serie = data.properties?.timeseries ?? [];
  const naa = serie[0];
  if (!naa?.data?.instant?.details) throw new Error("Tomt værvarsel");

  const detaljer = naa.data.instant.details;
  const symbol = naa.data.next_1_hours?.summary?.symbol_code ?? "cloudy";

  return {
    temperatur: Math.round(detaljer.air_temperature ?? 0),
    symbol,
    beskrivelse: symbolTekst(symbol),
    nedbor: naa.data.next_1_hours?.details?.precipitation_amount ?? 0,
    vind: Math.round(detaljer.wind_speed ?? 0),
    vindkast: detaljer.wind_speed_of_gust ? Math.round(detaljer.wind_speed_of_gust) : null,
    timer: serie.slice(1, 8).map((punkt) => ({
      tid: punkt.time ?? "",
      temperatur: Math.round(punkt.data?.instant?.details?.air_temperature ?? 0),
      symbol: punkt.data?.next_1_hours?.summary?.symbol_code ?? "cloudy",
    })),
  };
}
