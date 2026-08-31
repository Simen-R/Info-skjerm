import type { Avtale } from "@/content/prototype";
import { dato, storForbokstav } from "../format";

/** Familiens dag. I produktet synkes dette fra husstandens kalender. */
export function Kalender({ avtaler, naa }: { avtaler: Avtale[]; naa: Date }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#efeae3] px-5 pb-4 pt-6">
      <div className="leading-tight">
        <p className="text-[17px] font-semibold text-[#22292f]">I dag</p>
        <p className="text-[9px] text-[#6f7780]">{storForbokstav(dato.format(naa))}</p>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-[6px]">
        {avtaler.map((avtale) => (
          <div
            key={`${avtale.tid}-${avtale.hva}`}
            className="flex items-center gap-3 rounded-[10px] bg-white/70 px-3 py-[10px]"
          >
            <span className="w-[38px] shrink-0 text-[13px] font-semibold tabular-nums text-[#37454f]">
              {avtale.tid}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[12px] font-medium text-[#22292f]">{avtale.hva}</p>
              <p className="text-[9px] text-[#6f7780]">{avtale.hvem}</p>
            </div>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#37454f] text-[10px] font-semibold text-white">
              {avtale.hvem.charAt(0)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[8px] text-[#6f7780]">Synket fra familiens kalender</p>
    </div>
  );
}
