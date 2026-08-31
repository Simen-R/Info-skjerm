"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Avgang, Holdeplass } from "@/lib/entur";
import type { Vaer } from "@/lib/met";
import {
  demoAvganger,
  demoBeskjed,
  demoHoldeplass,
  demoKalender,
  demoVaer,
} from "@/content/prototype";
import {
  MATERIALER,
  Ramme,
  STORRELSER,
  type Materiale,
  type Storrelse,
} from "./Ramme";
import { SIDER, Skjerm, type Side } from "./Skjerm";
import { Blaring } from "./Blaring";
import { Kontroller } from "./Kontroller";

export type Kilde = "live" | "demo";

export type SkjermSvar = {
  holdeplass: string;
  avganger: Avgang[];
  vaer: Vaer;
  kilder: { avganger: Kilde; vaer: Kilde };
  hentet: string;
};

const OPPDATERING_MS = 60_000;

/**
 * Prototypen av BASEN.
 *
 * Skjermen henter ekte sanntidsdata fra Entur (avganger) og MET (vær)
 * via `/api/skjerm`. Svarer en av kildene ikke, bytter serveren inn
 * demodata for akkurat den delen. Prototypen skal aldri stå tom foran
 * et publikum.
 */
export function Basen() {
  const [storrelse, setStorrelse] = useState<Storrelse>("A4");
  const [materiale, setMateriale] = useState<Materiale>("svart");
  const [side, setSide] = useState<Side>("avganger");
  const [holdeplass, setHoldeplass] = useState<Holdeplass | null>(null);
  const [data, setData] = useState<SkjermSvar | null>(null);
  const [naa, setNaa] = useState<Date | null>(null);
  const [beskjedSynlig, setBeskjedSynlig] = useState(true);
  const [henter, setHenter] = useState(false);
  const sveipStart = useRef<number | null>(null);

  /** Bla én visning frem eller tilbake, med rundgang. */
  const bla = useCallback((retning: 1 | -1) => {
    setSide((forrige) => {
      const indeks = SIDER.indexOf(forrige);
      return SIDER[(indeks + retning + SIDER.length) % SIDER.length];
    });
  }, []);

  // Klokka går uavhengig av datahentingen, så nedtellingen ikke står stille.
  useEffect(() => {
    setNaa(new Date());
    const id = setInterval(() => setNaa(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hentData = useCallback(async (valgt: Holdeplass | null) => {
    setHenter(true);
    const parametre = new URLSearchParams();
    if (valgt) {
      parametre.set("stopp", valgt.id);
      parametre.set("navn", valgt.navn);
      parametre.set("lat", String(valgt.lat));
      parametre.set("lon", String(valgt.lon));
    }

    try {
      const svar = await fetch(`/api/skjerm?${parametre}`);
      if (!svar.ok) throw new Error(`Skjerm-API svarte ${svar.status}`);
      setData((await svar.json()) as SkjermSvar);
    } catch (feil) {
      console.error("Klarte ikke hente skjermdata:", feil);
      setData({
        holdeplass: valgt?.navn ?? demoHoldeplass.navn,
        avganger: demoAvganger(),
        vaer: demoVaer,
        kilder: { avganger: "demo", vaer: "demo" },
        hentet: new Date().toISOString(),
      });
    } finally {
      setHenter(false);
    }
  }, []);

  useEffect(() => {
    void hentData(holdeplass);
    const id = setInterval(() => void hentData(holdeplass), OPPDATERING_MS);
    return () => clearInterval(id);
  }, [hentData, holdeplass]);

  const sted = holdeplass?.sted || demoHoldeplass.sted;
  const oppdatert = data ? new Date(data.hentet) : null;
  const erLive = data?.kilder.avganger === "live" && data?.kilder.vaer === "live";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="flex flex-col items-center gap-5">
        <div
          role="group"
          tabIndex={0}
          aria-label="BASEN-skjermen. Bruk piltastene eller sveip for å bla mellom visningene."
          onKeyDown={(hendelse) => {
            if (hendelse.key === "ArrowRight") {
              hendelse.preventDefault();
              bla(1);
            }
            if (hendelse.key === "ArrowLeft") {
              hendelse.preventDefault();
              bla(-1);
            }
          }}
          onPointerDown={(hendelse) => {
            sveipStart.current = hendelse.clientX;
          }}
          onPointerUp={(hendelse) => {
            const start = sveipStart.current;
            sveipStart.current = null;
            if (start === null) return;
            const avstand = hendelse.clientX - start;
            // Under 40 px regnes som et klikk, ikke et sveip.
            if (Math.abs(avstand) > 40) bla(avstand < 0 ? 1 : -1);
          }}
          onPointerCancel={() => {
            sveipStart.current = null;
          }}
          className="w-full touch-pan-y rounded-[6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-[var(--color-skifer)]"
        >
          <Ramme storrelse={storrelse} materiale={materiale}>
            {naa && data ? (
              <Skjerm
                side={side}
                onBytt={setSide}
                holdeplass={data.holdeplass}
                sted={sted}
                avganger={data.avganger}
                vaer={data.vaer}
                avtaler={demoKalender}
                naa={naa}
                oppdatert={oppdatert}
                beskjed={beskjedSynlig ? demoBeskjed : null}
                onLukkBeskjed={() => setBeskjedSynlig(false)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#efeae3]">
                <p className="text-[12px] text-[#6f7780]">Kobler til …</p>
              </div>
            )}
          </Ramme>
        </div>

        <Blaring
          side={side}
          onForrige={() => bla(-1)}
          onNeste={() => bla(1)}
          undertekst={`${storrelse} · ${STORRELSER[storrelse].maal} · ${MATERIALER[materiale].navn}`}
        />

        <p className="text-xs text-[var(--color-dempet)]">
          Bla med pilene, piltastene, sveip eller punktene nederst på skjermen.
        </p>
      </div>

      <Kontroller
        storrelse={storrelse}
        onStorrelse={setStorrelse}
        materiale={materiale}
        onMateriale={setMateriale}
        side={side}
        onSide={setSide}
        holdeplass={holdeplass}
        onHoldeplass={setHoldeplass}
        erLive={Boolean(erLive)}
        henter={henter}
        oppdatert={oppdatert}
        beskjedSynlig={beskjedSynlig}
        onBeskjed={() => setBeskjedSynlig((synlig) => !synlig)}
      />
    </div>
  );
}
