"use client";

import { useEffect, useRef, useState } from "react";
import type { Holdeplass } from "@/lib/entur";
import { MATERIALER, MATERIALLISTE, STORRELSER, type Materiale, type Storrelse } from "./Ramme";
import { SIDENAVN, SIDER, type Side } from "./Skjerm";
import { klokkeslett } from "./format";

type Props = {
  storrelse: Storrelse;
  onStorrelse: (storrelse: Storrelse) => void;
  materiale: Materiale;
  onMateriale: (materiale: Materiale) => void;
  side: Side;
  onSide: (side: Side) => void;
  holdeplass: Holdeplass | null;
  onHoldeplass: (holdeplass: Holdeplass | null) => void;
  erLive: boolean;
  henter: boolean;
  oppdatert: Date | null;
  beskjedSynlig: boolean;
  onBeskjed: () => void;
};

/**
 * Panelet ved siden av rammen. Dette finnes ikke i produktet, der gjøres
 * alt sammen én gang under oppsett fra mobilen. Her ligger det for at vi
 * skal kunne vise frem skjermen live.
 */
export function Kontroller({
  storrelse,
  onStorrelse,
  materiale,
  onMateriale,
  side,
  onSide,
  holdeplass,
  onHoldeplass,
  erLive,
  henter,
  oppdatert,
  beskjedSynlig,
  onBeskjed,
}: Props) {
  const [sok, setSok] = useState("");
  const [treff, setTreff] = useState<Holdeplass[]>([]);
  const [soker, setSoker] = useState(false);
  const avbryt = useRef<AbortController | null>(null);

  useEffect(() => {
    const tekst = sok.trim();
    if (tekst.length < 2) {
      setTreff([]);
      return;
    }

    // Vent til folk slutter å skrive før vi spør Entur.
    const timer = setTimeout(async () => {
      avbryt.current?.abort();
      const kontroller = new AbortController();
      avbryt.current = kontroller;
      setSoker(true);
      try {
        const svar = await fetch(`/api/holdeplasser?q=${encodeURIComponent(tekst)}`, {
          signal: kontroller.signal,
        });
        const data = (await svar.json()) as { treff: Holdeplass[] };
        setTreff(data.treff);
      } catch (feil) {
        if (!(feil instanceof DOMException && feil.name === "AbortError")) {
          console.error("Holdeplassøk feilet:", feil);
          setTreff([]);
        }
      } finally {
        setSoker(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [sok]);

  return (
    <aside className="rounded-[var(--radius-kort)] border border-[var(--color-kant)] bg-[var(--color-flate)] p-6">
      <Gruppe merkelapp="Størrelse">
        <div className="flex gap-2">
          {(Object.keys(STORRELSER) as Storrelse[]).map((navn) => (
            <Valg key={navn} aktiv={navn === storrelse} onClick={() => onStorrelse(navn)}>
              {navn}
            </Valg>
          ))}
        </div>
      </Gruppe>

      <Gruppe merkelapp="Ramme">
        <div className="flex flex-col gap-2">
          {MATERIALLISTE.map((navn) => (
            <Materialvalg
              key={navn}
              aktiv={navn === materiale}
              onClick={() => onMateriale(navn)}
              prove={MATERIALER[navn].prove}
            >
              {MATERIALER[navn].navn}
            </Materialvalg>
          ))}
        </div>
      </Gruppe>

      <Gruppe merkelapp="Visning">
        <div className="flex flex-col items-start gap-2">
          {SIDER.map((navn) => (
            <Valg key={navn} aktiv={navn === side} onClick={() => onSide(navn)}>
              {SIDENAVN[navn]}
            </Valg>
          ))}
        </div>
      </Gruppe>

      <Gruppe merkelapp="Din holdeplass">
        <input
          type="search"
          value={sok}
          onChange={(hendelse) => setSok(hendelse.target.value)}
          placeholder="Søk etter holdeplass, f.eks. Majorstuen"
          className="w-full rounded-lg border border-[var(--color-kant)] bg-[var(--color-papir)] px-3 py-2 text-sm outline-none focus:border-[var(--color-skifer)]"
        />

        {soker && <p className="mt-2 text-xs text-[var(--color-dempet)]">Søker …</p>}

        {treff.length > 0 && (
          <ul className="mt-2 max-h-52 overflow-y-auto rounded-lg border border-[var(--color-kant)]">
            {treff.map((forslag) => (
              <li key={forslag.id}>
                <button
                  type="button"
                  onClick={() => {
                    onHoldeplass(forslag);
                    setSok("");
                    setTreff([]);
                  }}
                  className="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--color-papir)]"
                >
                  <span className="block font-medium">{forslag.navn}</span>
                  <span className="block text-xs text-[var(--color-dempet)]">{forslag.sted}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-3 text-xs text-[var(--color-dempet)]">
          Viser:{" "}
          <span className="text-[var(--color-blekk)]">{holdeplass?.navn ?? "Jernbanetorget"}</span>
          {holdeplass && (
            <button
              type="button"
              onClick={() => onHoldeplass(null)}
              className="ml-2 underline underline-offset-2 hover:text-[var(--color-blekk)]"
            >
              tilbakestill
            </button>
          )}
        </p>
      </Gruppe>

      <Gruppe merkelapp="Beskjed hjem">
        <Valg aktiv={beskjedSynlig} onClick={onBeskjed}>
          {beskjedSynlig ? "Skjul beskjeden" : "Send en beskjed"}
        </Valg>
      </Gruppe>

      <div className="mt-6 border-t border-[var(--color-kant)] pt-4 text-xs leading-relaxed text-[var(--color-dempet)]">
        <p className="flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: erLive ? "#2f8f5b" : "#b98a2f" }}
          />
          {erLive ? "Sanntidsdata fra Entur og MET" : "Demodata, en kilde svarte ikke"}
        </p>
        <p className="mt-1">
          {henter ? "Oppdaterer …" : oppdatert ? `Sist oppdatert ${klokkeslett.format(oppdatert)}` : ""}
        </p>
      </div>
    </aside>
  );
}

/** Valg med en fysisk materialprøve ved siden av navnet. */
function Materialvalg({
  aktiv,
  onClick,
  prove,
  children,
}: {
  aktiv: boolean;
  onClick: () => void;
  prove: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktiv}
      className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${
        aktiv
          ? "border-[var(--color-skifer)] bg-[var(--color-papir)]"
          : "border-[var(--color-kant)] hover:border-[var(--color-varmgraa)]"
      }`}
    >
      <span
        aria-hidden
        className="h-6 w-6 shrink-0 rounded-[3px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]"
        style={{ background: prove }}
      />
      <span className="text-[var(--color-blekk)]">{children}</span>
      {aktiv && <span className="ml-auto text-xs text-[var(--color-dempet)]">valgt</span>}
    </button>
  );
}

function Gruppe({ merkelapp, children }: { merkelapp: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-dempet)]">
        {merkelapp}
      </p>
      {children}
    </div>
  );
}

function Valg({
  aktiv,
  onClick,
  children,
}: {
  aktiv: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={aktiv}
      className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
        aktiv
          ? "border-[var(--color-skifer)] bg-[var(--color-skifer)] text-[var(--color-papir)]"
          : "border-[var(--color-kant)] text-[var(--color-blekk)] hover:border-[var(--color-varmgraa)]"
      }`}
    >
      {children}
    </button>
  );
}
