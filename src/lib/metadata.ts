import type { Metadata } from "next";
import { site } from "@/content/site";

/** Bygger sidetitler og delingsdata konsistent for alle undersider. */
export function lagMetadata(tittel: string, beskrivelse: string): Metadata {
  return {
    title: tittel,
    description: beskrivelse,
    openGraph: {
      title: `${tittel} | ${site.navn}`,
      description: beskrivelse,
      locale: "nb_NO",
      type: "website",
    },
  };
}
