/** Transportikoner. Enkle SVG-er slik at de holder seg skarpe i alle
 *  rammestørrelser. Emoji ville sett ulikt ut på tvers av plattformer. */
export function TransportIkon({ modus, className }: { modus: string; className?: string }) {
  const felles = { className, viewBox: "0 0 24 24", fill: "currentColor" } as const;

  if (modus === "rail" || modus === "metro") {
    return (
      <svg {...felles} aria-hidden>
        <path d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 0 0 7.5 19L6 20.5v.5h12v-.5L16.5 19a3.5 3.5 0 0 0 3.5-3.5V6c0-3.5-3.6-4-8-4ZM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3.5-7H6V6h5v4Zm2 0V6h5v4h-5Zm3.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      </svg>
    );
  }

  if (modus === "water") {
    return (
      <svg {...felles} aria-hidden>
        <path d="M4 15.5 3 18c1.6 0 2.4 1 4 1s2.4-1 4-1 2.4 1 4 1 2.4-1 4-1l-1-2.5-1.6-4.8A2 2 0 0 0 14.5 9H14V6h-4v3h-.5a2 2 0 0 0-1.9 1.4L6 15.5h-2Z" />
      </svg>
    );
  }

  if (modus === "tram") {
    return (
      <svg {...felles} aria-hidden>
        <path d="M11 2v2H7.5A2.5 2.5 0 0 0 5 6.5v9A2.5 2.5 0 0 0 7 17.9V19l-2 2h14l-2-2v-1.1a2.5 2.5 0 0 0 2-2.4v-9A2.5 2.5 0 0 0 16.5 4H13V2h-2Zm-3.5 4h9v4h-9V6ZM8 13.5a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm8 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z" />
      </svg>
    );
  }

  // buss og alt annet
  return (
    <svg {...felles} aria-hidden>
      <path d="M6 2h12a2 2 0 0 1 2 2v11.5a2.5 2.5 0 0 1-1.5 2.3V20a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8.5v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2.2A2.5 2.5 0 0 1 4 15.5V4a2 2 0 0 1 2-2Zm.5 4v4.5h11V6h-11ZM7.5 15.5a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm9 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" />
    </svg>
  );
}
