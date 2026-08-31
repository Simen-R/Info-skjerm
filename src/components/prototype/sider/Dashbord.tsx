import type { Avgang } from "@/lib/entur";
import type { Vaer } from "@/lib/met";
import { symbolEmoji } from "@/lib/met";
import { TransportIkon } from "../ikoner";
import { klokkeslett, minutterTil, nedtelling, timeIDognet } from "../format";

type Props = {
  holdeplass: string;
  avganger: Avgang[];
  vaer: Vaer;
  sted: string;
  naa: Date;
  oppdatert: Date | null;
};

/** Hovedsiden: avganger til venstre, vær til høyre. */
export function Dashbord({ holdeplass, avganger, vaer, sted, naa, oppdatert }: Props) {
  return (
    <div className="flex h-full w-full">
      {/* Avganger */}
      <div className="flex w-[54%] flex-col bg-[#efeae3] px-4 pb-3 pt-5">
        <div className="mb-3 flex items-center gap-2">
          <TransportIkon modus="tram" className="h-6 w-6 text-[#22292f]" />
          <div className="leading-tight">
            <p className="text-[15px] font-semibold text-[#22292f]">{holdeplass}</p>
            <p className="text-[9px] text-[#6f7780]">Nærmeste avganger</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-[6px]">
          {avganger.slice(0, 4).map((avgang) => (
            <AvgangsKort key={avgang.id} avgang={avgang} naa={naa} />
          ))}
        </div>

        <p className="mt-2 text-[8px] text-[#6f7780]">
          {oppdatert ? `Sist oppdatert ${klokkeslett.format(oppdatert)}` : "Oppdaterer …"}
        </p>
      </div>

      {/* Vær */}
      <div className="flex w-[46%] flex-col bg-[#ccdcec] px-4 pb-3 pt-5">
        <div className="mb-2 flex items-start justify-between">
          <div className="leading-tight">
            <p className="text-[15px] font-semibold text-[#22292f]">Vær</p>
            <p className="text-[9px] text-[#4a5560]">{sted}</p>
          </div>
          <span className="rounded-full bg-[#00b9f1] px-[7px] py-[3px] text-[8px] font-bold text-white">
            MET
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[38px] leading-none">{symbolEmoji(vaer.symbol)}</span>
          <div className="leading-none">
            <p className="text-[34px] font-semibold tracking-tight text-[#22292f]">
              {vaer.temperatur}°
            </p>
            <p className="mt-1 text-[11px] font-medium text-[#22292f]">{vaer.beskrivelse}</p>
          </div>
        </div>

        <div className="mt-3 rounded-lg bg-white/45 px-2 py-2">
          <div className="flex justify-between">
            {vaer.timer.slice(0, 7).map((time) => (
              <div key={time.tid} className="flex flex-col items-center gap-[3px]">
                <span className="text-[8px] text-[#4a5560]">
                  {time.tid ? timeIDognet.format(new Date(time.tid)) : "–"}
                </span>
                <span className="text-[13px] leading-none">{symbolEmoji(time.symbol)}</span>
                <span className="text-[8px] font-medium text-[#22292f]">{time.temperatur}°</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-[6px]">
          <Maaling merkelapp="Nedbør" verdi={`${vaer.nedbor.toFixed(1)} mm`} ikon="💧" />
          <Maaling
            merkelapp="Vind (kast)"
            verdi={`${vaer.vind}${vaer.vindkast ? ` (${vaer.vindkast})` : ""} m/s`}
            ikon="🌬️"
          />
        </div>
      </div>
    </div>
  );
}

function AvgangsKort({ avgang, naa }: { avgang: Avgang; naa: Date }) {
  const forsinket =
    avgang.planlagt && avgang.forventet && new Date(avgang.forventet) > new Date(avgang.planlagt);

  return (
    <div className="rounded-[10px] bg-[#23272b] px-[10px] py-[9px] text-white">
      <div className="flex items-baseline justify-between">
        <span className="text-[15px] font-medium tabular-nums">
          {avgang.forventet ? klokkeslett.format(new Date(avgang.forventet)) : "--:--"}
        </span>
        <span className="text-[12px] tabular-nums text-white/85">
          {avgang.forventet ? nedtelling(avgang.forventet, naa) : ""}
        </span>
      </div>

      {forsinket && (
        <p className="mt-[2px] text-[8px] text-[#ff9f9f]">
          Planlagt {klokkeslett.format(new Date(avgang.planlagt))} ·{" "}
          {minutterTil(avgang.forventet, new Date(avgang.planlagt))} min forsinket
        </p>
      )}

      <div className="mt-[6px] flex items-center gap-[6px]">
        <span className="flex items-center gap-[3px] rounded bg-[#2b6ad4] px-[5px] py-[2px] text-[10px] font-semibold">
          <TransportIkon modus={avgang.transportmiddel} className="h-[10px] w-[10px]" />
          {avgang.linje}
        </span>
        <span className="truncate text-[10px] text-white/80">{avgang.destinasjon}</span>
      </div>
    </div>
  );
}

function Maaling({ merkelapp, verdi, ikon }: { merkelapp: string; verdi: string; ikon: string }) {
  return (
    <div className="rounded-lg bg-white/45 px-2 py-[7px]">
      <p className="flex items-center gap-1 text-[8px] text-[#4a5560]">
        <span className="text-[9px]">{ikon}</span>
        {merkelapp}
      </p>
      <p className="mt-[2px] text-[11px] font-medium text-[#22292f]">{verdi}</p>
    </div>
  );
}
