type Props = {
  fra: string;
  tekst: string;
  tid: string;
  onLukk: () => void;
};

/** Beskjed sendt hjem fra mobilen. Legger seg øverst til noen lukker den. */
export function Beskjed({ fra, tekst, tid, onLukk }: Props) {
  return (
    <div className="absolute inset-x-3 top-3 z-10 rounded-[12px] bg-white/95 px-3 py-[10px] shadow-[0_6px_18px_-6px_rgba(34,41,47,0.4)] backdrop-blur">
      <div className="flex items-start gap-[10px]">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#37454f] text-[11px] font-semibold text-white">
          {fra.charAt(0)}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[11px] font-semibold text-[#22292f]">{fra}</p>
          <p className="mt-[2px] text-[10px] text-[#4a5560]">{tekst}</p>
        </div>
        <span className="text-[8px] text-[#6f7780]">{tid}</span>
        <button
          type="button"
          onClick={onLukk}
          aria-label="Lukk beskjed"
          className="text-[12px] leading-none text-[#6f7780] transition-colors hover:text-[#22292f]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
