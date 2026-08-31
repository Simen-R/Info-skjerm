"use client";

import { SIDENAVN, SIDER, type Side } from "./Skjerm";

type Props = {
  side: Side;
  onForrige: () => void;
  onNeste: () => void;
  undertekst: string;
};

/**
 * Blafeltet under rammen. Punktene på selve skjermen er produkttro, men
 * små. Dette er den store, tydelige måten å bla på når skjermen vises
 * frem på en nettside.
 */
export function Blaring({ side, onForrige, onNeste, undertekst }: Props) {
  const nummer = SIDER.indexOf(side) + 1;

  return (
    <div className="flex items-center gap-3">
      <Pil retning="forrige" etikett="Forrige visning" onClick={onForrige} />

      <div className="min-w-[10.5rem] text-center">
        <p className="text-sm font-medium text-[var(--color-blekk)]">{SIDENAVN[side]}</p>
        <p className="mt-[2px] text-xs text-[var(--color-dempet)]">
          {nummer} av {SIDER.length} · {undertekst}
        </p>
      </div>

      <Pil retning="neste" etikett="Neste visning" onClick={onNeste} />
    </div>
  );
}

function Pil({
  retning,
  etikett,
  onClick,
}: {
  retning: "forrige" | "neste";
  etikett: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={etikett}
      title={etikett}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-kant)] bg-[var(--color-flate)] text-[var(--color-blekk)] transition-colors hover:border-[var(--color-skifer)] hover:bg-[var(--color-skifer)] hover:text-[var(--color-papir)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-skifer)]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path
          d={retning === "forrige" ? "M15 5 8 12l7 7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
