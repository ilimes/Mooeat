import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/user/info`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  return NextResponse.json({ data });
}