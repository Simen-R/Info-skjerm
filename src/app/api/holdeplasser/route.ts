import { NextResponse } from "next/server";
import { sokHoldeplasser } from "@/lib/entur";

/** GET /api/holdeplasser?q=majorstuen for å søke etter holdeplass. */
export async function GET(request: Request) {
  const sok = new URL(request.url).searchParams.get("q")?.trim();
  if (!sok || sok.length < 2) return NextResponse.json({ treff: [] });

  try {
    return NextResponse.json({ treff: await sokHoldeplasser(sok) });
  } catch (feil) {
    console.error("Holdeplassøk feilet:", feil);
    return NextResponse.json({ treff: [], feil: true }, { status: 200 });
  }
}
