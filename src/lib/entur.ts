/**
 * Entur er det nasjonale åpne API-et for kollektivtrafikk (samme datagrunnlag
 * som Ruter-appen). Krever ingen nøkkel, men vil ha en identifiserende
 * `ET-Client-Name`-header. Kalles kun fra server, aldri fra nettleseren.
 */

const KLIENT = "oslomet-data3300-basen";
const JOURNEY_PLANNER = "https://api.entur.io/journey-planner/v3/graphql";
const GEOCODER = "https://api.entur.io/geocoder/v1/autocomplete";

export type Holdeplass = {
  id: string;
  navn: string;
  sted: string;
  lat: number;
  lon: number;
};

export type Avgang = {
  id: string;
  linje: string;
  transportmiddel: string;
  destinasjon: string;
  planlagt: string;
  forventet: string;
  sanntid: boolean;
};

type GeocoderSvar = {
  features?: {
    properties?: { id?: string; name?: string; label?: string; locality?: string; county?: string };
    geometry?: { coordinates?: [number, number] };
  }[];
};

/** Søker opp holdeplasser på navn. Brukes til å velge «din» stasjon. */
export async function sokHoldeplasser(sok: string): Promise<Holdeplass[]> {
  const url = `${GEOCODER}?text=${encodeURIComponent(sok)}&size=6&layers=venue&lang=no`;
  const svar = await fetch(url, {
    headers: { "ET-Client-Name": KLIENT },
    next: { revalidate: 86400 },
  });
  if (!svar.ok) throw new Error(`Geocoder svarte ${svar.status}`);

  const data = (await svar.json()) as GeocoderSvar;
  return (data.features ?? [])
    .filter((f) => f.properties?.id?.startsWith("NSR:StopPlace:") && f.geometry?.coordinates)
    .map((f) => ({
      id: f.properties!.id!,
      navn: f.properties!.name ?? f.properties!.label ?? "Ukjent",
      sted: f.properties!.locality ?? f.properties!.county ?? "",
      lon: f.geometry!.coordinates![0],
      lat: f.geometry!.coordinates![1],
    }));
}

const AVGANGER_SPORRING = `
  query Avganger($id: String!, $antall: Int!) {
    stopPlace(id: $id) {
      name
      estimatedCalls(numberOfDepartures: $antall, timeRange: 7200) {
        realtime
        aimedDepartureTime
        expectedDepartureTime
        destinationDisplay { frontText }
        serviceJourney {
          id
          line { publicCode transportMode }
        }
      }
    }
  }
`;

type AvgangerSvar = {
  data?: {
    stopPlace?: {
      name?: string;
      estimatedCalls?: {
        realtime?: boolean;
        aimedDepartureTime?: string;
        expectedDepartureTime?: string;
        destinationDisplay?: { frontText?: string };
        serviceJourney?: { id?: string; line?: { publicCode?: string; transportMode?: string } };
      }[];
    };
  };
};

/** Henter neste avganger fra én holdeplass. */
export async function hentAvganger(
  holdeplassId: string,
  antall = 6,
): Promise<{ holdeplass: string; avganger: Avgang[] }> {
  const svar = await fetch(JOURNEY_PLANNER, {
    method: "POST",
    headers: { "Content-Type": "application/json", "ET-Client-Name": KLIENT },
    body: JSON.stringify({
      query: AVGANGER_SPORRING,
      variables: { id: holdeplassId, antall },
    }),
    // Sanntidsdata: hold cachen kort, men ikke null. Skjermen spør ofte.
    next: { revalidate: 20 },
  });
  if (!svar.ok) throw new Error(`Entur svarte ${svar.status}`);

  const data = (await svar.json()) as AvgangerSvar;
  const stopp = data.data?.stopPlace;
  if (!stopp) throw new Error("Fant ikke holdeplassen");

  const avganger: Avgang[] = (stopp.estimatedCalls ?? []).map((kall, i) => ({
    id: `${kall.serviceJourney?.id ?? "ukjent"}-${i}`,
    linje: kall.serviceJourney?.line?.publicCode ?? "?",
    transportmiddel: kall.serviceJourney?.line?.transportMode ?? "bus",
    destinasjon: kall.destinationDisplay?.frontText ?? "",
    planlagt: kall.aimedDepartureTime ?? "",
    forventet: kall.expectedDepartureTime ?? kall.aimedDepartureTime ?? "",
    sanntid: Boolean(kall.realtime),
  }));

  return { holdeplass: stopp.name ?? "", avganger };
}
