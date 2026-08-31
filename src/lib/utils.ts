/** Slår sammen klassenavn og filtrerer bort falsy verdier. */
export function cn(...klasser: (string | false | null | undefined)[]): string {
  return klasser.filter(Boolean).join(" ");
}
