import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function POST(req: NextRequest) {
  const userSeq = await req.json();

  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/point/log`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userSeq),
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
