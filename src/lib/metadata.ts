import type { Metadata } from "next";
import { logo, site } from "@/content/site";

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
      images: [{ url: logo.src, width: logo.bredde, height: logo.hoyde, alt: logo.alt }],
    },
  };
}
