"use client";

import type { Avgang } from "@/lib/entur";
import type { Vaer } from "@/lib/met";
import type { Avtale } from "@/content/prototype";
import { Dashbord } from "./sider/Dashbord";
import { Hvilemodus } from "./sider/Hvilemodus";
import { Kalender } from "./sider/Kalender";
import { Beskjed } from "./Beskjed";

export const SIDER = ["avganger", "kalender", "hvilemodus"] as const;
export type Side = (typeof SIDER)[number];

export const SIDENAVN: Record<Side, string> = {
  avganger: "Avganger og vær",
  kalender: "Familiens dag",
  hvilemodus: "Hvilemodus",
};

type Props = {
  side: Side;
  onBytt: (side: Side) => void;
  holdeplass: string;
  sted: string;
  avganger: Avgang[];
  vaer: Vaer;
  avtaler: Avtale[];
  naa: Date;
  oppdatert: Date | null;
  beskjed: { fra: string; tekst: string; tid: string } | null;
  onLukkBeskjed: () => void;
};

/** Selve skjermflaten: sidene, punktene nederst og eventuell beskjed. */
export function Skjerm({
  side,
  onBytt,
  holdeplass,
  sted,
  avganger,
  vaer,
  avtaler,
  naa,
  oppdatert,
  beskjed,
  onLukkBeskjed,
}: Props) {
  const viserPunkter = side !== "hvilemodus";

  return (
    <div className="relative h-full w-full">
      {SIDER.map((navn) => (
        <div
          key={navn}
          aria-hidden={navn !== side}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: navn === side ? 1 : 0, pointerEvents: navn === side ? "auto" : "none" }}
        >
          {navn === "avganger" && (
            <Dashbord
              holdeplass={holdeplass}
              sted={sted}
              avganger={avganger}
              vaer={vaer}
              naa={naa}
              oppdatert={oppdatert}
            />
          )}
          {navn === "kalender" && <Kalender avtaler={avtaler} naa={naa} />}
          {navn === "hvilemodus" && <Hvilemodus vaer={vaer} naa={naa} />}
        </div>
      ))}

      {beskjed && viserPunkter && (
        <Beskjed fra={beskjed.fra} tekst={beskjed.tekst} tid={beskjed.tid} onLukk={onLukkBeskjed} />
      )}

      {viserPunkter && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
          {SIDER.map((navn) => (
            <button
              key={navn}
              type="button"
              onClick={() => onBytt(navn)}
              aria-label={SIDENAVN[navn]}
              title={SIDENAVN[navn]}
              className="group flex h-[18px] w-[18px] items-center justify-center"
            >
              <span
                className="h-[5px] w-[5px] rounded-full transition-all group-hover:scale-150"
                style={{ backgroundColor: navn === side ? "#37454f" : "rgba(55,69,79,0.28)" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
