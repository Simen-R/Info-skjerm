import type { Vaer } from "@/lib/met";
import { symbolEmoji } from "@/lib/met";
import { dato, klokkeslett, storForbokstav } from "../format";

/**
 * Hvilemodus. Står skjermen urørt, faller den tilbake hit: klokke, dato,
 * temperatur og ellers rolig grafikk som tåler å henge i en stue.
 */
export function Hvilemodus({ vaer, naa }: { vaer: Vaer; naa: Date }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#e9e3db]">
      {/* Grafikken er to sirkler. Enkelt med vilje, den skal ikke stjele
          oppmerksomhet, bare gi flaten et uttrykk. */}
      <div className="absolute -bottom-[38%] -left-[30%] h-[92%] w-[92%] rounded-full bg-[#cbc6bd]" />
      <div className="absolute -bottom-[22%] -right-[34%] h-[78%] w-[78%] rounded-full bg-[#37454f]" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div>
          <p className="text-[44px] font-medium leading-none tracking-tight text-[#22292f] tabular-nums">
            {klokkeslett.format(naa)}
          </p>
          <p className="mt-2 text-[12px] text-[#4a5560]">{storForbokstav(dato.format(naa))}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[22px] leading-none">{symbolEmoji(vaer.symbol)}</span>
          <div className="leading-tight">
            <p className="text-[20px] font-medium text-[#22292f]">{vaer.temperatur}°</p>
            <p className="text-[10px] text-[#4a5560]">{vaer.beskrivelse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
