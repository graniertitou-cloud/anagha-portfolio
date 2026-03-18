import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://fashionnotesx.substack.com/feed", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 502 });
    }

    const xml = await res.text();
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch RSS" }, { status: 500 });
  }
}
