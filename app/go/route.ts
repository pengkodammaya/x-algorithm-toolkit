import { NextResponse } from "next/server";

// Central funnel redirect. Point this anywhere via env without touching UI.
// UTM tags let you see how much traffic the scorer sends to Digistories.
const DEST =
  process.env.NEXT_PUBLIC_DIGISTORIES_URL ?? "https://www.digistories.cc";

export function GET() {
  const url = new URL(DEST);
  url.searchParams.set("utm_source", "x-algorithm-toolkit");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "tweet-scorer");
  return NextResponse.redirect(url, 302);
}
