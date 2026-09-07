import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { logo, site } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.navn}. ${site.tagline}`, template: `%s | ${site.navn}` },
  description: site.beskrivelse,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.navn}. ${site.tagline}`,
    description: site.beskrivelse,
    locale: "nb_NO",
    type: "website",
    images: [{ url: logo.src, width: logo.bredde, height: logo.hoyde, alt: logo.alt }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
